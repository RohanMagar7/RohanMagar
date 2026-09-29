import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/types/project';
export function ProjectFeatures({ project }: { project: Project }) {
  return (
    <aside>
      <h3>Technologies</h3>
      <div className="tag-list">
        {project.technologies.map((technology) => (
          <span className="tag" key={technology}>
            {technology}
          </span>
        ))}
      </div>
      {project.features?.length ? (
        <>
          <h3>Key features</h3>
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </>
      ) : null}
      {project.forked ? (
        <p className="fork-note">This GitHub repository is marked as a fork.</p>
      ) : null}
      {project.githubUrl ? (
        <a className="text-link" href={project.githubUrl} target="_blank" rel="noreferrer">
          <Github size={16} /> GitHub repository <ArrowUpRight size={15} />
        </a>
      ) : null}
      {project.liveUrl ? (
        <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">
          Live project <ArrowUpRight size={15} />
        </a>
      ) : null}
    </aside>
  );
}
