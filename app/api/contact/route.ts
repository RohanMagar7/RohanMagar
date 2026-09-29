import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const projectTypes = new Set([
  'Website',
  'Web Application',
  'E-commerce',
  'Admin Dashboard',
  'AI / ML',
  'Redesign',
  'Other',
]);
const timelines = new Set(['', 'As soon as possible', 'Within 1–2 months', 'Flexible']);
const contactEmail = process.env.CONTACT_EMAIL?.trim() || 'magarohan8@gmail.com';
const sender =
  process.env.CONTACT_FROM_EMAIL?.trim() || 'Rohan Magar <onboarding@resend.dev>';
const windowMs = 15 * 60 * 1000;
const maxRequests = 5;

type RateLimitEntry = { count: number; resetAt: number };
const rateLimitGlobal = globalThis as typeof globalThis & {
  contactRateLimit?: Map<string, RateLimitEntry>;
};
const rateLimit = (rateLimitGlobal.contactRateLimit ??= new Map());

function jsonError(message: string, status: number, retryAfter?: number) {
  const headers = retryAfter ? { 'Retry-After': String(retryAfter) } : undefined;
  return NextResponse.json({ error: message }, { status, headers });
}

function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
  return cleaned.length <= maxLength ? cleaned : null;
}

function cleanLine(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  return cleanText(value.replace(/[\r\n]+/g, ' '), maxLength);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getRateLimitKey(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return request.headers.get('x-real-ip') ?? forwardedFor?.split(',').at(-1)?.trim() ?? 'unknown';
}

function checkRateLimit(key: string): number | null {
  const now = Date.now();
  for (const [entryKey, entry] of rateLimit) {
    if (entry.resetAt <= now) rateLimit.delete(entryKey);
  }

  const current = rateLimit.get(key);
  if (current && current.resetAt > now && current.count >= maxRequests) {
    return Math.max(1, Math.ceil((current.resetAt - now) / 1000));
  }

  if (!current || current.resetAt <= now) {
    rateLimit.set(key, { count: 1, resetAt: now + windowMs });
  } else {
    current.count += 1;
  }

  // Bound memory use if a deployment receives many distinct client addresses.
  if (rateLimit.size > 10_000) rateLimit.clear();
  return null;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 12_000) {
    return jsonError('The enquiry is too large. Please shorten the project description.', 413);
  }
  if (request.headers.get('content-type')?.split(';', 1)[0].trim() !== 'application/json') {
    return jsonError('Please submit the enquiry using the contact form.', 415);
  }

  let parsed: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return jsonError('Please check the enquiry details and try again.', 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 12_000) {
        await reader.cancel();
        return jsonError('The enquiry is too large. Please shorten the project description.', 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    parsed = JSON.parse(new TextDecoder().decode(bytes)) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return jsonError('Please check the enquiry details and try again.', 400);
    }
  } catch {
    return jsonError('Please check the enquiry details and try again.', 400);
  }
  const body = parsed as Record<string, unknown>;

  // Silently discard bot submissions that fill the hidden honeypot field.
  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = cleanLine(body.name, 120);
  const email = cleanLine(body.email, 254);
  const phone = cleanLine(body.phone ?? '', 30);
  const company = cleanLine(body.company ?? '', 160);
  const projectType = cleanLine(body.projectType, 60);
  const budget = cleanLine(body.budget ?? '', 120);
  const timeline = cleanLine(body.timeline ?? '', 80);
  const message = cleanText(body.message, 5000);

  if (
    name === null ||
    email === null ||
    phone === null ||
    company === null ||
    projectType === null ||
    budget === null ||
    timeline === null ||
    message === null ||
    !name ||
    !email ||
    !projectType ||
    !message
  ) {
    return jsonError('Please check the enquiry details and try again.', 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonError('Please enter a valid email address.', 400);
  }
  if (phone && (!/^[0-9+().\-\s]{7,30}$/.test(phone) || (phone.match(/\d/g)?.length ?? 0) < 7)) {
    return jsonError('Please enter a valid phone number.', 400);
  }
  if (!projectTypes.has(projectType) || !timelines.has(timeline)) {
    return jsonError('Please choose a valid project type and timeline.', 400);
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey || apiKey === 're_xxxxxxxxx') {
    return jsonError('Email delivery is not configured yet.', 503);
  }

  const retryAfter = checkRateLimit(getRateLimitKey(request));
  if (retryAfter) {
    return jsonError('Too many enquiries. Please try again later.', 429, retryAfter);
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || 'Not provided');
  const safeCompany = escapeHtml(company || 'Not provided');
  const safeType = escapeHtml(projectType);
  const safeBudget = escapeHtml(budget || 'Not provided');
  const safeTimeline = escapeHtml(timeline || 'Not provided');
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br />');
  const html = `
    <div style="margin:0;background:#f1f5f9;padding:32px 16px;font-family:Arial,sans-serif;color:#0f172a">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dbe4f0;border-radius:12px;overflow:hidden">
        <div style="padding:24px 28px;background:#0d1424;color:#f8fafc">
          <p style="margin:0 0 8px;color:#60a5fa;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Portfolio enquiry</p>
          <h1 style="margin:0;font-size:24px">New Project Enquiry</h1>
        </div>
        <div style="padding:24px 28px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tbody>
              <tr><th align="left" style="padding:10px 12px;border-bottom:1px solid #e2e8f0;width:180px">Name</th><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">${safeName}</td></tr>
              <tr><th align="left" style="padding:10px 12px;border-bottom:1px solid #e2e8f0">Email</th><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
              <tr><th align="left" style="padding:10px 12px;border-bottom:1px solid #e2e8f0">Phone Number</th><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">${safePhone}</td></tr>
              <tr><th align="left" style="padding:10px 12px;border-bottom:1px solid #e2e8f0">Company / Business</th><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">${safeCompany}</td></tr>
              <tr><th align="left" style="padding:10px 12px;border-bottom:1px solid #e2e8f0">Project Type</th><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">${safeType}</td></tr>
              <tr><th align="left" style="padding:10px 12px;border-bottom:1px solid #e2e8f0">Budget Range</th><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">${safeBudget}</td></tr>
              <tr><th align="left" style="padding:10px 12px;border-bottom:1px solid #e2e8f0">Expected Timeline</th><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">${safeTimeline}</td></tr>
            </tbody>
          </table>
          <h2 style="margin:26px 0 10px;font-size:17px">Project Details</h2>
          <p style="margin:0;font-size:14px;line-height:1.7;overflow-wrap:anywhere">${safeMessage}</p>
        </div>
      </div>
    </div>`;
  const text = [
    'New Project Enquiry',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone Number: ${phone || 'Not provided'}`,
    `Company / Business: ${company || 'Not provided'}`,
    `Project Type: ${projectType}`,
    `Budget Range: ${budget || 'Not provided'}`,
    `Expected Timeline: ${timeline || 'Not provided'}`,
    '',
    'Project Details:',
    message,
  ].join('\n');

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: sender,
      to: [contactEmail],
      replyTo: email,
      subject: `New Project Enquiry — ${name}`,
      html,
      text,
    });

    if (error) {
      return jsonError('Unable to send your enquiry. Please try again.', 503);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return jsonError('Unable to send your enquiry. Please try again.', 503);
  }
}
