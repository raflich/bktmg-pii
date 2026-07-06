import prisma from "@/lib/prisma";
import { Users } from "lucide-react";

/* ── Page header shared ── */
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

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white border border-black/6 overflow-hidden shadow-sm text-left">
      <div className="px-7 py-5 bg-[#111] flex items-center gap-3">
        <div className="w-2 h-6 rounded-full bg-[#F97316]" />
        <h3 className="text-base font-bold text-white"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{title}</h3>
      </div>
      <div className="p-7">{children}</div>
    </div>
  );
}

function MemberRow({ jabatan, nama }: { jabatan: string; nama: string }) {
  return (
    <div className="border-b border-black/5 pb-4 last:border-0 last:pb-0 text-left">
      <div className="text-[11px] text-[#F97316] font-bold uppercase tracking-wider mb-1"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}>{jabatan}</div>
      <div className="text-[#111] text-sm font-semibold"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}>{nama}</div>
    </div>
  );
}

function AvatarRow({ nama }: { nama: string }) {
  return (
    <li className="flex items-center gap-3 text-left">
      <div className="w-9 h-9 rounded-full bg-[#FFF1E6] flex items-center justify-center text-[#F97316] flex-none">
        <Users size={15} />
      </div>
      <span className="text-[#333] text-sm font-semibold"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}>{nama}</span>
    </li>
  );
}

export default async function SusunanPengurusPage() {
  // Fetch members from database
  const allPengurus = await prisma.pengurus.findMany({
    orderBy: {
      urutan: "asc",
    },
  });

  const pembina = allPengurus.filter((p) => p.kategori === "Pembina");
  const penasehat = allPengurus.filter((p) => p.kategori === "Penasehat");
  const inti = allPengurus.filter((p) => p.kategori === "Inti");
  const muk = allPengurus.filter((p) => p.kategori === "MUK");

  return (
    <>
      <PageHeader
        tag="Kepengurusan"
        title={<>Susunan Pengurus<br /><span className="text-[#F97316]">Masa Bakti 2026 – 2029</span></>}
        sub="Daftar lengkap Dewan Pembina, Dewan Penasehat, Pengurus Inti/Harian, dan Majelis Uji Kompetensi BKTMG-PII periode 2026–2029."
      />

      <section className="bg-[#FAFAF8] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col gap-6">

          {/* Pembina & Penasehat */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Dewan Pembina">
              <ul className="flex flex-col gap-3">
                {pembina.map(p => <AvatarRow key={p.id} nama={p.nama} />)}
                {pembina.length === 0 && <span className="text-sm text-[#888]">Belum ada data</span>}
              </ul>
            </Card>
            <Card title="Dewan Penasehat">
              <ul className="flex flex-col gap-3">
                {penasehat.map(p => <AvatarRow key={p.id} nama={p.nama} />)}
                {penasehat.length === 0 && <span className="text-sm text-[#888]">Belum ada data</span>}
              </ul>
            </Card>
          </div>

          {/* Pengurus Inti & MUK */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Pengurus Inti / Harian">
              <div className="flex flex-col gap-4">
                {inti.map((p) => (
                  <MemberRow key={p.id} jabatan={p.jabatan} nama={p.nama} />
                ))}
                {inti.length === 0 && <span className="text-sm text-[#888]">Belum ada data</span>}
              </div>
            </Card>
            <Card title="Majelis Uji Kompetensi (MUK)">
              <div className="flex flex-col gap-4">
                {muk.map((p) => (
                  <MemberRow key={p.id} jabatan={p.jabatan} nama={p.nama} />
                ))}
                {muk.length === 0 && <span className="text-sm text-[#888]">Belum ada data</span>}
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-[#FFF1E6] border border-[#F97316]/20">
                <p className="text-xs text-[#F97316] font-semibold leading-relaxed"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  Tim MUK terdiri dari 1 Ketua, 1 Wakil Ketua, 1 Sekretaris, dan 9 Anggota.
                  Untuk informasi lengkap, silakan hubungi Sekretariat BKTMG.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
