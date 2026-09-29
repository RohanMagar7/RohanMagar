import type { Metadata } from 'next';
import { pageMetadata } from '@/data/metadata';

export const metadata: Metadata = pageMetadata(
  'Terms & Conditions',
  'Terms for using Rohan Magar’s portfolio website and enquiry form.',
  '/terms',
);

export default function TermsPage() {
  return (
    <article className="page-wrap container-site legal-page">
      <p className="eyebrow">Site information</p>
      <h1>Terms &amp; Conditions</h1>
      <p className="lede">Last updated: September 29, 2026</p>

      <h2>Website information</h2>
      <p>
        This website presents general information about Rohan Magar and selected software projects.
        Project descriptions are provided for information and portfolio purposes and may change as
        project records are updated.
      </p>

      <h2>Project enquiries and services</h2>
      <p>
        Submitting the project enquiry form starts a conversation; it does not itself create a
        service contract, reserve a start date or guarantee that a project will be accepted. Any
        work will require a separate written agreement that sets out its scope, fees, schedule,
        responsibilities and other applicable terms.
      </p>

      <h2>Website use and content</h2>
      <p>
        You may browse and share links to public pages. Do not use the site or enquiry form to send
        unlawful, harmful or misleading content, or to interfere with the site. Website text,
        visual design and original portfolio artwork belong to their respective owners. Project
        names, repositories and third-party materials remain subject to their own owners&apos; rights
        and licenses.
      </p>

      <h2>External services</h2>
      <p>
        Links to GitHub, LinkedIn, WhatsApp and other third-party services are provided for
        convenience. Their availability, content and terms are controlled by those services.
      </p>

      <h2>Availability</h2>
      <p>
        The site is provided as available. I may update, suspend or remove pages as the portfolio
        changes. Information here is not professional legal, financial, medical or other regulated
        advice.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{' '}
        <a href="mailto:magarohan8@gmail.com">magarohan8@gmail.com</a>.
      </p>
    </article>
  );
}
