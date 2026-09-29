const benefits = [
  {
    number: '01',
    title: 'Start with the goal',
    description:
      'We define the audience and business need before choosing screens, features or tools.',
  },
  {
    number: '02',
    title: 'Fit the solution',
    description:
      'The scope follows your product and workflow, instead of forcing a generic template onto it.',
  },
  {
    number: '03',
    title: 'Responsive by design',
    description:
      'Layouts and interactions are planned for phones, tablets and larger screens from the start.',
  },
  {
    number: '04',
    title: 'Clear communication',
    description: 'You can expect direct conversations about requirements, tradeoffs and progress.',
  },
  {
    number: '05',
    title: 'Maintainable foundations',
    description: 'Readable structure and sensible technology choices make future changes easier.',
  },
  {
    number: '06',
    title: 'Review before launch',
    description: 'We check the experience together and agree on deployment and next steps.',
  },
];
export function WhyWorkWithMe() {
  return (
    <section className="section-space section-line">
      <div className="container-site">
        <div className="section-head">
          <p className="eyebrow">Why work together</p>
          <h2>
            A practical partner
            <br />
            <span className="muted">for your next build.</span>
          </h2>
        </div>
        <div className="benefit-grid">
          {benefits.map((x) => (
            <article className="benefit-item" key={x.number}>
              <span>{x.number}</span>
              <h3>{x.title}</h3>
              <p>{x.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
