'use client';
import type { SolutionType } from '@/types/project';
const filters: Array<'All' | SolutionType> = [
  'All',
  'Business Websites',
  'Web Applications',
  'Admin Dashboards',
  'E-Commerce',
  'AI / ML',
  'Education',
  'Automation',
];
export function ProjectFilter({
  value,
  onChange,
}: {
  value: 'All' | SolutionType;
  onChange: (category: 'All' | SolutionType) => void;
}) {
  return (
    <div className="project-filters" role="group" aria-label="Filter projects by category">
      {filters.map((category) => (
        <button
          type="button"
          key={category}
          aria-pressed={value === category}
          className={value === category ? 'filter-button active' : 'filter-button'}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
