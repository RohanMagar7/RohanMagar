import type { Metadata } from 'next';
import { Contact } from '@/features/contact/Contact';
import { pageMetadata } from '@/data/metadata';
export const metadata: Metadata = pageMetadata(
  'Contact',
  'Send Rohan a project enquiry about a website, application or software product.',
  '/contact',
);
export default function ContactPage() {
  return (
    <section className="page-wrap container-site contact-page">
      <Contact />
    </section>
  );
}
