"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

// Set to true to enable the popup, or false to disable it
const IS_ANNOUNCEMENT_ACTIVE = true;
const POPUP_STORAGE_KEY = "bktmg_popup_closed_oct10";

export default function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Do not show popup if feature is disabled
    if (!IS_ANNOUNCEMENT_ACTIVE) return;

    // Check session storage so it doesn't show on every single page refresh during the session
    const isClosed = sessionStorage.getItem(POPUP_STORAGE_KEY);
    if (!isClosed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem(POPUP_STORAGE_KEY, "true");
  };

  if (!IS_ANNOUNCEMENT_ACTIVE || !isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[9999] flex items-center justify-center p-3 sm:p-4 transition-all duration-300 animate-in fade-in"
    >
      <div 
        className="relative bg-[#0d0d11] border border-white/10 rounded-[1.8rem] max-w-[480px] w-full overflow-hidden shadow-2xl transition-all duration-300 scale-in animate-in zoom-in-95 duration-200 p-[5px]"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {/* Main Image Area with 5px padding */}
        <div className="relative rounded-[1.4rem] overflow-hidden bg-black">
          {/* Close Button on Top Right */}
          <button 
            onClick={handleClose}
            className="absolute top-3 right-3 z-50 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white/90 hover:text-white transition-all hover:scale-105 shadow-md"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {/* Image Container - Flyer fits nicely */}
          <div className="relative w-full max-h-[70vh] overflow-y-auto flex items-center justify-center bg-black">
            <a 
              href="https://forms.gle/DGXSdFkzRxLRyBUz6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full"
            >
              <img 
                src="/ADS_10_Okt.jpeg" 
                alt="BKTMG PII Goes to Campus Webinar" 
                className="w-full h-auto object-contain block"
              />
            </a>
          </div>
        </div>

        {/* Footer/CTA Section - Aligned with image width */}
        <div className="bg-[#09090c] p-3.5 sm:p-4 rounded-[1.4rem] mt-[5px] border border-white/5 flex items-center justify-between gap-3">
          <a
            href="https://forms.gle/DGXSdFkzRxLRyBUz6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#F97316] hover:bg-[#e96200] text-white font-extrabold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-[#F97316]/30 hover:shadow-[#F97316]/50 hover:-translate-y-0.5 active:translate-y-0 text-center uppercase whitespace-nowrap"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            Daftar Sekarang
          </a>
          <div className="text-right pr-1">
            <p className="text-white/50 text-[10px] sm:text-[11px] font-medium leading-tight">
              Kuota Terbatas &bull; Pelaksanaan:
            </p>
            <p className="text-[#F97316] text-[11px] sm:text-xs font-bold mt-0.5">
              10 Oktober 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
