import { getWPProject, getWPProjects } from '@/lib/wp-api';
import { getWPMedia } from '@/lib/wp-api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowLeft, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getWPProjects();

  if (!projects || projects.length === 0) {
    return [];
  }

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getWPProject(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title.rendered} | Portfolio`,
    description: project.acf?.short_description || 'Project details',
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  let project = await getWPProject(slug);

  // Normalize screenshot if returned as media ID
  if (project?.acf?.screenshot && typeof project.acf.screenshot === 'number') {
    const url = await getWPMedia(project.acf.screenshot as number);
    project = { ...project, acf: { ...project.acf, screenshot: url } };
  }

  if (!project) {
    notFound();
  }

  const { title, acf } = project as any;
  const screenshotUrl = acf?.screenshot
    ? typeof acf.screenshot === 'string'
      ? acf.screenshot
      : String(acf.screenshot)
    : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/projects">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2" size={20} />
            Back to Projects
          </Button>
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {screenshotUrl && (
            <div className="relative h-96 bg-gradient-to-br from-blue-50 to-cyan-50">
              <Image
                src={screenshotUrl}
                alt={title.rendered}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {title.rendered}
            </h1>

            {acf?.short_description && (
              <p className="text-xl text-gray-600 mb-8">{acf.short_description}</p>
            )}

            <div className="flex gap-4 mb-12">
              {acf?.github_link && (
                <a href={acf.github_link} target="_blank" rel="noopener noreferrer">
                  <Button>
                    <Github className="mr-2" size={20} />
                    View Code
                  </Button>
                </a>
              )}
              {acf?.live_demo && (
                <a href={acf.live_demo} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    <ExternalLink className="mr-2" size={20} />
                    Live Demo
                  </Button>
                </a>
              )}
            </div>

            {acf?.features && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="text-green-600" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Features</h2>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                  <div
                    className="prose prose-lg max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: acf.features }}
                  />
                </div>
              </div>
            )}

            {acf?.challenges && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="text-orange-600" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Challenges</h2>
                </div>
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
                  <div
                    className="prose prose-lg max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: acf.challenges }}
                  />
                </div>
              </div>
            )}

            {acf?.solutions && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lightbulb className="text-blue-600" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Solutions</h2>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                  <div
                    className="prose prose-lg max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: acf.solutions }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects">
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2" size={20} />
              View More Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
