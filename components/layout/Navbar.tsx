"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

function cn(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const prevScrollY = useRef(0);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scrolled state (for transparent background)
      setScrolled(currentScrollY > 50);

      // Determine visibility state (hide on scroll down, show on scroll up)
      if (currentScrollY > 150) {
        if (currentScrollY > prevScrollY.current) {
          // Scrolling down
          setVisible(false);
        } else {
          // Scrolling up
          setVisible(true);
        }
      } else {
        // Always show near top
        setVisible(true);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // transparent with white text on all pages when at the top (over dark headers)
  const transparent = !scrolled;

  const NAV = [
    { label: "Beranda", to: "/" },
    { label: "Susunan Pengurus", to: "/susunan-pengurus" },
    { label: "Kegiatan BKTMG-PII", to: "/kegiatan" },
  ];

  const textColor = transparent ? "text-white/90 hover:text-white" : "text-[#333] hover:text-[#F97316]";
  const logoText = transparent ? "text-white" : "text-[#111]";
  const logoSub = transparent ? "text-white/60" : "text-[#888]";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        transparent
          ? "bg-transparent"
          : "bg-white/96 backdrop-blur-md shadow-sm border-b border-black/6",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <nav
        className={cn(
          "max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between transition-all duration-500 ease-in-out",
          scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white flex-none group-hover:scale-105 transition-transform duration-300 shadow-sm border border-black/5">
            <img src="/logo-pii.jpg" alt="PII Logo" className="w-full h-full object-cover" />
          </div>
          <div style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}>
            <div className={cn("text-sm font-black leading-tight transition-colors duration-300", logoText)}>
              BK TMG – PII
            </div>
            <div className={cn("text-[10px] leading-none font-medium transition-colors duration-300", logoSub)}>
              Persatuan Insinyur Indonesia
            </div>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV.map(({ label, to }) => {
            const isActive = to === "/" ? pathname === "/" : pathname.startsWith(to);
            const linkColor = transparent
              ? "text-white/90 hover:text-white"
              : isActive
                ? "text-[#F97316]"
                : "text-[#333] hover:text-[#F97316]";
            const underlineColor = transparent ? "after:bg-white" : "after:bg-[#F97316]";

            return (
              <li key={label}>
                <Link
                  href={to}
                  className={cn(
                    "text-[13px] font-semibold transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full",
                    underlineColor,
                    isActive ? "after:w-full" : "",
                    linkColor
                  )}
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <Link
          href="/hubungi-kami"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F97316] text-white text-[13px] font-bold hover:bg-[#e96200] transition-all hover:scale-105 duration-300 shadow-md shadow-[#F97316]/25"
          style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
        >
          Hubungi Kami <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X size={22} className={transparent ? "text-white" : "text-[#111]"} />
          ) : (
            <Menu size={22} className={transparent ? "text-white" : "text-[#111]"} />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-black/5 px-5 py-4 flex flex-col gap-1 shadow-lg animate-in fade-in slide-in-from-top-5 duration-300">
          {NAV.map(({ label, to }) => {
            const isActive = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={label}
                href={to}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 text-sm font-semibold border-b border-black/5 last:border-0 transition-colors",
                  isActive ? "text-[#F97316]" : "text-[#333] hover:text-[#F97316]"
                )}
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/hubungi-kami"
            onClick={() => setOpen(false)}
            className="mt-3 text-center py-3 rounded-full bg-[#F97316] text-white text-sm font-bold shadow-md shadow-[#F97316]/20"
            style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
          >
            Hubungi Kami
          </Link>
        </div>
      )}
    </header>
  );
}
