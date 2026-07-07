import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Prevent global variable resetting during next dev HMR updates
const globalForRateLimit = global as unknown as {
  rateLimitStore?: Map<string, number[]>;
};

const rateLimitStore = globalForRateLimit.rateLimitStore || new Map<string, number[]>();
if (process.env.NODE_ENV !== "production") {
  globalForRateLimit.rateLimitStore = rateLimitStore;
}

const LIMIT_COUNT = 3;
const WINDOW_DURATION = 15 * 60 * 1000; // 15 minutes window

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { namaLengkap, noTelepon, email, perusahaan, institusi, pesan, website } = body;

    // 1. Honeypot check - if filled, ignore silently (fake success response to trick spam bots)
    if (website && website.trim() !== "") {
      console.warn("Honeypot filled by bot. Silently ignoring submission.");
      return NextResponse.json({ success: true, fake: true }, { status: 200 });
    }

    // 2. Mandatory field validation
    if (!namaLengkap || !noTelepon || !email || !pesan) {
      return NextResponse.json(
        { error: "Mohon isi semua field yang wajib (*)" },
        { status: 400 }
      );
    }

    // 3. IP Rate Limiting (Max 3 submissions per 15 minutes)
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const now = Date.now();
    const userTimestamps = rateLimitStore.get(ip) || [];

    // Filter out expired timestamps
    const activeTimestamps = userTimestamps.filter((time) => now - time < WINDOW_DURATION);

    if (activeTimestamps.length >= LIMIT_COUNT) {
      return NextResponse.json(
        { error: "Batas pengiriman pesan terlampaui. Anda hanya diperbolehkan mengirim maksimal 3 pesan setiap 15 menit. Silakan coba beberapa saat lagi." },
        { status: 429 }
      );
    }

    // Register timestamp of this successful request attempt
    activeTimestamps.push(now);
    rateLimitStore.set(ip, activeTimestamps);

    // 4. Save entry to database
    const submission = await prisma.kontakMasuk.create({
      data: {
        namaLengkap,
        noTelepon,
        email,
        perusahaan: perusahaan || null,
        institusi: institusi || null,
        pesan,
      },
    });

    return NextResponse.json({ success: true, id: submission.id }, { status: 200 });
  } catch (err: any) {
    console.error("API Error at /api/kontak:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}
