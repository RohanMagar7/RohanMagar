import { processSteps } from './process.data';
export function Process() {
  return (
    <section className="section-space section-line">
      <div className="container-site">
        <div className="section-head">
          <p className="eyebrow">A clear path forward</p>
          <h2>
            From first conversation
            <br />
            <span className="muted">to launch.</span>
          </h2>
        </div>
        <div className="process-grid">
          {processSteps.map((s) => (
            <article key={s.number} className="process-step">
              <span>{s.number}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
