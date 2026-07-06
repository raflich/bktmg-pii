"use client";

import { useRef, useCallback, useState, useEffect } from "react";

function cn(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

interface Kegiatan {
  id: string;
  judul: string;
  deskripsi: string;
  fotoUrl: string;
  tanggal: Date;
}

export default function GalleryScroll({ kegiatan }: { kegiatan: Kegiatan[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const sl = useRef(0);
  
  const [inView, setInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fallbacks to supplement database items up to 7 items for horizontal scroll layout
  const mockFallbacks = [
    {
      id: "mock-1",
      fotoUrl: "https://images.unsplash.com/photo-1630142895963-6996ae6b3a5b?w=600&h=700&fit=crop&auto=format",
      judul: "Panas Bumi & Geothermal",
      tanggal: new Date("2025-06-15"),
      deskripsi: "Eksplorasi Energi Terbarukan dan Potensi Geothermal Indonesia.",
    },
    {
      id: "mock-2",
      fotoUrl: "https://images.unsplash.com/photo-1628147529780-36964fbb8d54?w=500&h=700&fit=crop&auto=format",
      judul: "Kunjungan Lapangan",
      tanggal: new Date("2024-11-20"),
      deskripsi: "Kunjungan Insinyur Perminyakan di Lokasi Operasi Hulu Migas.",
    },
    {
      id: "mock-3",
      fotoUrl: "https://images.unsplash.com/photo-1726731782158-fcf6822b6ca4?w=500&h=700&fit=crop&auto=format",
      judul: "Fasilitas Industri",
      tanggal: new Date("2025-02-05"),
      deskripsi: "Inspeksi Kilang & Pemrosesan Minyak dan Gas Bumi.",
    },
    {
      id: "mock-4",
      fotoUrl: "https://images.unsplash.com/photo-1781364486016-d83c39eb87f2?w=500&h=700&fit=crop&auto=format",
      judul: "Forum Energi",
      tanggal: new Date("2025-05-12"),
      deskripsi: "Kolaborasi Lintas Institusi dan Diskusi Kebijakan Transisi Energi.",
    },
  ];

  // Display DB items first, then supplement with mock items to guarantee scrollable length
  const displayList = [...kegiatan, ...mockFallbacks];

  // Intersection Observer for staggered entry animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Dynamically check if scroll track has horizontal overflow
  useEffect(() => {
    const checkOverflow = () => {
      if (trackRef.current) {
        setIsOverflowing(trackRef.current.scrollWidth > trackRef.current.clientWidth);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [displayList.length]);

  // Vertical scroll translation to horizontal scroll (slide-to-side on scroll)
  useEffect(() => {
    const handlePageScroll = () => {
      if (dragging.current || !trackRef.current) return;
      
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if gallery is in the viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate scroll progress percentage through viewport
        const startOffset = windowHeight;
        const elementHeight = rect.height;
        const totalDist = startOffset + elementHeight;
        const scrolledDist = startOffset - rect.top;
        
        const progress = Math.max(0, Math.min(1, scrolledDist / totalDist));
        
        const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;
        if (maxScroll > 0) {
          // Smoothly set scroll position
          trackRef.current.scrollLeft = progress * maxScroll;
        }
      }
    };

    window.addEventListener("scroll", handlePageScroll, { passive: true });
    return () => window.removeEventListener("scroll", handlePageScroll);
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

  const radii = [
    "130px 130px 2rem 2rem",
    "2rem 2rem 2rem 2rem",
    "2rem 130px 2rem 2rem",
    "130px 2rem 2rem 2rem",
    "2rem 2rem 130px 2rem",
    "2rem 2rem 2rem 130px",
    "80px 80px 80px 80px",
  ];

  const activeIndex = Math.min(Math.round(scrollProgress * 3), 3);

  return (
    <section ref={sectionRef} className="bg-[#111] py-20 md:py-28 overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-5 md:px-10 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}>Galeri Dokumentasi</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-white leading-tight"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Rekam Jejak<br />
              <span className="text-[#F97316]">BKTMG-PII</span>
            </h2>
          </div>
          <p className="text-[#777] text-sm max-w-xs" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Geser atau scroll halaman ke bawah untuk melihat dokumentasi kegiatan dari database.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-5">
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
            drag / scroll untuk geser
          </span>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className={cn(
          "flex gap-5 overflow-x-auto px-5 md:px-10 pb-6 select-none scroll-smooth",
          isOverflowing ? "justify-start" : "justify-center"
        )}
        style={{ cursor: "grab", scrollbarWidth: "none" }}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={stop}
        onMouseLeave={stop}
      >
        {displayList.map((k, i) => (
          <div
            key={k.id}
            className="flex-none group"
            style={{
              width: 255,
            }}
          >
            <div
              className={cn(
                "relative overflow-hidden bg-[#1e1e1e] border border-white/8 transition-all duration-1000 ease-out",
                inView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-16"
              )}
              style={{
                height: 370,
                borderRadius: radii[i % radii.length],
                transform: inView
                  ? `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg) translateX(0)`
                  : `rotate(${i % 2 === 0 ? -4 : 4}deg) translateX(40px)`,
                transitionDelay: `${i * 100}ms`,
                transitionProperty: "opacity, transform, box-shadow",
              }}
            >
              <img src={k.fotoUrl} alt={k.judul} draggable={false}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-[10px] text-[#F97316] font-bold uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}>Dokumentasi</div>
                <h4 className="text-white font-bold text-[15px] mt-1 line-clamp-2"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{k.judul}</h4>
                <p className="text-white/60 text-[11px] mt-0.5 line-clamp-2"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  {new Date(k.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {displayList.length === 0 && (
          <div className="text-white/50 text-sm px-5 py-10">Belum ada dokumentasi di database.</div>
        )}
        <div className="flex-none w-6" />
      </div>
    </section>
  );
}
