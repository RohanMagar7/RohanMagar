'use client';
import { useRef, useState, type FormEvent } from 'react';
import { profile } from '@/data/profile';

const projectTypes = [
  'Website',
  'Web Application',
  'E-commerce',
  'Admin Dashboard',
  'AI / ML',
  'Redesign',
  'Other',
];

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

export function ProjectForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const isSending = useRef(false);

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSending.current) return;

    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = {
      name: String(values.get('name') ?? ''),
      email: String(values.get('email') ?? ''),
      phone: String(values.get('phone') ?? ''),
      company: String(values.get('company') ?? ''),
      projectType: String(values.get('type') ?? ''),
      budget: String(values.get('budget') ?? ''),
      timeline: String(values.get('timeline') ?? ''),
      message: String(values.get('message') ?? ''),
      website: String(values.get('website') ?? ''),
    };

    isSending.current = true;
    setSubmissionState('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Unable to send enquiry');
      form.reset();
      setSubmissionState('success');
    } catch {
      setSubmissionState('error');
    } finally {
      isSending.current = false;
    }
  }

  const statusMessage = {
    idle: `Your details are only used to respond to this enquiry. You can also email ${profile.email} or call ${profile.phone}.`,
    sending: 'Sending your project enquiry…',
    success: "Thanks! Your project enquiry has been sent successfully. I'll get back to you soon.",
    error: 'Unable to send your enquiry. Please try again or contact me directly.',
  }[submissionState];

  return (
    <form className="contact-form" onSubmit={submitEnquiry}>
      <div className="contact-honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-grid">
        <label>
          Name
          <input name="name" autoComplete="name" required maxLength={120} placeholder="Your name" />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
          />
        </label>
        <label>
          Phone Number
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            placeholder="Your phone number"
          />
        </label>
        <label>
          Company / business
          <input
            name="company"
            autoComplete="organization"
            maxLength={160}
            placeholder="Company name"
          />
        </label>
        <label>
          Project type
          <select name="type" defaultValue="" required>
            <option value="" disabled>
              Select a project type
            </option>
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Budget range
          <input name="budget" maxLength={120} placeholder="Your approximate range" />
        </label>
        <label>
          Expected timeline
          <select name="timeline" defaultValue="">
            <option value="">Choose a timeline</option>
            <option>As soon as possible</option>
            <option>Within 1–2 months</option>
            <option>Flexible</option>
          </select>
        </label>
      </div>
      <label>
        Tell me about your project
        <textarea
          name="message"
          rows={5}
          required
          maxLength={5000}
          placeholder="What are you looking to build? What would success look like?"
        />
      </label>
      <button className="button-primary" type="submit" disabled={submissionState === 'sending'}>
        {submissionState === 'sending' ? 'Sending…' : 'Send Project Enquiry'}
        {submissionState !== 'sending' && <span aria-hidden="true"> →</span>}
      </button>
      <p
        className={`form-note form-note-${submissionState}`}
        aria-live={submissionState === 'error' ? 'assertive' : 'polite'}
        role={submissionState === 'error' ? 'alert' : 'status'}
      >
        {statusMessage}
      </p>
    </form>
  );
}
