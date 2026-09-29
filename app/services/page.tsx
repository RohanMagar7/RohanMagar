import type { Metadata } from 'next';
import Link from 'next/link';
import { Services } from '@/features/services/Services';
import { Process } from '@/features/process/Process';
import { pageMetadata } from '@/data/metadata';
export const metadata: Metadata = pageMetadata(
  'Services',
  'Websites, web applications, backend development and AI or data prototypes.',
  '/services',
);
export default function ServicesPage() {
  return (
    <div className="page-wrap">
      <section className="container-site page-intro">
        <p className="eyebrow">Services</p>
        <h1>
          Build the right thing
          <br />
          <span className="muted">for your next step.</span>
        </h1>
        <p className="lede">
          Every engagement starts with understanding your goal, then shaping the product and scope
          around it.
        </p>
      </section>
      <Services />
      <Process />
      <div className="container-site inline-cta">
        <p>Have a project in mind?</p>
        <Link href="/contact" className="button-primary">
          Start a Project ↗
        </Link>
      </div>
    </div>
  );
}
