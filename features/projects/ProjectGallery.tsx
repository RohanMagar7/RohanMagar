import Image from 'next/image';
import type { Project } from '@/types/project';
export function ProjectGallery({ project }: { project: Project }) {
  if (!project.gallery?.length) return null;
  return (
    <section className="project-gallery" aria-label={`${project.title} gallery`}>
      {project.gallery.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt={`${project.title}, additional project view ${index + 1}`}
          width={1200}
          height={680}
          sizes="(max-width: 850px) calc(100vw - 36px), 1160px"
        />
      ))}
    </section>
  );
}
