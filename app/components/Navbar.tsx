"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "https://linktr.ee/lnc_community" },
    { name: "Featured Projects", href: "#projects" },
    { name: "Community", href: "#community" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-3 md:px-4">
      <nav className="flex items-center justify-between px-4 md:px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl w-full max-w-5xl">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-lg md:text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity touch-target"
          >
            LNC
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors touch-target"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side - GitHub + Mobile Menu Button */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* GitHub Link */}
          <Link
            href="https://github.com/LNC-Network"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 md:p-2.5 hover:bg-white/10 rounded-full transition-colors touch-target"
            aria-label="GitHub Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 md:w-5 md:h-5"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors touch-target"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              // Close icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-3 right-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-medium text-white hover:bg-white/10 rounded-xl transition-colors touch-target"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
