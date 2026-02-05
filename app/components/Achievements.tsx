"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ACHIEVEMENTS } from "@/app/data/achievements";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const CARD_WIDTH = 300;
const GAP = 32;
const VISIBLE = 3;

export default function ObjectivesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const maxIndex = ACHIEVEMENTS.length - VISIBLE;

  const moveTo = (next: number) => {
    const i = Math.max(0, Math.min(next, maxIndex));
    setIndex(i);

    gsap.to(trackRef.current, {
      x: -(CARD_WIDTH + GAP) * i,
      duration: 0.55,
      ease: "power2.out",
    });
  };

  return (
    <section className="py-24 px-6">
      <div className="mx-auto bg-transparent rounded-xl p-10 ">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-6xl font-black uppercase">Our Archivements</h2>

          <div className="flex gap-3">
            <button
              onClick={() => moveTo(index - 1)}
              className="w-10 h-10 rounded-full border  disabled:opacity-40"
              disabled={index === 0}
            >
              ←
            </button>
            <button
              onClick={() => moveTo(index + 1)}
              className="w-10 h-10 rounded-full border  disabled:opacity-40"
              disabled={index === maxIndex}
            >
              →
            </button>
          </div>
        </div>
        {/* Viewport */}

        <div className="overflow-hidden">
          {/* Track */}
          <div ref={trackRef} className="flex gap-6 will-change-transform">
            {ACHIEVEMENTS.map((item, i) => {
              const cardContent = (
                <Card className="relative w-[300px] h-[380px] shrink-0 overflow-hidden rounded-xl border shadow-[0_6px_0_#000] hover:border-[#9810fa] transition-colors">
                  {/* Background image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/55" />

                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white text-wrap">
                    <h3 className="text-sm font-bold uppercase tracking-wide">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-white/90">
                      {item.description}
                    </p>
                  </div>
                </Card>
              );

              return (
                <div key={i} className="shrink-0">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    cardContent
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
