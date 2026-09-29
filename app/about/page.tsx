import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, Linkedin, MapPin } from 'lucide-react';
import { profile } from '@/data/profile';
import { TechStack } from '@/features/technologies/TechStack';
import { pageMetadata } from '@/data/metadata';
export const metadata: Metadata = pageMetadata(
  'About',
  'About Rohan Magar, a developer interested in AI, data science and full-stack software.',
  '/about',
);
export default function AboutPage() {
  return (
    <div className="page-wrap">
      <section className="container-site page-intro about-page">
        <p className="eyebrow">About</p>
        <h1>
          Software should
          <br />
          <span className="muted">be useful first.</span>
        </h1>
        <p className="lede">
          I’m Rohan Magar, a developer from {profile.location}. I’m interested in AI, data science,
          full-stack development and healthcare technology.
        </p>
        <p className="lede">
          My public GitHub profile describes a Master’s in Computer Science. I share projects and
          experiments there as I continue building across web development and applied AI.
        </p>
        <div className="location">
          <MapPin size={16} />
          {profile.location}
        </div>
        <div className="profile-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github /> GitHub profile
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Linkedin /> LinkedIn profile
          </a>
        </div>
        <p className="small-note">
          LinkedIn profile details were not publicly accessible for verification.
        </p>
      </section>
      <TechStack />
      <section className="container-site inline-cta">
        <p>Let’s make something useful.</p>
        <Link className="button-primary" href="/contact">
          Start a Project ↗
        </Link>
      </section>
    </div>
  );
}
