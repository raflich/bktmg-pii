import prisma from "@/lib/prisma";
import { User } from "lucide-react";

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
      <div className="px-7 py-5 bg-[#222] flex items-center">
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
      <div className="text-[#111] text-sm font-semibold leading-relaxed"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}>{nama}</div>
    </div>
  );
}

function AvatarRow({ nama }: { nama: string }) {
  return (
    <li className="flex items-center gap-3 text-left">
      <div className="w-9 h-9 rounded-full bg-[#FFF1E6] flex items-center justify-center text-[#F97316] flex-none">
        <User size={15} />
      </div>
      <span className="text-[#333] text-sm font-semibold"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}>{nama}</span>
    </li>
  );
}

interface PengurusMember {
  id: string;
  nama: string;
  jabatan: string;
  kategori: string;
  fotoUrl: string | null;
  urutan: number;
}

export default async function SusunanPengurusPage() {
  // Fetch members from database
  const allPengurus = (await prisma.pengurus.findMany({
    orderBy: {
      urutan: "asc",
    },
  })) as PengurusMember[];

  const pembina = allPengurus.filter((p: PengurusMember) => p.kategori === "Pembina");
  const penasehat = allPengurus.filter((p: PengurusMember) => p.kategori === "Penasehat");
  const inti = allPengurus.filter((p: PengurusMember) => p.kategori === "Inti");
  const muk = allPengurus.filter((p: PengurusMember) => p.kategori === "MUK");

  // Split Pengurus Badan Keahlian into Left and Right Columns
  const intiKiri = inti.slice(0, 10);
  const intiKanan = inti.slice(10);

  // Split MUK into Pimpinan and Anggota
  const mukPimpinan = muk.filter((p: PengurusMember) => p.jabatan !== "Anggota Tim MUK");
  const mukAnggota = muk.filter((p: PengurusMember) => p.jabatan === "Anggota Tim MUK");

  return (
    <>
      <PageHeader
        tag="Kepengurusan"
        title={<>Susunan Pengurus<br /><span className="text-[#F97316]">Masa Bakti 2026 – 2029</span></>}
        sub="Daftar lengkap Dewan Pembina, Dewan Penasehat, Pengurus Badan Keahlian, dan Majelis Uji Kompetensi BKTMG-PII periode 2026–2029."
      />

      <section className="bg-[#FAFAF8] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col gap-6">

          {/* Pembina & Penasehat */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Dewan Pembina">
              <ul className="flex flex-col gap-4">
                {pembina.map(p => <AvatarRow key={p.id} nama={p.nama} />)}
                {pembina.length === 0 && <span className="text-sm text-[#888]">Belum ada data</span>}
              </ul>
            </Card>
            <Card title="Dewan Penasehat">
              <ul className="flex flex-col gap-4">
                {penasehat.map(p => <AvatarRow key={p.id} nama={p.nama} />)}
                {penasehat.length === 0 && <span className="text-sm text-[#888]">Belum ada data</span>}
              </ul>
            </Card>
          </div>

          {/* Pengurus Badan Keahlian (Full Width) */}
          <Card title="Pengurus Badan Keahlian">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Left Column */}
              <div className="flex flex-col gap-4">
                {intiKiri.map((p) => (
                  <MemberRow key={p.id} jabatan={p.jabatan} nama={p.nama} />
                ))}
                {intiKiri.length === 0 && <span className="text-sm text-[#888]">Belum ada data</span>}
              </div>
              
              {/* Right Column */}
              <div className="flex flex-col gap-4">
                {intiKanan.map((p) => (
                  <MemberRow key={p.id} jabatan={p.jabatan} nama={p.nama} />
                ))}
                {intiKanan.length === 0 && <span className="text-sm text-[#888]">Belum ada data</span>}
              </div>
            </div>
          </Card>

          {/* Majelis Uji Kompetensi (MUK) (Full Width) */}
          <Card title="Majelis Uji Kompetensi (MUK)">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Left Column - Pimpinan */}
              <div className="flex flex-col gap-4">
                {mukPimpinan.map((p) => (
                  <MemberRow key={p.id} jabatan={p.jabatan} nama={p.nama} />
                ))}
                {mukPimpinan.length === 0 && <span className="text-sm text-[#888]">Belum ada data</span>}
              </div>

              {/* Right Column - Anggota */}
              <div>
                <div className="text-[11px] text-[#F97316] font-bold uppercase tracking-wider mb-3"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  ANGGOTA TIM MUK
                </div>
                <ul className="flex flex-col gap-2">
                  {mukAnggota.map((p) => (
                    <li key={p.id} className="text-[#111] text-sm font-semibold flex items-start gap-2"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                      <span className="text-[#F97316] flex-none">•</span>
                      <span>{p.nama}</span>
                    </li>
                  ))}
                  {mukAnggota.length === 0 && <span className="text-sm text-[#888]">Belum ada data</span>}
                </ul>
              </div>
            </div>
          </Card>

        </div>
      </section>
    </>
  );
}
