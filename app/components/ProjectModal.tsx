"use client";
import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Project } from "../data/projects";
interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-black border border-white/20 overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 rounded-3xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black border border-white hover:bg-white hover:text-black transition-colors rounded-full"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        <div className="w-full md:w-1/3 h-48 md:h-auto relative border-b-2 md:border-b-0 md:border-r-2 border-white/20">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
              <span className="text-8xl font-black text-white/10 uppercase select-none">
                {project.name.substring(0, 2)}
              </span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
            <h2 className="text-2xl font-bold text-white uppercase">
              {project.name}
            </h2>
          </div>
        </div>
        <div className="w-full md:w-2/3 p-6 md:p-8 overflow-y-auto">
          <div className="prose prose-invert max-w-none prose-sm font-sans">
            {project.readme?.split("\n").map((line, i) => {
              if (line.startsWith("# "))
                return (
                  <h1
                    key={i}
                    className="text-2xl font-bold mb-4 text-purple-400 uppercase font-pixel"
                  >
                    {line.replace("# ", "")}
                  </h1>
                );
              if (line.startsWith("## "))
                return (
                  <h2
                    key={i}
                    className="text-xl font-bold mt-6 mb-3 text-white uppercase font-pixel"
                  >
                    {line.replace("## ", "")}
                  </h2>
                );
              if (line.startsWith("### "))
                return (
                  <h3
                    key={i}
                    className="text-lg font-bold mt-4 mb-2 text-white font-pixel"
                  >
                    {line.replace("### ", "")}
                  </h3>
                );
              if (line.startsWith("- "))
                return (
                  <li key={i} className="ml-4 mb-1 text-gray-300">
                    {line.replace("- ", "")}
                  </li>
                );
              if (line.startsWith("```")) return null;
              if (line.trim() === "") return <br key={i} />;
              return (
                <p key={i} className="mb-2 text-gray-300">
                  {line}
                </p>
              );
            })}
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
            <a
              href="https://github.com/LNC-Network"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-purple-500 hover:text-white transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
