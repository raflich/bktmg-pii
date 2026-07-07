"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    noTelepon: "",
    email: "",
    perusahaan: "",
    institusi: "",
    pesan: "",
    website: "", // Honeypot!
  });

  const [status, setStatus] = useState<{
    type: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaLengkap || !formData.noTelepon || !formData.email || !formData.pesan) {
      setStatus({ type: "error", message: "Mohon lengkapi semua kolom wajib (*)" });
      return;
    }

    setStatus({ type: "submitting" });

    try {
      const res = await fetch("/api/kontak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal mengirim pesan.");
      }

      setStatus({
        type: "success",
        message: "Pesan Anda berhasil terkirim! Tim kami akan segera menghubungi Anda.",
      });
      setFormData({
        namaLengkap: "",
        noTelepon: "",
        email: "",
        perusahaan: "",
        institusi: "",
        pesan: "",
        website: "",
      });
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Terjadi kesalahan koneksi. Silakan coba beberapa saat lagi.",
      });
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-black/6 p-8 shadow-sm text-left">
      <h3 className="text-xl font-extrabold text-[#111] mb-2" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
        Kirim Pesan Langsung
      </h3>
      <p className="text-sm text-[#666] mb-6" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        Isi formulir di bawah ini untuk mengirimkan pertanyaan atau permohonan informasi kepada kami.
      </p>

      {status.type === "success" && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-500/20 text-emerald-800 flex items-start gap-3">
          <CheckCircle2 className="text-emerald-500 flex-none mt-0.5" size={18} />
          <span className="text-xs font-semibold leading-relaxed">{status.message}</span>
        </div>
      )}

      {status.type === "error" && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-500/20 text-rose-800 flex items-start gap-3">
          <AlertCircle className="text-rose-500 flex-none mt-0.5" size={18} />
          <span className="text-xs font-semibold leading-relaxed">{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Honeypot field - hidden from humans but filled by spam bots */}
        <div className="absolute opacity-0 pointer-events-none -z-10 w-0 h-0 overflow-hidden">
          <label>Leave this field blank</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#333] uppercase tracking-wider mb-2">
              Nama Lengkap <span className="text-[#F97316]">*</span>
            </label>
            <input
              type="text"
              name="namaLengkap"
              value={formData.namaLengkap}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-3 rounded-2xl bg-[#F0EFE9] border-0 text-sm font-medium text-[#111] placeholder-[#aaa] focus:ring-2 focus:ring-[#F97316]/50 focus:outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#333] uppercase tracking-wider mb-2">
              No. Telepon / WA <span className="text-[#F97316]">*</span>
            </label>
            <input
              type="tel"
              name="noTelepon"
              value={formData.noTelepon}
              onChange={handleChange}
              placeholder="Contoh: 0812XXXXXXXX"
              className="w-full px-4 py-3 rounded-2xl bg-[#F0EFE9] border-0 text-sm font-medium text-[#111] placeholder-[#aaa] focus:ring-2 focus:ring-[#F97316]/50 focus:outline-none transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#333] uppercase tracking-wider mb-2">
            Email <span className="text-[#F97316]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nama@perusahaan.com"
            className="w-full px-4 py-3 rounded-2xl bg-[#F0EFE9] border-0 text-sm font-medium text-[#111] placeholder-[#aaa] focus:ring-2 focus:ring-[#F97316]/50 focus:outline-none transition-all"
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#333] uppercase tracking-wider mb-2">
              Perusahaan
            </label>
            <input
              type="text"
              name="perusahaan"
              value={formData.perusahaan}
              onChange={handleChange}
              placeholder="Opsional"
              className="w-full px-4 py-3 rounded-2xl bg-[#F0EFE9] border-0 text-sm font-medium text-[#111] placeholder-[#aaa] focus:ring-2 focus:ring-[#F97316]/50 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#333] uppercase tracking-wider mb-2">
              Institusi / Universitas
            </label>
            <input
              type="text"
              name="institusi"
              value={formData.institusi}
              onChange={handleChange}
              placeholder="Opsional"
              className="w-full px-4 py-3 rounded-2xl bg-[#F0EFE9] border-0 text-sm font-medium text-[#111] placeholder-[#aaa] focus:ring-2 focus:ring-[#F97316]/50 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#333] uppercase tracking-wider mb-2">
            Pesan <span className="text-[#F97316]">*</span>
          </label>
          <textarea
            name="pesan"
            value={formData.pesan}
            onChange={handleChange}
            rows={4}
            placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
            className="w-full px-4 py-3 rounded-2xl bg-[#F0EFE9] border-0 text-sm font-medium text-[#111] placeholder-[#aaa] focus:ring-2 focus:ring-[#F97316]/50 focus:outline-none transition-all resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={status.type === "submitting"}
          className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#F97316] text-white font-bold text-sm hover:bg-[#e96200] disabled:bg-[#f3a46e] transition-colors shadow-lg shadow-[#F97316]/20 cursor-pointer"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          {status.type === "submitting" ? (
            "Sedang mengirim..."
          ) : (
            <>
              Kirim Pesan <Send size={15} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
