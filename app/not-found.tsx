import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-wrap container-site not-found-page" aria-labelledby="not-found-title">
      <p className="eyebrow">404 / page not found</p>
      <h1 id="not-found-title">Page not found.</h1>
      <p className="lede">The page you&apos;re looking for doesn&apos;t exist or may have moved.</p>
      <div className="hero-actions">
        <Link className="button-primary" href="/">
          Back Home
        </Link>
        <Link className="button-secondary" href="/work">
          View My Work
        </Link>
      </div>
    </section>
  );
}
