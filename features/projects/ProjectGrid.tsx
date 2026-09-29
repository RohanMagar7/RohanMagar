'use client';
import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { SolutionType } from '@/types/project';
import { projects } from './project.data';
import { ProjectCard } from './ProjectCard';
import { ProjectFilter } from './ProjectFilter';

export function ProjectGrid({ projectSlugs }: { projectSlugs?: readonly string[] }) {
  const [category, setCategory] = useState<'All' | SolutionType>('All');
  const [query, setQuery] = useState('');
  const list = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const sourceProjects = projectSlugs
      ? projectSlugs
          .map((slug) => projects.find((project) => project.slug === slug))
          .filter((project) => project !== undefined)
      : projects;
    return sourceProjects.filter((project) => {
      const matchesCategory = category === 'All' || project.solutionTypes?.includes(category);
      const searchable = [
        project.title,
        project.category,
        project.description,
        ...project.tags,
        ...project.technologies,
        ...(project.features ?? []),
      ]
        .join(' ')
        .toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, projectSlugs, query]);

  return (
    <>
      {!projectSlugs ? (
        <div className="projects-toolbar">
          <label className="project-search">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search projects</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Search projects or technologies"
            />
            {query ? (
              <button type="button" aria-label="Clear search" onClick={() => setQuery('')}>
                <X size={16} />
              </button>
            ) : null}
          </label>
          <span className="project-result-count" aria-live="polite">
            {list.length} {list.length === 1 ? 'project' : 'projects'}
          </span>
          <ProjectFilter value={category} onChange={setCategory} />
        </div>
      ) : null}
      {list.length ? (
        <div className="project-grid">
          {list.map((project, index) => (
            <ProjectCard key={project.id ?? project.slug} project={project} index={index} />
          ))}
        </div>
      ) : (
        <p className="filter-empty">No projects match. Try a different search or category.</p>
      )}
    </>
  );
}
