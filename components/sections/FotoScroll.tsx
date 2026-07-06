"use client";

import { useRef, useCallback, useState, useEffect } from "react";

function cn(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

const IMG = {
  gal1:       "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=700&fit=crop&auto=format",
  gal2:       "https://images.unsplash.com/photo-1613685856864-caa143093279?w=500&h=700&fit=crop&auto=format",
  gal3:       "https://images.unsplash.com/photo-1628147529780-36964fbb8d54?w=500&h=700&fit=crop&auto=format",
  gal4:       "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=500&h=700&fit=crop&auto=format",
  gal5:       "https://images.unsplash.com/photo-1726731782158-fcf6822b6ca4?w=500&h=700&fit=crop&auto=format",
  gal6:       "https://images.unsplash.com/photo-1781364486016-d83c39eb87f2?w=500&h=700&fit=crop&auto=format",
};

export default function FotoScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const sl = useRef(0);

  const [inView, setInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollWidth - target.clientWidth;
    if (maxScroll <= 0) return;
    setScrollProgress(target.scrollLeft / maxScroll);
  };

  const onDown = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return;
    dragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    sl.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  }, []);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = sl.current - (x - startX.current) * 1.3;
  }, []);

  const stop = useCallback(() => {
    dragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  }, []);

  const cards = [
    { img: IMG.gal1, label: "Konvensi VI 2026" },
    { img: IMG.gal2, label: "Energi Panas Bumi" },
    { img: IMG.gal3, label: "Kunjungan Lapangan" },
    { img: IMG.gal4, label: "Seminar Nasional" },
    { img: IMG.gal5, label: "Fasilitas Kilang" },
    { img: IMG.gal6, label: "Forum Energi" },
  ];

  const radii = [
    "120px 120px 2rem 2rem",
    "2rem 2rem 2rem 2rem",
    "2rem 120px 2rem 2rem",
    "120px 2rem 2rem 2rem",
    "2rem 2rem 120px 2rem",
    "80px 80px 80px 80px",
  ];

  const activeIndex = Math.min(Math.round(scrollProgress * 3), 3);

  return (
    <div ref={containerRef}>
      <div className="flex items-center gap-2 mb-4">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              i === activeIndex ? "w-6 bg-[#F97316]" : "w-2 bg-white/15"
            )}
          />
        ))}
        <span className="ml-1 text-[11px] text-[#555]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          drag untuk scroll
        </span>
      </div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-5 overflow-x-auto pb-4 select-none"
        style={{ cursor: "grab", scrollbarWidth: "none" }}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={stop}
        onMouseLeave={stop}
      >
        {cards.map((c, i) => (
          <div key={i} className="flex-none group" style={{ width: 220 }}>
            <div
              className={cn(
                "relative overflow-hidden bg-[#1e1e1e] border border-white/8 transition-all duration-1000 ease-out",
                inView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              )}
              style={{
                height: 320,
                borderRadius: radii[i % radii.length],
                transform: inView
                  ? `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg) translateX(0)`
                  : `rotate(${i % 2 === 0 ? -4 : 4}deg) translateX(30px)`,
                transitionDelay: `${i * 100}ms`,
                transitionProperty: "opacity, transform",
              }}
            >
              <img src={c.img} alt={c.label} draggable={false}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-white font-bold text-sm"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{c.label}</h4>
              </div>
            </div>
          </div>
        ))}
        <div className="flex-none w-4" />
      </div>
    </div>
  );
}
