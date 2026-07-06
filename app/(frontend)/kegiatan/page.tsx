import prisma from "@/lib/prisma";
import FotoScroll from "@/components/sections/FotoScroll";
import { Calendar, ChevronRight } from "lucide-react";

function PageHeader({ tag, title, sub }: { tag: string; title: React.ReactNode; sub: string }) {
  return (
    <section className="bg-[#111] pt-32 pb-16 md:pt-36 md:pb-20 relative overflow-hidden text-left">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#F97316]/12 blur-[120px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}>{tag}</span>
        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white leading-tight"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{title}</h1>
        <p className="mt-4 text-[#888] text-base max-w-xl leading-relaxed"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}>{sub}</p>
        <div className="mt-8 h-1 w-14 bg-[#F97316] rounded-full" />
      </div>
    </section>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function getTag(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("konvensi") && lower.includes("seminar")) return "Konvensi & Seminar";
  if (lower.includes("konvensi")) return "Konvensi";
  if (lower.includes("seminar")) return "Seminar";
  if (lower.includes("lokakarya") || lower.includes("diskusi")) return "Lokakarya";
  return "Kegiatan";
}

export default async function KegiatanPage() {
  const events = await prisma.kegiatan.findMany({
    orderBy: {
      tanggal: "desc",
    },
  });

  return (
    <>
      <PageHeader
        tag="Kegiatan BKTMG-PII"
        title={<>Program &amp; Agenda<br /><span className="text-[#F97316]">Resmi Organisasi</span></>}
        sub="Dokumentasi kegiatan resmi BKTMG-PII dari konvensi, seminar, hingga lokakarya yang memperkuat jejaring dan kompetensi insinyur Indonesia."
      />

      {/* Event cards */}
      <section className="bg-[#FAFAF8] py-16 md:py-24 text-left">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((ev, index) => {
              const tag = getTag(ev.judul);
              const isLatest = index === 0;
              const formattedDate = ev.judul.includes("Diskusi Panel & Lokakarya") ? "Berkala" : formatDate(ev.tanggal);

              return (
                <div key={ev.id}
                  className="group rounded-3xl overflow-hidden bg-white border border-black/6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="h-52 overflow-hidden relative">
                    <img src={ev.fotoUrl} alt={ev.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F97316] text-white text-[11px] font-bold"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                        <Calendar size={10} /> {tag}
                      </span>
                    </div>
                    {isLatest && (
                      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white text-[#F97316] text-[10px] font-bold">
                        Terbaru
                      </div>
                    )}
                  </div>
                  <div className="p-7">
                    <div className="text-[11px] text-[#888] font-semibold mb-2"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}>{formattedDate}</div>
                    <h3 className="text-base font-bold text-[#111] mb-2"
                      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{ev.judul}</h3>
                    <p className="text-sm text-[#666] leading-relaxed"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}>{ev.deskripsi}</p>
                    <button className="mt-5 flex items-center gap-1 text-sm font-semibold text-[#F97316] hover:gap-2.5 transition-all"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                      Selengkapnya <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
            {events.length === 0 && (
              <div className="col-span-3 text-center py-10 text-[#888]">
                Belum ada data kegiatan.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Foto dokumentasi scrollable */}
      <section className="bg-[#111] py-16 md:py-24 overflow-hidden text-left">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>Foto Dokumentasi</span>
          <h2 className="mt-2 mb-8 text-2xl md:text-3xl font-extrabold text-white"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
            Konvensi VI BKTMG PII 2026 &amp;<br />
            <span className="text-[#F97316]">Diskusi Panel &amp; Lokakarya</span>
          </h2>
          <FotoScroll />
        </div>
      </section>
    </>
  );
}
