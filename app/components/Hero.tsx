"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { animate } from "@/lib/hero/animation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const logoCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const logoWrapperRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const idleTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const textRef = useRef(null);
  const maskRef = useRef<SVGSVGElement>(null);
  const typewriterTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showFirstButton, setShowFirstButton] = useState(false);
  const [showSecondButton, setShowSecondButton] = useState(false);

  // Mobile: Shorter text ending with 2 words on line 4
  const mobileText =
    "Developers, designers, and makers building open-source projects together.the future, one commit at a time.Debugging the past in quiet hours.Deploying a year of innovation next.";

  // Desktop: Full text
  const desktopText =
    "Join a community that builds Developers, designers, and makers building open-source projects together. the future, one commit at a time.Debugging the past in quiet hours.Deploying a year of innovation next.";

  const [isMobile, setIsMobile] = useState(false);

  const fullText = isMobile ? mobileText : desktopText;

  // Detect mobile and enable smooth scrolling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      window.removeEventListener("resize", checkMobile);
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  useGSAP(
    () => {
      if (!isLoading) return;
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
        },
      });
      gsap.set(".hero-content-element", { opacity: 0, y: 30 });
      tl.to(textRef.current, {
        scale: 60,
        duration: 3,
        transformOrigin: "50% 50%",
        ease: "power3.inOut",
      })
        .to(
          maskRef.current,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              if (maskRef.current) maskRef.current.style.display = "none";
            },
          },
          "<60%",
        )
        .to(
          ".hero-content-element",
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          "<70%",
        );
    },
    { scope: container, dependencies: [isLoading] },
  );

  useEffect(() => {
    if (!showContent) return;
    let index = 0;
    const communityDescriptionEnd = fullText.length;

    typewriterTimerRef.current = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));

        // Show button after community description is complete
        if (index >= communityDescriptionEnd && !showFirstButton) {
          setTimeout(() => setShowFirstButton(true), 300);
        }

        index++;
      } else {
        if (typewriterTimerRef.current) {
          clearInterval(typewriterTimerRef.current);
          typewriterTimerRef.current = null;
        }
        setTimeout(() => setShowSecondButton(true), 600);
      }
    }, 30);
    return () => {
      if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current);
        typewriterTimerRef.current = null;
      }
    };
  }, [showContent, fullText]);

  useEffect(() => {
    if (isLoading) return;
    const canvas = logoCanvasRef.current;
    if (!canvas) return;
    let cleanup: (() => void) | undefined;
    animate(canvas)
      .then((cleanupFn) => {
        cleanup = cleanupFn;
      })
      .catch(console.error);
    return () => {
      if (cleanup) cleanup();
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleTouch = (e: TouchEvent) => {
      if (e.touches?.[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("touchstart", handleTouch, { passive: true });
    const logoWrapper = logoWrapperRef.current;
    const lastLerp = { x: 0, y: 0 };
    const logoParallaxLoop = () => {
      if (logoWrapper) {
        const rect = logoWrapper.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const nx = ((mx - cx) / rect.width) * 2;
        const ny = ((my - cy) / rect.height) * 2;
        const tx = nx * 8;
        const ty = ny * 6;
        lastLerp.x += (tx - lastLerp.x) * 0.12;
        lastLerp.y += (ty - lastLerp.y) * 0.12;
        logoWrapper.style.transform = `translate(${lastLerp.x}px, ${lastLerp.y}px)`;
      }
      rafRef.current = requestAnimationFrame(logoParallaxLoop);
    };
    if (logoWrapper) rafRef.current = requestAnimationFrame(logoParallaxLoop);
    setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouch);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isLoading]);

  return (
    <div
      className="relative w-full min-h-screen  overflow-hidden hero-element"
      ref={container}
    >
      <svg
        ref={maskRef}
        className="absolute inset-0 z-20 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id="hero-mask">
            <rect width="100%" height="100%" fill="white" />
            <g ref={textRef}>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                className="font-bold text-[12vw] md:text-[10vw] lg:text-[8.5vw]"
              >
                LNC
              </text>
            </g>
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="#110023ff"
          mask="url(#hero-mask)"
        />
      </svg>

      {/* ========================================
          ENHANCED CONTRAST LAYERS
          Primary fix: Left-anchored gradient for text legibility
          ======================================== */}

      {/* Layer 1: Deep left-side gradient - creates "reading zone" */}
      <div
        className="absolute inset-0 pointer-events-none z-2"
        style={{
          background: `linear-gradient(
            105deg,
            rgba(0, 0, 0, 0.85) 0%,
            rgba(0, 0, 0, 0.7) 25%,
            rgba(0, 0, 0, 0.4) 45%,
            rgba(0, 0, 0, 0.15) 60%,
            transparent 75%
          )`,
        }}
      />

      {/* Layer 2: Vertical gradient for grounding */}
      <div
        className="absolute inset-0 pointer-events-none z-2"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(17, 0, 35, 0.3) 0%,
            transparent 30%,
            transparent 60%,
            rgba(0, 0, 0, 0.6) 100%
          )`,
        }}
      />

      {/* Layer 3: Subtle vignette for focus */}
      <div
        className="absolute inset-0 pointer-events-none z-2"
        style={{
          background: `radial-gradient(
            ellipse 120% 100% at 80% 50%,
            transparent 30%,
            rgba(0, 0, 0, 0.25) 70%,
            rgba(0, 0, 0, 0.5) 100%
          )`,
        }}
      />

      {/* Layer 4: Noise texture for depth (optional, subtle) */}
      <div
        className="absolute inset-0 pointer-events-none z-3 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Mobile: Logo top, Text bottom | Desktop: Original layout (Text left, Logo right) */}
      <div className="absolute inset-0 z-10 flex flex-col justify-start pt-12 md:pt-24 lg:pt-24 px-6 md:px-12 lg:px-20 pb-20 md:pb-40 lg:pb-12 pointer-events-none overflow-y-auto lg:overflow-y-visible">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-2 md:gap-8 lg:gap-20 items-start">
          {/* Logo - Mobile: First (top), Desktop: Right side (order-2, 5 cols) */}
          <div className="hero-content-element order-1 lg:order-2 lg:col-span-5 relative flex items-start justify-center lg:justify-end min-h-[30vh] md:min-h-60 lg:min-h-150 pointer-events-auto">
            <div
              ref={logoWrapperRef}
              className="relative w-full max-w-[45vw] md:max-w-65 lg:max-w-115 aspect-square transform will-change-transform"
              aria-hidden="true"
            >
              <canvas
                ref={logoCanvasRef}
                className="w-full h-full opacity-90 rounded-full"
                style={{ maxWidth: "460px", maxHeight: "460px" }}
              />
            </div>
          </div>

          {/* Text Content - Mobile: Second (below logo), Desktop: Left side (order-1, 7 cols) */}
          <div className="hero-content-element order-2 lg:order-1 lg:col-span-7 flex flex-col pointer-events-auto mb-4 md:mb-10 lg:mb-0 -mt-4 md:mt-0 pt-20">
            <div className="space-y-2 sm:space-y-3">
              <div className="space-y-1">
                <h1 className="text-white text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.12] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                  Code by <span className="night-glass">Night</span>
                </h1>

                <h1 className="text-[1.5rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.12] tracking-tight">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-cyan-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                    Innovate by{" "}
                  </span>
                  <span className="light-radiance">Light</span>
                </h1>
              </div>
              {/* Text content */}
              <div className="pt-1 md:pt-3 lg:pt-4">
                {/* Mobile: Text and button in separate rows */}
                <div className="md:hidden">
                  <p className="text-sm text-white/50 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {typewriterText}
                    {typewriterText.length < fullText.length && (
                      <span className="inline-block w-0.5 h-4 bg-purple-400 ml-1 animate-pulse" />
                    )}
                  </p>

                  {/* Mobile Button - Separate row, far right */}
                  {showFirstButton &&
                    typewriterText.length >= fullText.length && (
                      <div className="flex justify-end mt-3">
                        <a
                          href="https://chat.whatsapp.com/BsuIBMdpsRxCc8bi9IFYIq"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button-appear group relative inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white text-[11px] font-black uppercase rounded-full overflow-hidden transition-all duration-300 active:scale-90 shadow-[0_0_20px_rgba(192,132,252,0.4)] active:shadow-[0_0_25px_rgba(192,132,252,0.6)] touch-manipulation border border-white/20"
                          style={{
                            WebkitTapHighlightColor: "rgba(192, 132, 252, 0.3)",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 opacity-0 group-active:opacity-100 transition-opacity duration-150" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.3),transparent_70%)]" />
                          <span className="relative flex items-center justify-center gap-1.5 whitespace-nowrap">
                            Join the community
                            <ArrowRight className="w-4 h-4 group-active:translate-x-0.5 transition-transform" />
                          </span>
                        </a>
                      </div>
                    )}
                </div>

                {/* Desktop: Normal text */}
                <p className="hidden md:block text-sm sm:text-base md:text-md lg:text-lg text-white/70 font-normal leading-relaxed md:max-w-xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                  {typewriterText}
                  {typewriterText.length < fullText.length && (
                    <span className="inline-block w-0.5 h-5 bg-purple-400 ml-1 animate-pulse" />
                  )}
                </p>
              </div>

              {/* ========================================
                  IMPROVED CTA HIERARCHY
                  Primary: Bold, prominent, clear action
                  Secondary: Receded, supportive, understated
                  ======================================== */}
              <div className="hidden md:flex flex-col sm:flex-row gap-3 sm:gap-5 pt-6 sm:pt-8 lg:pt-10 items-start sm:items-center">
                {/* PRIMARY CTA - Dominant action */}
                {showFirstButton && (
                  <a
                    href="https://chat.whatsapp.com/BsuIBMdpsRxCc8bi9IFYIq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-appear group relative px-5 py-5 text-white text-base sm:text-md font-bold tracking-wide rounded-md overflow-hidden transition-all duration-500  pointer-events-auto self-end sm:self-auto w-auto primary-cta"
                  >
                    {/* Deep purple gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900" />

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-yellow-500/50 to-transparent skew-x-12" />

                    {/* Dark glassmorphic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20" />

                    {/* Ambient purple glow */}
                    <div className="absolute -inset-[3px] bg-gradient-to-r from-purple-600/60 via-violet-600/60 to-fuchsia-600/60 rounded-md blur-2xl opacity-50 group-hover:opacity-80 group-hover:blur-3xl transition-all duration-700 -z-10" />

                    {/* Refined border */}
                    <div className="absolute inset-0 rounded-md bg-gradient-to-br from-purple-400/30 via-violet-400/20 to-transparent p-[1px]">
                      <div className="absolute inset-[1px] rounded-md bg-transparent" />
                    </div>

                    <span className="relative flex items-center justify-center gap-3 whitespace-nowrap drop-shadow-lg">
                      <span className="transition-transform duration-300 ">
                        Join Whatsapp Community
                      </span>
                      <FaWhatsapp className="w-6 h-6 transition-all duration-300" />
                    </span>
                  </a>
                )}

                {showSecondButton && (
                  <a
                    href="https://linktr.ee/lnc_community"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex button-appear group relative px-5 py-5 text-white text-base sm:text-md tracking-wide rounded-md overflow-hidden transition-all duration-500 pointer-events-auto secondary-cta"
                  >
                    {/* background */}
                    <div className="absolute inset-0 bg-black backdrop-blur-sm" />

                    {/* border */}
                    <div className="absolute inset-0 rounded-md border border-purple-500/20 group-hover:border-purple-400/40 transition-colors duration-500" />

                    {/* content */}
                    <span className="relative flex items-center gap-4 text-white/70 group-hover:text-white transition-colors duration-300">
                      {/* icon stack */}
                      <span className="flex items-center">
                        <FaWhatsapp className="w-5 h-5 text-white/80 bg-black rounded-full p-[2px] z-30" />
                        <FaInstagram className="-ml-2 w-5 h-5 text-white/80 bg-black rounded-full p-[2px] z-20" />
                        <FaLinkedin className="-ml-2 w-5 h-5 text-white/80 bg-black rounded-full p-[2px] z-10" />
                      </span>

                      {/* label */}
                      <span className="transition-transform duration-300 group-hover:translate-x-[-4px]">
                        Social Media
                      </span>

                      {/* arrow */}
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes buttonSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .button-appear {
          animation: buttonSlideUp 0.6s ease-out forwards;
        }

        /* Primary CTA enhancement */
        .primary-cta {
          box-shadow:
            0 4px 20px rgba(168, 85, 247, 0.3),
            0 0 40px rgba(168, 85, 247, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .primary-cta:hover {
          box-shadow:
            0 8px 30px rgba(168, 85, 247, 0.4),
            0 0 60px rgba(168, 85, 247, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        /* Secondary CTA - subtle */
        .secondary-cta {
          backdrop-filter: blur(4px);
        }

        .night-glass {
          position: relative;
          display: inline-block;
          color: transparent;
          -webkit-text-stroke: 2px rgba(147, 197, 253, 0.7);
          text-stroke: 2px rgba(147, 197, 253, 0.7);
          background: linear-gradient(
            180deg,
            rgba(59, 130, 246, 0.1) 0%,
            rgba(29, 78, 216, 0.15) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          filter: drop-shadow(0 0 16px rgba(96, 165, 250, 0.35))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.7));
        }
        .night-glass::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(191, 219, 254, 0.2);
          text-stroke: 1px rgba(191, 219, 254, 0.2);
          filter: blur(4px);
        }
        .light-radiance {
          position: relative;
          display: inline-block;
          background: linear-gradient(
            135deg,
            #fef3c7 0%,
            #fde047 20%,
            #facc15 40%,
            #eab308 60%,
            #f59e0b 80%,
            #d97706 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 12px rgba(250, 204, 21, 0.7))
            drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
        }
        @media (max-width: 768px) {
          .night-glass {
            -webkit-text-stroke: 1.5px rgba(147, 197, 253, 0.7);
            text-stroke: 1.5px rgba(147, 197, 253, 0.7);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
