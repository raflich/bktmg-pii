import { MapPin, Phone, Mail, Youtube, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const footerLinks: Record<
    string,
    { name: string; href: string; external?: boolean }[]
  > = {
    Organisasi: [
      { name: "Profil BKTMG", href: "/" },
      { name: "Visi & Misi", href: "/" },
      { name: "Susunan Pengurus", href: "/susunan-pengurus" },
    ],
    Kegiatan: [
      { name: "Konvensi VI 2026", href: "/kegiatan" },
      { name: "Konvensi V 2023", href: "/kegiatan" },
      { name: "Diskusi Panel", href: "/kegiatan" },
      { name: "Lokakarya", href: "/kegiatan" },
    ],
    PII: [
      { name: "Tentang PII", href: "https://www.pii.or.id", external: true },
      { name: "Website PII", href: "https://www.pii.or.id", external: true },
    ],
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/6 pt-14 pb-8 text-left">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="h-11 w-auto aspect-[3/4] overflow-hidden flex items-center justify-center bg-white flex-none border border-white/10">
                <img src="/logo-pii.jpg" alt="PII Logo" className="h-full w-auto object-contain" />
              </div>
              <span
                className="text-lg font-extrabold tracking-wide uppercase text-white"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                BK TMG - PII
              </span>
            </div>
            <p className="text-[#666] text-sm leading-relaxed mb-5" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Asosiasi profesi nirlaba wadah insinyur teknik perminyakan dan panas bumi
              di bawah naungan Persatuan Insinyur Indonesia (PII).
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Youtube, href: "https://www.youtube.com/@BKTMG-PII" },
                { Icon: Instagram, href: "https://www.instagram.com/piibktmg" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/bktmg-pii-882b82417" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#F97316] flex items-center justify-center text-[#888] hover:text-white transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white text-sm font-bold mb-4" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                {group}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.name}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#666] hover:text-[#F97316] text-[13px] transition-colors"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[#666] hover:text-[#F97316] text-[13px] transition-colors"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/6 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-wrap gap-6 text-[#555] text-xs" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            <span className="flex items-center gap-1.5">
              <MapPin size={11} className="text-[#F97316]" /> Setiabudi & Pejaten Barat, Jakarta Selatan
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={11} className="text-[#F97316]" /> (021) 21481780
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={11} className="text-[#F97316]" /> pii.bktmg@gmail.com
            </span>
          </div>
          <p className="text-[#444] text-xs" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            © 2026 BKTMG-PII. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
