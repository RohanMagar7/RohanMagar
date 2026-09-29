import type { Metadata } from 'next';
import { pageMetadata } from '@/data/metadata';
import { profile } from '@/data/profile';

export const metadata: Metadata = pageMetadata(
  'Privacy Policy',
  'Learn what information Rohan Magar’s portfolio collects and how project enquiries are used.',
  '/privacy',
);

export default function PrivacyPage() {
  return (
    <article className="page-wrap container-site legal-page">
      <p className="eyebrow">Site information</p>
      <h1>Privacy Policy</h1>
      <p className="lede">Last updated: September 29, 2026</p>

      <h2>Information you provide</h2>
      <p>
        If you use the project enquiry form, it asks for your name, email address, project type and
        project description. Phone number, company or business, budget range and expected timeline
        are optional. Please do not include sensitive personal, financial or health information in
        your message.
      </p>

      <h2>How enquiries are used</h2>
      <p>
        Form information is used to review and respond to your project enquiry. When email delivery
        is configured, the form sends the submitted details to {profile.email} through Resend, the
        transactional email provider. Your email address is set as Reply-To so a response can be
        sent to you. The site does not save submissions to its own database. Resend and the
        recipient mailbox may process or retain email according to their own policies.
      </p>

      <h2>Technical and abuse-prevention data</h2>
      <p>
        The contact endpoint may process your network IP address for rate limiting. Its counter is
        held in server memory for a 15-minute rate-limit window and is not stored with enquiry
        content. The site does not currently use analytics or advertising trackers and does not set
        non-essential analytics cookies or browser storage.
      </p>

      <h2>Third-party services and links</h2>
      <p>
        Sending an enquiry involves Resend. This website also links to external services such as
        GitHub, LinkedIn and WhatsApp. Those services have their own privacy practices; review
        their policies when you visit or use them.
      </p>

      <h2>Questions or requests</h2>
      <p>
        For questions about an enquiry you sent through this site, contact{' '}
        <a href={`mailto:${profile.email}`}>{profile.email}</a>. If you ask about information in an
        enquiry, I can review the copy in the receiving mailbox; copies held by an email provider
        are subject to that provider&apos;s controls and policies.
      </p>
    </article>
  );
}
