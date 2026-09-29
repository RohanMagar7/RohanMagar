import Link from 'next/link';
import { ArrowRight, Github, Linkedin, MoveDownRight } from 'lucide-react';
export function Hero() {
  return (
    <section id="top" className="hero relative flex items-center overflow-hidden">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb" aria-hidden="true" />
      <div className="container-site hero-layout">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span /> FULL-STACK WEB DEVELOPER
          </p>
          <h1 className="hero-title">
            I build modern websites <span>and custom web applications for businesses.</span>
          </h1>
          <p className="hero-description">
            From business websites and admin dashboards to e-commerce and AI powered applications, I
            turn practical requirements into useful digital products.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="button-primary">
              Start a Project <ArrowRight size={18} />
            </Link>
            <Link href="/work" className="button-secondary">
              View My Work <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-social">
            <a
              href="https://github.com/RohanMagar7"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="hero-social-link"
            >
              <Github size={19} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/rohanmagar7/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="hero-social-link"
            >
              <Linkedin size={19} /> LinkedIn
            </a>
          </div>
        </div>
        <div className="hero-art" aria-label="Illustrated digital product interface">
          <div className="art-label">
            PRODUCT THINKING <MoveDownRight size={14} />
          </div>
          <div className="art-window">
            <div className="art-toolbar">
              <span />
              <span />
              <span />
              <small>project / overview</small>
            </div>
            <div className="art-content">
              <div className="art-side">
                <b>RM</b>
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="art-main">
                <div className="art-heading">
                  <span>PRODUCT OVERVIEW</span>
                  <b>Product / 01</b>
                </div>
                <div className="art-title">
                  Make the complex
                  <br />
                  feel simple.
                </div>
                <div className="art-caption">
                  A focused digital experience,
                  <br />
                  designed around real work.
                </div>
                <div className="art-cards">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="art-flow">
                  <i />
                  DISCOVER <b>→</b> DESIGN <b>→</b> BUILD <b>→</b> LAUNCH
                </div>
              </div>
            </div>
          </div>
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
        </div>
      </div>
    </section>
  );
}
