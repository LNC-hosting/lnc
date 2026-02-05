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
    title: "Switchboard: The Oracle That Web3 Actually Deserves",
    excerpt:
      "Exploring the next generation of decentralized oracles and why they matter for the future of Web3.",
    author: "LNC Team",
    role: "Engineering",
    date: "Feb 2025",
    link: "https://medium.com/@latenightcoders1/switchboard-the-oracle-that-web3-actually-deserves-815aebb6bb05",
    image:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*3sgIaaPmpg7PweBbGUkdzg.png",
    tag: "Web3",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Scroll of Good: Building a Better World with Blockchain",
    excerpt:
      "How blockchain technology is being leveraged for social impact and transparent systems.",
    author: "Deep Ghosh",
    role: "Contributor",
    date: "Feb 2025",
    link: "https://medium.com/@deepghosh821/the-scroll-of-good-building-a-better-world-with-blockchain-643b9cc5f733",
    image:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*Sooww-F27tetSPd-Qbzlag.png",
    tag: "Blockchain",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "The Tech Fairness Hackathon",
    excerpt:
      "Building something bold, open, and actually fair. A recap of our latest community hackathon.",
    author: "Deep Ghosh",
    role: "Contributor",
    date: "Feb 2025",
    link: "https://medium.com/@deepghosh821/the-tech-fairness-hackathon-build-something-bold-open-and-actually-fair-74b40db3621d",
    image:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*nGiwlaXylD08oAswJJVeRg.png",
    tag: "Hackathon",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "When Code Meets Conscience",
    excerpt:
      "Blockchain as a force for good. Discussing the ethical implications and potential of distributed ledger technology.",
    author: "Snihita Nandi",
    role: "Contributor",
    date: "Feb 2025",
    link: "https://medium.com/@snihitanandi2004/when-code-meets-conscience-blockchain-as-a-force-for-good-e27dafb94213",
    image:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*EafjPKO4azy_fonGcVxH6A.png",
    tag: "Ethics",
    readTime: "5 min read",
  },
  {
    id: 5,
    title: "14 Days of Learning on Monad",
    excerpt:
      "My journey into Web3 learning about the Monad ecosystem and its high-performance blockchain.",
    author: "Deep Ghosh",
    role: "Contributor",
    date: "Feb 2025",
    link: "https://medium.com/@deepghosh821/14daysoflearning-on-monad-my-journey-into-web3-c29e45118472",
    image:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*JXFKBtvMv8zdppt8jhQR-A.png",
    tag: "Learning",
    readTime: "8 min read",
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
