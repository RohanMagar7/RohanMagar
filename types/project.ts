export type ProjectTag =
  | 'Full Stack'
  | 'Frontend'
  | 'Backend'
  | 'AI / ML'
  | 'Data Science'
  | 'E-Commerce'
  | 'Education'
  | 'IoT'
  | 'Developer Tools'
  | 'Portfolio'
  | 'Website'
  | 'Web App'
  | 'Software';

export type SolutionType =
  | 'Business Websites'
  | 'Web Applications'
  | 'Admin Dashboards'
  | 'E-Commerce'
  | 'AI / ML'
  | 'Education'
  | 'Automation';

export interface Project {
  id?: string;
  slug: string;
  title: string;
  category: string;
  tags: ProjectTag[];
  description: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  technicalOverview?: string;
  challenges?: string[];
  features?: string[];
  technologies: string[];
  solutionTypes?: SolutionType[];
  demonstrates?: string[];
  image: string;
  gallery?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  forked?: boolean;
  note?: string;
}
