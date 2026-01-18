"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
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
  const mobileText = "Developers, designers, and makers building open-source projects together.the future, one commit at a time.Debugging the past in quiet hours.Deploying a year of innovation next.";
  
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
    window.addEventListener('resize', checkMobile);
    
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      window.removeEventListener('resize', checkMobile);
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
          "<60%"
        )
        .to(
          ".hero-content-element",
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          "<70%"
        );
    },
    { scope: container, dependencies: [isLoading] }
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
      className="relative w-full min-h-screen overflow-hidden hero-element"
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
      <div className="absolute inset-0 bg-linear-to-b from-purple-900/10 via-transparent to-black/70 pointer-events-none z-1" />
      <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40 pointer-events-none z-1" />

      {/* Mobile: Logo top, Text bottom | Desktop: Original layout (Text left, Logo right) */}
      <div className="absolute inset-0 z-10 flex flex-col justify-start pt-12 md:pt-24 lg:pt-24 px-6 md:px-12 lg:px-20 pb-20 md:pb-40 lg:pb-12 pointer-events-none overflow-y-auto lg:overflow-y-visible">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-2 md:gap-8 lg:gap-20 items-start">
          
          {/* Logo - Mobile: First (top), Desktop: Right side (order-2, 5 cols) */}
          <div className="hero-content-element order-1 lg:order-2 lg:col-span-5 relative flex items-start justify-center lg:justify-end min-h-[30vh] md:min-h-[240px] lg:min-h-[600px] pointer-events-auto">
            <div
              ref={logoWrapperRef}
              className="relative w-full max-w-[45vw] md:max-w-[260px] lg:max-w-[460px] aspect-square transform will-change-transform"
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
          <div className="hero-content-element order-2 lg:order-1 lg:col-span-7 flex flex-col pointer-events-auto mb-4 md:mb-10 lg:mb-0 -mt-4 md:mt-0">
            <div className="space-y-2 sm:space-y-3">
              <div className="space-y-1">
                <h1 className="text-white text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.1] tracking-tighter">
                  Code by <span className="night-glass">Night</span>
                </h1>
                <h2 className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-cyan-300">
                    Innovate by{" "}
                  </span>
                  <span className="light-radiance">Light</span>
                </h2>
              </div>
              {/* Text content */}
              <div className="pt-1 md:pt-3 lg:pt-4">
                {/* Mobile: Text and button in separate rows */}
                <div className="md:hidden">
                  <p className="text-[13px] text-white/80 font-normal leading-relaxed">
                    {typewriterText}
                    {typewriterText.length < fullText.length && (
                      <span className="inline-block w-0.5 h-4 bg-purple-400 ml-1 animate-pulse" />
                    )}
                  </p>
                  
                  {/* Mobile Button - Separate row, far right */}
                  {showFirstButton && typewriterText.length >= fullText.length && (
                    <div className="flex justify-end mt-3">
                      <a
                        href="https://chat.whatsapp.com/BsuIBMdpsRxCc8bi9IFYIq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-appear group relative inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white text-[11px] font-black uppercase rounded-full overflow-hidden transition-all duration-300 active:scale-90 shadow-[0_0_20px_rgba(192,132,252,0.4)] active:shadow-[0_0_25px_rgba(192,132,252,0.6)] touch-manipulation border border-white/20"
                        style={{
                          WebkitTapHighlightColor: 'rgba(192, 132, 252, 0.3)',
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
                <p className="hidden md:block text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-normal leading-relaxed md:max-w-xl">
                  {typewriterText}
                  {typewriterText.length < fullText.length && (
                    <span className="inline-block w-0.5 h-5 bg-purple-400 ml-1 animate-pulse" />
                  )}
                </p>
              </div>
              
              {/* Desktop Only: Buttons below */}
              <div className="hidden md:flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 lg:pt-10 items-start sm:items-center">
                {showFirstButton && (
                  <a
                    href="https://chat.whatsapp.com/BsuIBMdpsRxCc8bi9IFYIq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-appear group relative px-5 py-3 sm:px-10 sm:py-5 bg-linear-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-[1.02] active:scale-95 pointer-events-auto self-end sm:self-auto w-auto"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap">
                      join the community
                      <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                )}
                {showSecondButton && (
                  <a
                    href="https://linktr.ee/lnc_community"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex button-appear group relative px-8 sm:px-10 py-4 sm:py-5 bg-white/5 backdrop-blur-sm text-white text-base sm:text-lg border-2 border-white/30 font-bold uppercase rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-[1.02] active:scale-95 pointer-events-auto"
                  >
                    <span className="relative flex items-center justify-center gap-2">
                      follow us
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
        .night-glass {
          position: relative;
          display: inline-block;
          color: transparent;
          -webkit-text-stroke: 2px rgba(147, 197, 253, 0.6);
          text-stroke: 2px rgba(147, 197, 253, 0.6);
          background: linear-gradient(
            180deg,
            rgba(59, 130, 246, 0.08) 0%,
            rgba(29, 78, 216, 0.12) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          filter: drop-shadow(0 0 12px rgba(96, 165, 250, 0.25))
            drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
        }
        .night-glass::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(191, 219, 254, 0.15);
          text-stroke: 1px rgba(191, 219, 254, 0.15);
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
          filter: drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))
            drop-shadow(0 0 4px rgba(245, 158, 11, 0.4));
        }
        @media (max-width: 768px) {
          .night-glass {
            -webkit-text-stroke: 1.5px rgba(147, 197, 253, 0.6);
            text-stroke: 1.5px rgba(147, 197, 253, 0.6);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;