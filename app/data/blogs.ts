export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  role: string;
  date: string;
  link: string;
  image: string;
  tag: string;
  readTime: string;
}
export interface GalleryImage {
  src: string;
  alt: string;
  tag: string;
}
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Decentralized Collaboration",
    excerpt:
      "Exploring how DAOs and web3 protocols are reshaping how we work together. We're building systems that trust code over central authorities.",
    author: "Sarah Chen",
    role: "Lead Architect",
    date: "Dec 15, 2024",
    link: "https://linktr.ee/lnc_community",
    image: "/assets/images/mepic.png",
    tag: "Web3",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Designing for Trust in Zero-Trust Systems",
    excerpt:
      "UX patterns that build confidence without centralized authority. How to create interfaces that feel secure and transparent to the end user.",
    author: "Alex Thompson",
    role: "Product Design",
    date: "Dec 10, 2024",
    link: "https://linktr.ee/lnc_community",
    image: "/assets/images/mepic.png",
    tag: "Design",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Scaling Community-First Networks",
    excerpt:
      "Lessons learned from growing open source ecosystems to millions of users. Community management is the new product management.",
    author: "Marcus Rodriguez",
    role: "Community Lead",
    date: "Dec 05, 2024",
    link: "https://linktr.ee/lnc_community",
    image: "/assets/images/mepic.png",
    tag: "Community",
    readTime: "4 min read",
  },
];
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/assets/images/mepic.png",
    alt: "Community Building",
    tag: "Events",
  },
  {
    src: "/assets/images/mepic.png",
    alt: "Latest Updates",
    tag: "News",
  },
  { src: "/assets/images/mepic.png", alt: "Team Culture", tag: "Team" },
  {
    src: "/assets/images/mepic.png",
    alt: "Collaboration",
    tag: "Work",
  },
  {
    src: "/assets/images/mepic.png",
    alt: "Design Systems",
    tag: "Design",
  },
  {
    src: "/assets/images/mepic.png",
    alt: "Hackathon 2024",
    tag: "Hackathon",
  },
  { src: "/assets/images/mepic.png", alt: "Workshop", tag: "Learning" },
  { src: "/assets/images/mepic.png", alt: "Awards", tag: "Wins" },
  {
    src: "/assets/images/mepic.png",
    alt: "Global Meetup",
    tag: "Events",
  },
  {
    src: "/assets/images/mepic.png",
    alt: "Tech Talk",
    tag: "Research",
  },
  { src: "/assets/images/mepic.png", alt: "Retreat", tag: "Social" },
  { src: "/assets/images/mepic.png", alt: "Launch Day", tag: "Product" },
];
