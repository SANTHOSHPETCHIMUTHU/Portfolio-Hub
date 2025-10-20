import { getWPProjects, getWPMedia } from '@/lib/wp-api';
import { ProjectCard } from '@/components/ui/project-card';
import { FolderGit2 } from 'lucide-react';

export const metadata = {
  title: 'Projects | Portfolio',
  description: 'Explore my latest web development projects and case studies',
};

export default async function ProjectsPage() {
  const projects = await getWPProjects();
  // Normalize screenshot media IDs to URLs
  const normalizedProjects = await Promise.all(
    (projects || []).map(async (project) => {
      const screenshot = project.acf?.screenshot;
      if (typeof screenshot === 'number') {
        const url = await getWPMedia(screenshot);
        return { ...project, acf: { ...project.acf, screenshot: url } };
      }
      return project;
    })
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mb-6">
            <FolderGit2 className="text-white" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A collection of projects showcasing my skills and experience in web development
          </p>
        </div>

        {normalizedProjects && normalizedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {normalizedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto border border-gray-100">
              <FolderGit2 className="mx-auto mb-6 text-gray-400" size={64} />
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Projects Coming Soon
              </h2>
              <p className="text-gray-600">
                I&apos;m currently working on exciting new projects. Check back soon to see my
                latest work!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
