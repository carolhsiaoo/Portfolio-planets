import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CreativeCaseStudy from '@/components/CreativeCaseStudy';
import { getProjectBySlug, projects } from '@/data/projects';

// Only projects with a lightweight creative case study get a detail page;
// everything else still 404s (full UX case studies remain disabled).
export function generateStaticParams() {
  return projects
    .filter((p) => p.creativeStudy)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project?.creativeStudy) return {};

  const title = `${project.name} — ${project.type} by Carol Hsiao`;
  const description = project.tagline ?? '';
  return {
    metadataBase: new URL('https://www.carolhsiao.com'),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: project.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project?.creativeStudy) notFound();

  return <CreativeCaseStudy project={project} />;
}
