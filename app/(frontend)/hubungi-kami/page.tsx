import prisma from "@/lib/prisma";
import ContactForm from "@/components/sections/ContactForm";
import { MapPin, Phone, Mail, Globe, MessageCircle } from "lucide-react";

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

interface OfficeInfo {
  id: string;
  nama: string;
  alamat: string;
  telepon: string;
  whatsapp?: string | null;
  email: string;
  web?: string | null;
  mapsEmbed: string;
}

function cleanPhone(phoneStr: string): string {
  const digits = phoneStr.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    return "62" + digits.slice(1);
  }
  return digits;
}

function formatWebLink(webStr: string): string {
  const trimmed = webStr.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export default async function HubungiKamiPage() {
  // Query offices/sekretariats from database
  const offices = (await prisma.infoInstansi.findMany()) as OfficeInfo[];

  const renderMap = (iframeStr: string, title: string) => {
    const trimmed = iframeStr.trim();
    
    // If it's a direct URL
    if (trimmed.startsWith("http")) {
      return (
        <iframe
          title={title}
          src={trimmed}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: 300 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      );
    }
    
    // If it's a full <iframe> HTML tag, modify width/height/style to make it fully responsive
    let processedHtml = trimmed;
    processedHtml = processedHtml.replace(/width="[^"]*"/g, 'width="100%"');
    processedHtml = processedHtml.replace(/height="[^"]*"/g, 'height="100%"');
    processedHtml = processedHtml.replace(/style="[^"]*"/g, 'style="border:0; min-height:300px; width:100%; height:100%;"');
    
    // If style attribute is missing, inject it
    if (!processedHtml.includes("style=")) {
      processedHtml = processedHtml.replace("<iframe", '<iframe style="border:0; min-height:300px; width:100%; height:100%;"');
    }
    
    return (
      <div 
        className="w-full h-full min-h-[300px]"
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
    );
  };

  return (
    <>
      <PageHeader
        tag="Hubungi Kami"
        title={<>Dua Lokasi Sekretariat<br /><span className="text-[#F97316]">Siap Melayani Anda</span></>}
        sub="Temukan kami di Sekretariat PII Pusat (Setiabudi) dan Sekretariat BKTMG (Pejaten Barat), Jakarta Selatan."
      />

      <section className="bg-[#FAFAF8] py-16 md:py-24 text-left">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col gap-12">
          {offices.map((office: OfficeInfo, idx: number) => {
            const telNumbers = office.telepon.split("/").map(t => t.trim());

            return (
              <div key={office.id} className="grid md:grid-cols-2 gap-6 items-stretch">
                {/* Info panel */}
                <div className="rounded-3xl bg-white border border-black/6 overflow-hidden shadow-sm flex flex-col h-full">
                  <div className="px-7 py-5 bg-[#111] flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full flex-none ${idx % 2 === 0 ? "bg-[#F97316]" : "bg-white/60"}`} />
                    <h3 className="text-base font-bold text-white"
                      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{office.nama}</h3>
                  </div>
                  <ul className="p-7 flex flex-col gap-5 flex-grow justify-center">
                    {/* Alamat */}
                    <li className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-[#FFF1E6] flex items-center justify-center text-[#F97316] flex-none mt-0.5">
                        <MapPin size={15} />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#aaa] font-bold uppercase tracking-wider mb-0.5"
                          style={{ fontFamily: "var(--font-inter), sans-serif" }}>Alamat</div>
                        <span className="text-sm font-semibold text-[#333]"
                          style={{ fontFamily: "var(--font-inter), sans-serif" }}>{office.alamat}</span>
                      </div>
                    </li>

                    {/* Telepon */}
                    {telNumbers.map((num, i) => {
                      const cleanNum = num.replace(/\D/g, "");
                      return (
                        <li key={i} className="flex items-start gap-3.5">
                          <div className="w-8 h-8 rounded-full bg-[#FFF1E6] flex items-center justify-center text-[#F97316] flex-none mt-0.5">
                            <Phone size={15} />
                          </div>
                          <div>
                            <div className="text-[10px] text-[#aaa] font-bold uppercase tracking-wider mb-0.5"
                              style={{ fontFamily: "var(--font-inter), sans-serif" }}>Telepon {telNumbers.length > 1 ? i + 1 : ""}</div>
                            {cleanNum ? (
                              <a href={`tel:${cleanNum}`}
                                className="text-sm font-semibold text-[#111] hover:text-[#F97316] transition-colors break-all"
                                style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                                {num}
                              </a>
                            ) : (
                              <span className="text-sm font-semibold text-[#333]"
                                style={{ fontFamily: "var(--font-inter), sans-serif" }}>{num}</span>
                            )}
                          </div>
                        </li>
                      );
                    })}

                    {/* WhatsApp */}
                    {office.whatsapp && (
                      <li className="flex items-start gap-3.5">
                        <div className="w-8 h-8 rounded-full bg-[#FFF1E6] flex items-center justify-center text-[#F97316] flex-none mt-0.5">
                          <MessageCircle size={15} />
                        </div>
                        <div>
                          <div className="text-[10px] text-[#aaa] font-bold uppercase tracking-wider mb-0.5"
                            style={{ fontFamily: "var(--font-inter), sans-serif" }}>WhatsApp</div>
                          <a href={`https://wa.me/${cleanPhone(office.whatsapp)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-[#111] hover:text-[#F97316] transition-colors break-all"
                            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                            {office.whatsapp}
                          </a>
                        </div>
                      </li>
                    )}

                    {/* Email */}
                    <li className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-[#FFF1E6] flex items-center justify-center text-[#F97316] flex-none mt-0.5">
                        <Mail size={15} />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#aaa] font-bold uppercase tracking-wider mb-0.5"
                          style={{ fontFamily: "var(--font-inter), sans-serif" }}>Email</div>
                        <a href={`mailto:${office.email}`}
                          className="text-sm font-semibold text-[#111] hover:text-[#F97316] transition-colors break-all"
                          style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                          {office.email}
                        </a>
                      </div>
                    </li>

                    {/* Website */}
                    {office.web && (
                      <li className="flex items-start gap-3.5">
                        <div className="w-8 h-8 rounded-full bg-[#FFF1E6] flex items-center justify-center text-[#F97316] flex-none mt-0.5">
                          <Globe size={15} />
                        </div>
                        <div>
                          <div className="text-[10px] text-[#aaa] font-bold uppercase tracking-wider mb-0.5"
                            style={{ fontFamily: "var(--font-inter), sans-serif" }}>Website</div>
                          <a href={formatWebLink(office.web)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-[#111] hover:text-[#F97316] transition-colors break-all"
                            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                            {office.web}
                          </a>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Map Grid Container */}
                <div className="rounded-3xl overflow-hidden border border-black/6 shadow-sm bg-white h-full min-h-[300px] flex items-center justify-center">
                  {renderMap(office.mapsEmbed, office.nama)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Grid containing Contact Form & Quick CTAs */}
      <section className="bg-[#111] py-20 text-left border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Quick contact CTA (Left) */}
          <div className="flex flex-col gap-5">
            <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}>Hubungi Kami</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Ada pertanyaan?<br />
              <span className="text-[#F97316]">Kirim pesan kepada kami.</span>
            </h2>
            <p className="text-[#888] text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Tim sekretariat kami siap menjawab pertanyaan Anda seputar pengurusan sertifikasi kompetensi insinyur (MUK), pendaftaran keanggotaan baru, kegiatan, dan kemitraan organisasi.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href="mailto:pii.bktmg@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F97316] text-white font-bold text-sm hover:bg-[#e96200] transition-colors"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                Kirim Email <Mail size={14} />
              </a>
              <a href="https://wa.me/62818794906"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:border-white/40 transition-colors"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                Hubungi WhatsApp <MessageCircle size={14} />
              </a>
            </div>
          </div>

          {/* Form (Right) */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
