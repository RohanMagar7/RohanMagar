import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { services } from './services.data';
export function Services() {
  return (
    <section className="section-space" id="services">
      <div className="container-site">
        <div className="section-head">
          <p className="eyebrow">What I can help build</p>
          <h2>
            Thoughtful software for
            <br />
            <span className="muted">real business needs.</span>
          </h2>
          <p className="lede">
            From the first web presence to a custom application, the work starts with the problem
            you need to solve.
          </p>
        </div>
        <div className="service-grid">
          {services.map(({ number, title, description, icon: Icon }) => (
            <article className="service-item" key={number}>
              <div className="service-top">
                <span>{number}</span>
                <Icon size={21} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <ArrowUpRight className="service-arrow" size={17} />
            </article>
          ))}
        </div>
        <Link className="text-link" href="/services">
          Explore services <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
