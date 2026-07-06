import Link from "next/link";
import { ArrowRight, Network, Star, Zap, Award, ChevronRight } from "lucide-react";
import prisma from "@/lib/prisma";
import GalleryScroll from "@/components/sections/GalleryScroll";

const IMG = {
  hero1:    "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?w=800&h=1000&fit=crop&auto=format",
  hero2:    "https://images.unsplash.com/photo-1630142895963-6996ae6b3a5b?w=600&h=700&fit=crop&auto=format",
  hero3:    "https://images.unsplash.com/photo-1777915627530-fc3decb749cf?w=600&h=700&fit=crop&auto=format",
};

/* ── Hero ── */
function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0d0d0d] text-white overflow-hidden pt-20">
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#F97316]/15 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#F97316]/8 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-[1fr_auto] gap-10 items-center min-h-[calc(100vh-80px)] py-16">

        {/* Left */}
        <div className="max-w-xl flex flex-col gap-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F97316]/40 bg-[#F97316]/10 text-[#F97316] text-xs font-bold w-fit uppercase tracking-wider"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
            Asosiasi Profesi di bawah PII
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.07] tracking-tight"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
            Wadah Sinergi &amp;<br />
            <span className="text-[#F97316]">Kolaborasi Insinyur</span><br />
            Teknik Perminyakan
          </h1>

          <p className="text-[#aaa] text-base md:text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            BKTMG-PII menghimpun <strong className="text-white">profesional, akademisi, peneliti</strong>, dan
            praktisi teknik perminyakan &amp; panas bumi untuk meningkatkan kompetensi,
            mengembangkan IPTEK, dan berkontribusi pada{" "}
            <strong className="text-[#F97316]">pembangunan energi nasional</strong>.
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            <Link href="/kegiatan"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F97316] text-white font-bold text-sm hover:bg-[#e96200] transition-colors shadow-lg shadow-[#F97316]/30"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Lihat Kegiatan <ArrowRight size={15} />
            </Link>
            <Link href="/susunan-pengurus"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white font-semibold text-sm hover:border-[#F97316]/50 transition-colors"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Susunan Pengurus
            </Link>
          </div>

          <div className="flex gap-8 pt-5 mt-2 border-t border-white/10">
            {[
              { n: "2026–2029", l: "Masa Bakti Aktif" },
              { n: "VI",        l: "Konvensi Terakhir" },
              { n: "Jan 2026",  l: "Konvensi VI" },
            ].map(({ n, l }) => (
              <div key={l}>
                <div className="text-xl font-extrabold text-[#F97316]"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{n}</div>
                <div className="text-[11px] text-[#777] mt-0.5"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – floating photo collage */}
        <div className="relative h-[440px] w-[340px] hidden md:block">
          <div className="absolute top-0 right-0 w-[210px] h-[310px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
            <img src={IMG.hero1} alt="Kilang minyak" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="absolute top-20 left-0 w-[165px] h-[220px] rounded-[2rem] overflow-hidden shadow-xl border border-[#F97316]/25 rotate-[-4deg]">
            <img src={IMG.hero2} alt="Panas bumi" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#F97316]/10" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[195px] h-[170px] rounded-[1.5rem] overflow-hidden shadow-xl border border-white/10 rotate-[2.5deg]">
            <img src={IMG.hero3} alt="Industri energi" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-6 left-28 w-14 h-14 rounded-full bg-[#F97316] flex items-center justify-center shadow-xl shadow-[#F97316]/40">
            <Award size={22} className="text-white" />
          </div>
          <div className="absolute bottom-8 right-2 bg-white rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F97316]" />
            <span className="text-[11px] font-bold text-[#111]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Aktif di bawah PII
            </span>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 72 C480 0 960 0 1440 72 L1440 72 L0 72Z" fill="#FAFAF8" />
        </svg>
      </div>
    </section>
  );
}

/* ── Profil & Visi Misi ── */
function ProfilVisiMisi() {
  const misi = [
    {
      icon: <Network size={22} />,
      title: "Network",
      desc: "Mengembangkan komunitas jejaring insinyur yang solid, suportif, dan inklusif di seluruh Indonesia.",
    },
    {
      icon: <Star size={22} />,
      title: "Prominent",
      desc: "Menjadi mitra strategis pemerintah, universitas, dan komunitas untuk kemandirian di bidang perminyakan.",
    },
    {
      icon: <Zap size={22} />,
      title: "Value Creation",
      desc: "Menciptakan nilai tambah melalui kegiatan berdampak untuk mewujudkan Indonesia Emas 2045.",
    },
  ];

  return (
    <section className="bg-[#FAFAF8] py-20 md:py-28 text-left">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Profil */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}>Profil Organisasi</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#111] leading-tight"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Asosiasi Profesi Nirlaba<br />
              <span className="text-[#F97316]">Insinyur Perminyakan</span>
            </h2>
            <p className="mt-5 text-[#555] text-base leading-relaxed" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              <strong className="text-[#111]">BKTMG-PII</strong> adalah asosiasi profesi nirlaba yang menjadi wadah bagi
              para insinyur teknik perminyakan dan panas bumi (<em>geothermal</em>) di bawah naungan{" "}
              <strong className="text-[#111]">Persatuan Insinyur Indonesia (PII)</strong>.
            </p>
            <p className="mt-3 text-[#555] text-base leading-relaxed" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Organisasi ini menghimpun profesional, akademisi, peneliti, dan praktisi untuk
              meningkatkan kompetensi, mengembangkan IPTEK, serta berkontribusi pada
              pembangunan energi nasional yang berkelanjutan.
            </p>
            <Link href="/susunan-pengurus"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#F97316] hover:gap-3 transition-all"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Lihat Susunan Pengurus <ChevronRight size={15} />
            </Link>
          </div>

          {/* Visi */}
          <div className="relative rounded-3xl bg-[#111] text-white p-8 md:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#F97316]/15 blur-3xl pointer-events-none" />
            <div className="relative">
              <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}>Visi</span>
              <p className="mt-4 text-xl md:text-2xl font-extrabold leading-snug"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                "Wadah Sinergi &amp; Kolaborasi Insinyur Teknik Perminyakan Untuk Dampak Berkelanjutan."
              </p>
              <div className="mt-6 h-1 w-12 bg-[#F97316] rounded-full" />
            </div>
          </div>
        </div>

        {/* Misi */}
        <div>
          <div className="text-center mb-10">
            <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}>Misi</span>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-[#111]"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>Tiga Pilar Gerak Organisasi</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {misi.map((m, i) => (
              <div key={m.title} className="group rounded-3xl p-7 bg-white border border-black/6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[#FFF1E6] text-[#F97316]">
                  {m.icon}
                </div>
                <div className="text-xs text-[#F97316] font-bold uppercase tracking-wider mb-1"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}>Pilar {i + 1}</div>
                <h3 className="text-lg font-extrabold text-[#111] mb-2"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{m.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA strip ── */
function CTAStrip() {
  return (
    <section className="bg-[#FAFAF8] py-16 md:py-20 text-left">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="relative rounded-[2.5rem] overflow-hidden min-h-[320px] flex items-center"
          style={{ background: "linear-gradient(135deg,#111 60%,#1a0a00)" }}>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F97316]/20 blur-[80px] pointer-events-none" />
          <div className="relative z-10 px-8 md:px-14 py-12 flex flex-col md:flex-row md:items-center justify-between gap-8 w-full">
            <div>
              <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}>Bergabung</span>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-white max-w-lg leading-snug"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                Jadilah Bagian dari Komunitas{" "}
                <span className="text-[#F97316]">Insinyur Perminyakan Indonesia</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 flex-none">
              <Link href="/hubungi-kami"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F97316] text-white font-bold text-sm hover:bg-[#e96200] transition-colors"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                Hubungi Kami <ArrowRight size={14} />
              </Link>
              <Link href="/kegiatan"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:border-white/40 transition-colors"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                Lihat Kegiatan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function Beranda() {
  const kegiatan = await prisma.kegiatan.findMany({
    orderBy: {
      tanggal: "desc",
    },
  });

  return (
    <>
      <Hero />
      <ProfilVisiMisi />
      <GalleryScroll kegiatan={kegiatan} />
      <CTAStrip />
    </>
  );
}
