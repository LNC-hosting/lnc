export interface Project {
  id: string;
  name: string;
  description: string;

  image?: string;
  icon?: string;

  tags: string[];
  category?: string;
  technologies?: string[];

  language?: string;
  stars?: number;
  forks?: number;

  link?: string;
  readme?: string;

  // ✅ GitHub / source metadata (optional)
  owner?: string;
  ownerAvatar?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    name: "Turon",
    description:
      "Fast CLI to generate and configure backend projects in Express.js or vanilla JS with WebSocket support.",
    tags: ["Backend"],
    image: "/assets/images/turon.png",
    icon: "🌐",
    category: "Backend",
    technologies: ["Backend", "ExpressJS", "Websockets"],
    language: "TypeScript",
    stars: 1,
    forks: 2,
    link: "https://github.com/LNC-Network/turon",
    owner: "LNC-Network",
    ownerAvatar: "/assets/images/lnc.png",
  },
  {
    id: "2",
    name: "Higher",
    description: "Calmer Reading",
    tags: ["React", "Tailwind"],
    icon: "🎨",
    image: "/assets/images/higher.png",
    category: "React",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
    language: "TypeScript",
    stars: 0,
    forks: 2,
    link: "https://github.com/LNC-Network/Higher",
    owner: "LNC-Network",
    ownerAvatar: "/assets/images/lnc.png",
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
    owner: "LNC-Network",
    ownerAvatar: "/assets/images/lnc.png",
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
    owner: "LNC-Network",
    ownerAvatar: "/assets/images/lnc.png",
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
    image: "/assets/images/model-viewer.png",
    owner: "Jit Debnath",
    ownerAvatar: "/assets/images/jit.jpeg",
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
    owner: "Jit Debnath",
    ownerAvatar: "/assets/images/jit.jpeg",
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
    owner: "Jit Debnath",
    ownerAvatar: "/assets/images/jit.jpeg",
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
    owner: "Jit Debnath",
    ownerAvatar: "/assets/images/jit.jpeg",
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
    owner: "Jit Debnath",
    ownerAvatar: "/assets/images/jit.jpeg",
  },
];
