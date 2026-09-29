import Link from 'next/link';
import { ArrowDown, ArrowRight, Github, Linkedin, Sparkles } from 'lucide-react';
import { Hero } from '@/features/hero/Hero';
import { Services } from '@/features/services/Services';
import { ProjectGrid } from '@/features/projects/ProjectGrid';
import { homeProjectSlugs } from '@/features/projects/project.data';
import { TechStack } from '@/features/technologies/TechStack';
import { Process } from '@/features/process/Process';
import { About } from '@/features/about/About';
import { WhyWorkWithMe } from '@/features/about/WhyWorkWithMe';
import { FAQ } from '@/features/faq/FAQ';
import { profile } from '@/data/profile';
export default function Home() {
  return (
    <>
      <Hero />
      <section className="section-space client-needs" aria-labelledby="client-needs-title">
        <div className="container-site needs-layout">
          <div>
            <p className="eyebrow">Need something built?</p>
            <h2 id="client-needs-title">A practical solution for the work ahead.</h2>
          </div>
          <div className="needs-content">
            <p>Your business may need:</p>
            <ul>
              {[
                'A professional website',
                'A custom web application',
                'An admin dashboard',
                'An e-commerce store',
                'Automation or an AI powered tool',
                'A website redesign',
              ].map((need) => (
                <li key={need}>{need}</li>
              ))}
            </ul>
            <Link href="/contact" className="text-link">
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <Services />
      <section className="section-space work-section section-line">
        <div className="container-site">
          <div className="work-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>
                From ideas to
                <br />
                <span className="muted">working products.</span>
              </h2>
              <p className="lede">
                Real applications and websites across business, education, AI, e-commerce and custom
                software. Each project shows the kinds of problems I can help solve.
              </p>
            </div>
            <Link className="text-link" href="/work">
              View My Work <ArrowRight size={16} />
            </Link>
          </div>
          <ProjectGrid projectSlugs={homeProjectSlugs} />
        </div>
      </section>
      <TechStack />
      <WhyWorkWithMe />
      <Process />
      <About />
      <section className="section-space section-line">
        <div className="container-site faq-home">
          <div>
            <p className="eyebrow">Good to know</p>
            <h2>
              Questions before
              <br />
              <span className="muted">we get started?</span>
            </h2>
            <Link href="/contact" className="text-link">
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
          <FAQ compact />
        </div>
      </section>
      <section className="final-cta">
        <div className="container-site cta-inner">
          <div>
            <p className="eyebrow">
              <Sparkles size={15} /> Your next step
            </p>
            <h2>
              Have a project
              <br />
              in mind?
            </h2>
            <p>Let&apos;s turn your idea into a useful digital product.</p>
          </div>
          <div className="cta-actions">
            <Link href="/contact" className="button-primary">
              Start a Project <ArrowRight size={18} />
            </Link>
            <Link href="/work" className="button-secondary">
              View My Work
            </Link>
          </div>
        </div>
      </section>
      <div className="social-proof container-site">
        <span>Find me online</span>
        <a href={profile.github} target="_blank" rel="noreferrer">
          <Github size={17} /> GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          <Linkedin size={17} /> LinkedIn
        </a>
        <a href="#top" className="back-top">
          Back to top <ArrowDown size={15} />
        </a>
      </div>
    </>
  );
}
