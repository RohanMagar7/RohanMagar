import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/features/projects/project.data';
import { ProjectOverview } from '@/features/projects/ProjectOverview';
import { ProjectFeatures } from '@/features/projects/ProjectFeatures';
import { ProjectGallery } from '@/features/projects/ProjectGallery';
import { pageMetadata } from '@/data/metadata';
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project
    ? pageMetadata(project.title, project.description, `/work/${project.slug}`)
    : pageMetadata('Project not found', 'The requested project could not be found.', '/work');
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const related = projects
    .filter((project) => project.slug !== p.slug)
    .map((project) => ({
      project,
      overlap: project.tags.filter((tag) => p.tags.includes(tag)).length,
    }))
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3);
  return (
    <article className="page-wrap case-study">
      <div className="container-site">
        <Link href="/work" className="text-link">
          ← All work
        </Link>
        <div className="case-head">
          <p className="eyebrow">{p.category} / project notes</p>
          <h1>{p.title}</h1>
          <p className="lede">{p.description}</p>
        </div>
        <Image
          className="case-image"
          src={p.image}
          alt={`Illustration for ${p.title}`}
          width={1200}
          height={680}
          sizes="(max-width: 1200px) calc(100vw - 36px), 1160px"
          priority
        />
        <ProjectGallery project={p} />
        <div className="case-details">
          <ProjectOverview project={p} />
          <ProjectFeatures project={p} />
        </div>
        {related.length ? (
          <section className="related-projects">
            <p className="eyebrow">More work</p>
            <h2>Related projects</h2>
            <div className="related-project-list">
              {related.map(({ project }) => (
                <Link href={`/work/${project.slug}`} className="related-project" key={project.slug}>
                  <span>{project.category}</span>
                  <strong>{project.title}</strong>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
        <section className="case-project-cta" aria-labelledby="similar-project-title">
          <div>
            <p className="eyebrow">Like this project?</p>
            <h2 id="similar-project-title">
              I can build a similar solution for your business or idea.
            </h2>
            <p>Share what you need and we can discuss a practical next step.</p>
          </div>
          <Link href="/contact" className="button-primary">
            Start a Project <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </article>
  );
}
