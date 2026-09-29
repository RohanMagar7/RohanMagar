import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/types/project';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <article className="project-card">
      <Link
        href={`/work/${project.slug}`}
        className="project-image-link"
        aria-label={`View ${project.title} case study`}
      >
        <Image
          src={project.image}
          alt={`Illustrated cover for ${project.title}`}
          width={1200}
          height={680}
          className="project-image"
          sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 1200px) calc(50vw - 34px), 560px"
          priority={index === 0}
        />
        {project.forked ? <span className="fork-badge">Forked repository</span> : null}
        <span className="project-open" aria-hidden="true">
          <ArrowUpRight size={19} />
        </span>
      </Link>
      <div className="project-meta">
        <span>{project.category}</span>
        <div className="project-meta-tags">
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
      </div>
      <h3>
        <Link href={`/work/${project.slug}`}>{project.title}</Link>
      </h3>
      <p className="project-card-description">{project.description}</p>
      <p className="project-card-tech">{project.technologies.slice(0, 4).join(' · ')}</p>
      <div className="project-card-actions">
        <Link href={`/work/${project.slug}`} className="project-details-link">
          View case study <ArrowUpRight size={15} />
        </Link>
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="project-external-link"
            aria-label={`${project.title} on GitHub`}
          >
            <Github size={16} /> GitHub
          </a>
        ) : null}
      </div>
    </article>
  );
}
