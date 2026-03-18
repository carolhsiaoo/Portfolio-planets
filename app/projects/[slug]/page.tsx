import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProjectBySlug, getAllSlugs } from '@/data/projects';
import ProjectPage from '@/components/ProjectPage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.name} | Carol Hsiao`,
    description: project.tagline || `${project.name} — ${project.type} project by Carol Hsiao`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPage project={project} />;
}
