import { technologies } from './technologies.data';
export function TechStack() {
  return (
    <section className="section-space section-line">
      <div className="container-site tech-layout">
        <div>
          <p className="eyebrow">Tools & focus</p>
          <h2>
            Practical foundations.
            <br />
            <span className="muted">Useful outcomes.</span>
          </h2>
        </div>
        <div className="tech-groups">
          {technologies.map((g) => (
            <div className="tech-group" key={g.category}>
              <h3>{g.category}</h3>
              <div className="tag-list">
                {g.items.map((x) => (
                  <span className="tag" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
