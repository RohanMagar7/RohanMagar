import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { profile } from '@/data/profile';
export function About() {
  return (
    <section className="section-space section-line">
      <div className="container-site about-grid">
        <div className="about-mark">
          <span>RM</span>
          <i>Building with purpose</i>
        </div>
        <div>
          <p className="eyebrow">A little about me</p>
          <h2>
            Hi, I’m Rohan.
            <br />
            <span className="muted">I make software for people.</span>
          </h2>
          <p className="lede">
            {profile.bio} My GitHub profile describes my focus as AI, data science and full-stack
            development, with an interest in healthcare technology.
          </p>
          <p className="location">
            <MapPin size={16} />
            {profile.location}
          </p>
          <div className="about-links">
            <Link href="/about" className="text-link">
              More about me <ArrowUpRight size={16} />
            </Link>
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-link">
              GitHub <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
