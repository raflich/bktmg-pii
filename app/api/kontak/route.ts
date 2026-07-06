import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { namaLengkap, noTelepon, email, perusahaan, institusi, pesan } = body;

    if (!namaLengkap || !noTelepon || !email || !pesan) {
      return NextResponse.json(
        { error: "Mohon isi semua field yang wajib (*)" },
        { status: 400 }
      );
    }

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
