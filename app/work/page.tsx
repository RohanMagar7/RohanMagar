import type { Metadata } from 'next';
import { ProjectGrid } from '@/features/projects/ProjectGrid';
import { pageMetadata } from '@/data/metadata';
export const metadata: Metadata = {
  ...pageMetadata('Work', 'Explore selected software and web projects by Rohan Magar.', '/work'),
};
export default function WorkPage() {
  return (
    <div className="page-wrap">
      <section className="container-site page-intro">
        <p className="eyebrow">Work / selected projects</p>
        <h1>
          Projects made to
          <br />
          <span className="muted">solve and explore.</span>
        </h1>
        <p className="lede">
          Browse selected projects and experiments. Project details and technologies reflect the
          available repository documentation.
        </p>
      </section>
      <section className="container-site page-projects">
        <h2 className="work-list-title">The projects</h2>
        <ProjectGrid />
      </section>
    </div>
  );
}
