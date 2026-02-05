"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Grid, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";
import { BLOG_POSTS, GALLERY_IMAGES } from "@/app/data/blogs";

type Section = "blogs" | "images";

export default function BlogsGallery() {
  const [activeSection, setActiveSection] = useState<Section>("blogs");
  const [activeBlog, setActiveBlog] = useState(0);
  const [visibleImages, setVisibleImages] = useState(6);

  return (
    <section
      id="community"
      className="relative w-full border-t border-white/10 bg-transparent text-white"
    >
      <div className="container mx-auto px-4 md:px-12 py-12">
        {/* Header */}
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
          <h2 className="text-3xl md:text-5xl xl:text-7xl font-black uppercase tracking-tight">
            Latest <span className="text-purple-400/80">Insights</span>
          </h2>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Content sections"
            className="flex rounded-full border border-white/20 bg-black/40 p-1"
          >
            <TabButton
              icon={<LayoutTemplate className="h-4 w-4" />}
              label="Blogs"
              selected={activeSection === "blogs"}
              onClick={() => setActiveSection("blogs")}
            />
            <TabButton
              icon={<Grid className="h-4 w-4" />}
              label="Images"
              selected={activeSection === "images"}
              onClick={() => setActiveSection("images")}
            />
          </div>
        </header>

        {/* Content */}
        <div className="mt-12">
          {activeSection === "blogs" ? (
            <BlogsSection
              activeBlog={activeBlog}
              setActiveBlog={setActiveBlog}
            />
          ) : (
            <ImagesSection
              visibleImages={visibleImages}
              setVisibleImages={setVisibleImages}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------
   BLOGS
---------------------------------------------- */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

function BlogsSection({
  activeBlog,
  setActiveBlog,
}: {
  activeBlog: number;
  setActiveBlog: (i: number) => void;
}) {
  const post = BLOG_POSTS[activeBlog];
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Kill any ongoing animations to prevent conflicts
    gsap.killTweensOf(containerRef.current);

    // Animate content in
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    );
  }, [activeBlog]);

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Blog list */}
      <aside className="lg:col-span-4">
        <ul role="list" className="space-y-3">
          {BLOG_POSTS.map((p, i) => (
            <li key={p.id}>
              <button
                onClick={() => setActiveBlog(i)}
                aria-current={activeBlog === i}
                className={cn(
                  "w-full rounded-xl border p-4 text-left transition-all duration-300 touch-manipulation group",
                  activeBlog === i
                    ? "border-purple-500 bg-white/5 shadow-[0_0_20px_-10px_purple]"
                    : "border-white/10 hover:border-purple-500/50 hover:bg-white/5",
                )}
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <span
                    className={cn(
                      "text-xs font-bold uppercase tracking-wider transition-colors",
                      activeBlog === i
                        ? "text-purple-400"
                        : "text-white/60 group-hover:text-purple-300",
                    )}
                  >
                    {p.tag}
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">
                    {p.date}
                  </span>
                </div>
                <h4
                  className={cn(
                    "font-bold uppercase leading-snug line-clamp-2 transition-colors",
                    activeBlog === i
                      ? "text-white"
                      : "text-white/80 group-hover:text-white",
                  )}
                >
                  {p.title}
                </h4>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Blog content */}
      <article
        ref={containerRef}
        key={activeBlog}
        className="
          lg:col-span-8
          relative
          h-[400px] md:h-[500px]
          rounded-3xl
          overflow-hidden
          border border-white/10
          group
        "
        aria-live="polite"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            priority
          />
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-black/80 to-transparent opacity-90" />
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex flex-col justify-end p-6 md:p-10 z-10">
          {/* Badge */}
          <span
            className="
            inline-block w-fit rounded-full
            bg-purple-500/20 px-3 py-1
            text-[10px] sm:text-xs font-bold uppercase tracking-wider text-purple-300
            border border-purple-500/30
            mb-3 md:mb-4
            backdrop-blur-md
          "
          >
            {post.tag}
          </span>

          {/* Title */}
          <h3
            className="
            text-2xl md:text-4xl lg:text-5xl
            font-black uppercase
            mb-3 md:mb-5
            leading-[0.95]
            tracking-tight
            drop-shadow-lg
          "
          >
            {post.title}
          </h3>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 md:gap-5 text-xs sm:text-sm text-white/80 mb-5 md:mb-6 font-medium border-l-2 border-purple-500 pl-3 md:pl-4">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              {post.author}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-purple-300 hidden sm:inline">
              {post.role}
            </span>
            <span className="text-white/40">•</span>
            <span className="font-mono text-white/60">{post.date}</span>
          </div>

          <div
            className="
            flex flex-col md:flex-row gap-4 md:gap-6
            items-start md:items-end justify-between
            border-t border-white/10 pt-5 md:pt-6
            backdrop-blur-sm bg-black/20 -mx-6 -mb-6 p-6 md:p-8 md:-mx-10 md:-mb-10
          "
          >
            <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl line-clamp-2 md:line-clamp-3">
              {post.excerpt}
            </p>

            <Link
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                shrink-0
                inline-flex items-center gap-2
                rounded-full bg-white text-black
                px-6 py-3
                text-xs sm:text-sm font-bold uppercase tracking-wide
                transition-all hover:bg-purple-400 hover:text-white hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.6)]
                touch-manipulation
              "
            >
              Read Story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

/* ---------------------------------------------
   IMAGES
---------------------------------------------- */

function ImagesSection({
  visibleImages,
  setVisibleImages,
}: {
  visibleImages: number;
  setVisibleImages: (n: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
    );
  }, [visibleImages]); // Re-run when more images load

  return (
    <div className="flex flex-col gap-12">
      <div
        ref={containerRef}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {GALLERY_IMAGES.slice(0, visibleImages).map((img, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#111] group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs uppercase text-purple-400">{img.tag}</p>
              <p className="font-bold uppercase text-white">{img.alt}</p>
            </div>
          </div>
        ))}
      </div>

      {visibleImages < GALLERY_IMAGES.length && (
        <button
          onClick={() => setVisibleImages(visibleImages + 6)}
          className="
            mx-auto rounded-full
            border border-white/20
            px-8 py-3
            font-bold uppercase
            text-white
            transition hover:bg-white hover:text-black
            touch-manipulation
          "
        >
          Load More
        </button>
      )}
    </div>
  );
}

/* ---------------------------------------------
   TAB BUTTON
---------------------------------------------- */

function TabButton({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase transition touch-manipulation",
        selected
          ? "bg-purple-500 text-white"
          : "text-white/60 hover:text-white",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
