import prisma from '../lib/prisma';

async function main() {
  // Clear existing pengurus
  await prisma.pengurus.deleteMany({});

  const data = [
    // === DEWAN PEMBINA ===
    {
      nama: "Prof. Ir. Purnomo Yusgiantoro, M.Sc., Ph.D., IPU.",
      jabatan: "Dewan Pembina",
      kategori: "Pembina",
      urutan: 1
    },
    {
      nama: "Prof. Ir. Doddy Abdassah, ST., M.Sc., Ph.D., IPU.",
      jabatan: "Dewan Pembina",
      kategori: "Pembina",
      urutan: 2
    },

    // === DEWAN PENASEHAT ===
    {
      nama: "Prof. Ir. Asep Kurnia Permadi, ST., M.Sc., Ph.D., IPU., ASEAN Eng.",
      jabatan: "Dewan Penasehat",
      kategori: "Penasehat",
      urutan: 1
    },
    {
      nama: "Ir. Mohamad Bawazeer, IPU.",
      jabatan: "Dewan Penasehat",
      kategori: "Penasehat",
      urutan: 2
    },
    {
      nama: "Ir. Mohamad Noer, IPU.",
      jabatan: "Dewan Penasehat",
      kategori: "Penasehat",
      urutan: 3
    },
    {
      nama: "Ir. Sugeng Suparwoto, MT.",
      jabatan: "Dewan Penasehat",
      kategori: "Penasehat",
      urutan: 4
    },

    // === PENGURUS BADAN KEAHLIAN ===
    // Left Column
    {
      nama: "Ir. Luky A. Yusgiantoro, B.Sc., M.Sc., Ph.D., IPU., ASEAN Eng.",
      jabatan: "Ketua BKTMG",
      kategori: "Inti",
      urutan: 1
    },
    {
      nama: "Dr. Ir. Dedy Irawan, ST., MT., IPM.",
      jabatan: "Wakil Ketua I (Bidang Pendidikan & Pelatihan)",
      kategori: "Inti",
      urutan: 2
    },
    {
      nama: "Dr. Ir. Rini Setiati, ST., MT., IPU, ASEAN Eng.",
      jabatan: "Wakil Ketua II (Bidang Publikasi & Promosi)",
      kategori: "Inti",
      urutan: 3
    },
    {
      nama: "Ir. Joko Pamungkas, MT., IPU., ASEAN Eng., APEC Eng.",
      jabatan: "Wakil Ketua III (Bidang Dana & Sosial)",
      kategori: "Inti",
      urutan: 4
    },
    {
      nama: "Dr. Ir. Dedi Kristanto, ST., MT., IPU., ACPE., ASEAN Eng., APEC Eng.",
      jabatan: "Sekretaris",
      kategori: "Inti",
      urutan: 5
    },
    {
      nama: "Ir. Bramantyo Para Seno, ST., IPU., ASEAN Eng.",
      jabatan: "Wakil Sekretaris I",
      kategori: "Inti",
      urutan: 6
    },
    {
      nama: "Ir. Samsol, ST., MT.",
      jabatan: "Wakil Sekretaris II",
      kategori: "Inti",
      urutan: 7
    },
    {
      nama: "Ir. Tri Bagus Prabowo, ST., MT.",
      jabatan: "Wakil Sekretaris III",
      kategori: "Inti",
      urutan: 8
    },
    {
      nama: "Ir. Fathul Rachman, IPU.",
      jabatan: "Bendahara",
      kategori: "Inti",
      urutan: 9
    },
    {
      nama: "Ir. Onnie Ridaliani, MT.",
      jabatan: "Wakil Bendahara",
      kategori: "Inti",
      urutan: 10
    },

    // Right Column
    {
      nama: "Prof. Ir. Purnomo Yusgiantoro, M.Sc., Ph.D., IPU.",
      jabatan: "Perwakilan di Dewan Insinyur Indonesia",
      kategori: "Inti",
      urutan: 11
    },
    {
      nama: "Dr. Ir. Rini Setiati, ST., MT. IPU., ASEAN Eng.",
      jabatan: "Perwakilan di MKE",
      kategori: "Inti",
      urutan: 12
    },
    {
      nama: "Ir. Rawindra, IPU.",
      jabatan: "Perwakilan di MSK",
      kategori: "Inti",
      urutan: 13
    },
    {
      nama: "Prof. Dr Eng. Ir. Muslim Abdurrahman., ST., MT., IPU., ASEAN Eng.",
      jabatan: "Komisi Bidang I (Pendidikan & Pelatihan)",
      kategori: "Inti",
      urutan: 14
    },
    {
      nama: "Prof. Ir. M. Taufiq Fathaddin, ST., MT., Ph.D., IPU., ASEAN Eng.",
      jabatan: "Komisi Bidang II (Publikasi & Promosi)",
      kategori: "Inti",
      urutan: 15
    },
    {
      nama: "Dr. Ir. Indah Widiyaningsih, ST., MT., IPU.",
      jabatan: "Komisi Bidang III (Dana & Sosial)",
      kategori: "Inti",
      urutan: 16
    },
    {
      nama: "Prof. Ir. Asep Kurnia Permadi, ST., M.Sc., Ph.D., IPU., ASEAN Eng.",
      jabatan: "Ketua Perwakilan Perguruan Tinggi",
      kategori: "Inti",
      urutan: 17
    },
    {
      nama: "Dr. Ir. Harry Budiharjo S., MT., IPU.",
      jabatan: "Wakil Ketua Perwakilan Perguruan Tinggi",
      kategori: "Inti",
      urutan: 18
    },

    // === MAJELIS UJI KOMPETENSI (MUK) ===
    {
      nama: "Prof. Ir. Asri Nugrahanti, ST., M.S, Ph.D., IPU.",
      jabatan: "Ketua Tim MUK",
      kategori: "MUK",
      urutan: 1
    },
    {
      nama: "Ir. Fathul Rachman, IPU.",
      jabatan: "Wakil Ketua Tim MUK",
      kategori: "MUK",
      urutan: 2
    },
    {
      nama: "Mu’min",
      jabatan: "Sekretaris Tim MUK",
      kategori: "MUK",
      urutan: 3
    },
    // Anggota MUK
    {
      nama: "Prof. Ir. Doddy Abdassah, ST., M.Sc., Ph.D., IPU.",
      jabatan: "Anggota Tim MUK",
      kategori: "MUK",
      urutan: 4
    },
    {
      nama: "Prof. Ir. Asep Kurnia Permadi, ST., M.Sc., Ph.D., IPU., ASEAN Eng.",
      jabatan: "Anggota Tim MUK",
      kategori: "MUK",
      urutan: 5
    },
    {
      nama: "Prof. Ir. M. Taufiq Fathaddin., ST., MT., Ph.D., IPU., ASEAN Eng.",
      jabatan: "Anggota Tim MUK",
      kategori: "MUK",
      urutan: 6
    },
    {
      nama: "Ir. Rawindra, IPU.",
      jabatan: "Anggota Tim MUK",
      kategori: "MUK",
      urutan: 7
    },
    {
      nama: "Ir. Bramantyo Para Seno, ST., IPU.",
      jabatan: "Anggota Tim MUK",
      kategori: "MUK",
      urutan: 8
    },
    {
      nama: "Dr. Ir. Rini Setiati, ST., MT., IPU., ASEAN Eng.",
      jabatan: "Anggota Tim MUK",
      kategori: "MUK",
      urutan: 9
    },
    {
      nama: "Dr. Ir. Dedi Kristanto, ST., MT., IPU., ACPE., ASEAN Eng., APEC Eng.",
      jabatan: "Anggota Tim MUK",
      kategori: "MUK",
      urutan: 10
    },
    {
      nama: "Ir. Joko Pamungkas, MT., IPU., ASEAN Eng., APEC Eng.",
      jabatan: "Anggota Tim MUK",
      kategori: "MUK",
      urutan: 11
    },
    {
      nama: "Prof. Dr Eng. Ir. Muslim Abdurrahman., ST., MT., IPU.",
      jabatan: "Anggota Tim MUK",
      kategori: "MUK",
      urutan: 12
    },
    {
      nama: "Ir. Hariyadi, ST., MT., IPU., ASEAN Eng.",
      jabatan: "Anggota Tim MUK",
      kategori: "MUK",
      urutan: 13
    }
  ];

  for (const item of data) {
    await prisma.pengurus.create({
      data: item
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
