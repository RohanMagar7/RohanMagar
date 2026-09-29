import type { Project } from '@/types/project';
export function ProjectOverview({ project }: { project: Project }) {
  return (
    <section className="project-overview">
      <p className="eyebrow">Overview</p>
      <h2>What it is</h2>
      <p>{project.longDescription ?? project.description}</p>
      {project.demonstrates?.length ? (
        <div className="case-copy-block">
          <h3>What this demonstrates</h3>
          <ul className="demonstrates-list">
            {project.demonstrates.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {project.problem ? (
        <div className="case-copy-block">
          <h3>Problem space</h3>
          <p>{project.problem}</p>
        </div>
      ) : null}
      {project.solution ? (
        <div className="case-copy-block">
          <h3>Approach</h3>
          <p>{project.solution}</p>
        </div>
      ) : null}
      {project.technicalOverview ? (
        <div className="case-copy-block">
          <h3>Technical overview</h3>
          <p>{project.technicalOverview}</p>
        </div>
      ) : null}
      {project.challenges?.length ? (
        <div className="case-copy-block">
          <h3>Technical considerations</h3>
          <ul>
            {project.challenges.map((challenge) => (
              <li key={challenge}>{challenge}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {project.note ? <p className="case-disclosure">{project.note}</p> : null}
      <p className="case-disclosure">
        Project details reflect repository documentation or the available project record. No client
        outcomes or project metrics are claimed.
      </p>
    </section>
  );
}
