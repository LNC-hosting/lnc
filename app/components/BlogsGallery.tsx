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
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            The <span className="text-white/50">Chronicles</span>
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

function BlogsSection({
  activeBlog,
  setActiveBlog,
}: {
  activeBlog: number;
  setActiveBlog: (i: number) => void;
}) {
  const post = BLOG_POSTS[activeBlog];

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
                  "w-full rounded-xl border p-4 text-left transition touch-manipulation",
                  activeBlog === i
                    ? "border-purple-500 bg-white/10"
                    : "border-white/10 hover:border-purple-500/50",
                )}
              >
                <p className="text-xs uppercase text-purple-400 mb-1">
                  {p.tag}
                </p>
                <h4 className="font-bold uppercase truncate">{p.title}</h4>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Blog content */}
      <article
        className="
          lg:col-span-8
          rounded-3xl
          border border-white/10
          bg-black/60
          overflow-visible
          lg:overflow-hidden
        "
        aria-live="polite"
      >
        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-video lg:aspect-auto">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />

            {/* decorative overlay — MUST NOT intercept clicks */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold uppercase text-purple-400 border border-purple-500/40">
              {post.tag}
            </span>
          </div>

          {/* Text */}
          <div className="relative p-6 lg:p-10 flex flex-col">
            <h3 className="text-2xl lg:text-4xl font-black uppercase mb-6">
              {post.title}
            </h3>

            <div className="flex items-center gap-3 text-xs text-white/50 mb-6">
              <span className="font-bold text-white">{post.author}</span>
              <span className="text-purple-400">{post.role}</span>
              <span className="ml-auto">{post.date}</span>
            </div>

            <p className="text-sm lg:text-base text-white/70 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="mt-auto flex items-center gap-4">
              <Link
                href={post.link}
                className="
                  inline-flex items-center gap-2
                  rounded-xl bg-purple-500
                  px-6 py-4
                  text-sm font-bold uppercase
                  transition hover:bg-purple-600
                  touch-manipulation
                "
              >
                Read Story
                <ArrowRight className="h-4 w-4" />
              </Link>

              <span className="text-xs text-white/40 uppercase">
                {post.readTime}
              </span>
            </div>
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
  return (
    <div className="flex flex-col gap-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GALLERY_IMAGES.slice(0, visibleImages).map((img, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#111]"
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
            <div className="pointer-events-none absolute bottom-4 left-4">
              <p className="text-xs uppercase text-purple-400">{img.tag}</p>
              <p className="font-bold uppercase">{img.alt}</p>
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
