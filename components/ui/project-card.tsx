"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WPProject } from '@/lib/wp-api';

interface ProjectCardProps {
  project: WPProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, slug, acf } = project;
  const screenshot = acf?.screenshot;
  const shortDescription = acf?.short_description;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      <Link href={`/projects/${slug}`}>
        <div className="relative h-56 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden group">
          {screenshot ? (
            <Image
              src={screenshot}
              alt={title.rendered}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <span className="text-lg font-medium">Project Image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/projects/${slug}`}>
          <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
            {title.rendered}
          </h3>
        </Link>

        {shortDescription && (
          <p className="text-gray-600 mb-4 line-clamp-2">{shortDescription}</p>
        )}

        <div className="flex items-center justify-between gap-3">
          <Link href={`/projects/${slug}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>

          <div className="flex gap-2">
            {acf?.github_link && (
              <a
                href={acf.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={20} className="text-gray-600" />
              </a>
            )}
            {acf?.live_demo && (
              <a
                href={acf.live_demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Live Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={20} className="text-gray-600" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
