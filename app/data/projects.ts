export interface Project {
  id: string;
  name: string;
  description: string;
  image?: string;
  tags: string[];
  icon?: string;
  category?: string;
  technologies?: string[];
  language?: string;
  stars?: number;
  forks?: number;
  link?: string;
  readme?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    name: "Turon",
    description:
      "Fast CLI to generate and configure backend projects in Express.js or vanilla JS with WebSocket support.",
    tags: ["Backend"],
    image: "/assets/images/cta_builder.png",
    icon: "🌐",
    category: "Backend",
    technologies: ["Backend", "ExpressJS", "Websockets"],
    language: "TypeScript",
    stars: 1,
    forks: 2,
    link: "https://github.com/LNC-Network/turon",
  },
  {
    id: "2",
    name: "Higher",
    description: "Calmer Reading",
    tags: ["React", "Tailwind"],
    icon: "🎨",
    category: "React",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
    language: "TypeScript",
    stars: 0,
    forks: 2,
    link: "https://github.com/LNC-Network/Higher",
  },
  {
    id: "3",
    name: "TinyVector",
    description:
      "Lightweight vector database management system written in Rust.",
    tags: ["Database", "Rust", "Vector DB"],
    icon: "⚛️",
    category: "Database Managaement System",
    technologies: ["Rust", "Vector DB", "Database System"],
    language: "Rust",
    stars: 0,
    forks: 0,
    link: "https://github.com/LNC-Network/TinyVector",
  },
  {
    id: "4",
    name: "LNC Admin Panel",
    description: "Administration panel for LNC's internal workflow.",
    tags: ["AdminPanel", "NextJS", "Auth"],
    icon: "💸",
    category: "DeFi",
    technologies: ["Typescript", "Postgres", "NextJS"],
    language: "Typescript",
    stars: 0,
    forks: 1,
    link: "https://github.com/LNC-Network/lnc-adminPanel",
  },

  // =========================
  // Appended from Jit-nath
  // =========================

  {
    id: "5",
    name: "3D-Model-Viewer",
    description: "Quick model viewer.",
    tags: ["Frontend", "3D"],
    icon: "🧊",
    category: "Frontend",
    technologies: ["TypeScript", "3D", "Vercel"],
    language: "TypeScript",
    stars: 0,
    forks: 0,
    link: "https://github.com/Jit-nath/3D-Model-Viewer",
    image: "/assets/images/projects/3d-model-viewer.png",
  },
  {
    id: "6",
    name: "TokenBucket",
    description:
      "Proxy service that caches LLM responses to cut down on API call costs.",
    tags: ["Backend", "AI", "Infra"],
    icon: "🪣",
    category: "Backend",
    technologies: ["Docker", "Caching", "Proxy", "LLM"],
    language: "Dockerfile",
    stars: 0,
    forks: 0,
    link: "https://github.com/Jit-nath/TokenBucket",
  },
  {
    id: "7",
    name: "BitCalling",
    description: "p2p calling app library.",
    tags: ["Rust", "Networking", "P2P"],
    icon: "📡",
    category: "Library",
    technologies: ["Rust", "P2P", "Networking"],
    language: "Rust",
    stars: 0,
    forks: 0,
    link: "https://github.com/Jit-nath/BitCalling-lib",
  },
  {
    id: "8",
    name: "Fortress",
    description: "A solution for storing all of your secrets and passwords.",
    tags: ["Security", "App"],
    icon: "🔐",
    category: "Security",
    technologies: ["TypeScript", "Security", "Encryption"],
    language: "TypeScript",
    stars: 0,
    forks: 1,
    link: "https://github.com/Jit-nath/Fortress",
  },
  {
    id: "9",
    name: "last-minute",
    description: "A platform where you can study without distraction.",
    tags: ["Productivity", "Web"],
    icon: "⏳",
    category: "Productivity",
    technologies: ["TypeScript", "Web App", "Vercel"],
    language: "TypeScript",
    stars: 0,
    forks: 0,
    link: "https://github.com/Jit-nath/last-minute",
  },
  {
    id: "10",
    name: "book-reader",
    description: "Book reading web app.",
    tags: ["Frontend", "Reader"],
    icon: "📚",
    category: "Frontend",
    technologies: ["TypeScript", "Web App", "Vercel"],
    language: "TypeScript",
    stars: 0,
    forks: 0,
    link: "https://github.com/Jit-nath/book-reader",
  },
];
