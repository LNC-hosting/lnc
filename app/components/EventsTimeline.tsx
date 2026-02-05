"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { EVENTS } from "../data/events";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);
export default function EventsTimeline() {
  const router = useRouter();
  const container = useRef(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const groupsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const groups = groupsRef.current.filter(Boolean) as HTMLDivElement[];
      const header = headerRef.current;
      const containerEl = container.current;

      if (!groups.length || !header || !containerEl) return;

      const Z_SPACING = 1500;
      const totalDepth = groups.length * Z_SPACING;
      const HEADER_DURATION = 0.1;

      gsap.set(header, {
        opacity: 0,
        top: "50%",
        yPercent: -50,
      });

      gsap.set(groups, {
        z: (i) => -i * Z_SPACING - 1000,
        opacity: 0,
        visibility: "hidden",
      });

      const opacitySetters = groups.map((el) =>
        gsap.quickSetter(el, "opacity"),
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl,
          start: "top top",
          end: `+=${groups.length * 800 + 400}`, // REAL budget
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* ---------------- HEADER (FAST) ---------------- */

      tl.to(header, {
        opacity: 1,
        duration: HEADER_DURATION,
        ease: "power1.out",
      })
        .to(header, {
          top: "1em",
          yPercent: 0,
          duration: HEADER_DURATION,
          ease: "power1.out",
        })
        .addLabel("cards");

      /* ---------------- CARDS ---------------- */

      tl.set(groups, { visibility: "visible" }, "cards")
        .to(
          groups,
          {
            z: (i) => totalDepth - i * Z_SPACING - 200,
            ease: "none",
          },
          "cards",
        )
        .eventCallback("onUpdate", () => {
          groups.forEach((group, i) => {
            const z = gsap.getProperty(group, "z") as number;

            let opacity = 0;
            if (z < -4000) opacity = 0;
            else if (z < -500)
              opacity = gsap.utils.mapRange(-4000, -500, 0, 1, z);
            else if (z < 300) opacity = 1;
            else opacity = gsap.utils.mapRange(300, 800, 1, 0, z);

            opacitySetters[i](opacity);
          });
        });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen w-full bg-transparent overflow-hidden flex flex-col items-center justify-center font-pixel "
    >
      <div ref={headerRef} className="absolute top-10 z-20 text-center">
        <h2 className="text-3xl md:text-7xl font-black uppercase tracking-wide text-white">
          Events Highlights
        </h2>
      </div>
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        {EVENTS.map((event, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={event.id}
              ref={(el) => {
                if (el) groupsRef.current[i] = el;
              }}
              onClick={() => router.push(event.link)}
              className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-[320px] md:w-[420px] ${
                  isEven ? "right-[20px] pr-8" : "left-[20px] pl-8"
                } pointer-events-auto group`}
              >
                <div
                  className={`relative p-6 bg-black/80 border border-white/10 overflow-hidden will-[transform] transition-all duration-500 hover:border-purple-500/50 hover:bg-black/90 group-hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]`}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/30 border border-white/10 px-2 py-0.5 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase mb-2 tracking-wide text-white group-hover:text-purple-100 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm font-sans leading-relaxed mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#71717a] text-xs font-mono">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
