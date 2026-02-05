"use client";
import { STATS } from "@/app/data/stats";

export default function Stats() {
  return (
    <section className="bg-transparent py-10 px-12 md:px-28 w-full font-pixel border-t-2 border-dashed border-white/10">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 fade-up">
          <h2 className="text-3xl md:text-5xl xl:text-7xl font-black uppercase tracking-tight">
            Numbers That Tell Our Story
          </h2>

          <p className="text-sm md:text-base font-mono uppercase text-[#71717a] leading-relaxed max-w-lg">
            LNC has grown because people show up and do the work. These numbers
            reflect what happens when a community commits to something real.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-l border-white/10">
          {STATS.map((stat, index) => (
            <div
              key={index}
              className="pl-8 border-l border-white/10 md:border-l-0 md:border-r last:md:border-r-0 fade-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <h3 className="text-4xl md:text-6xl font-black text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#71717a]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Local styles only */}
      <style jsx>{`
        .fade-up {
          animation: fadeUp 0.6s ease-out both;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-up {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
