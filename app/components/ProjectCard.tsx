"use client";
import Link from "next/link";
import { EnrichedProject } from "../utils/github";
import Image from "next/image";

interface ProjectCardProps {
  project: EnrichedProject;
  className?: string;
}

export default function ProjectCard({
  project,
  className = "",
}: ProjectCardProps) {
  return (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative group h-[420px] w-full rounded-xl overflow-hidden block ${className}`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Glass morphism card */}
      <div className="relative h-full backdrop-blur-md bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 group-hover:border-purple-500/50 transition-all duration-300 rounded-xl flex flex-col overflow-hidden">

        {/* Featured Image Section - Only if image exists */}
        {project.image && (
          <div className="relative h-48 w-full overflow-hidden border-b border-white/10">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* Project name overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 drop-shadow-lg">
                {project.name}
              </h3>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          {/* Project name if no image */}
          {!project.image && (
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                {project.name}
              </h3>
            </div>
          )}

          {/* Description */}
          <div className="flex-grow">
            <p className="text-base text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
              {project.description}
            </p>
          </div>

          {/* Footer with owner info */}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-purple-500/30 group-hover:ring-purple-400/60 transition-all duration-300">
              <Image
                src={project.ownerAvatar}
                alt={project.owner}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white/90">
                {project.owner}
              </span>
              {project.language && (
                <span className="text-xs text-white/50">
                  {project.language}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 blur-xl" />
        </div>
      </div>
    </Link>
  );
}
