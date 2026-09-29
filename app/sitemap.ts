import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { projects } from '@/features/projects/project.data';
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/work', '/services', '/about', '/contact', '/privacy', '/terms'].map(
    (path) => ({ url: `${site.url}${path === '/' ? '' : path}` }),
  );
  return [
    ...routes,
    ...projects.map((project) => ({ url: `${site.url}/work/${project.slug}` })),
  ];
}
