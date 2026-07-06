-- 1. Drop existing tables if they exist
DROP TABLE IF EXISTS "KontakMasuk" CASCADE;
DROP TABLE IF EXISTS "Kegiatan" CASCADE;
DROP TABLE IF EXISTS "Pengurus" CASCADE;
DROP TABLE IF EXISTS "InfoInstansi" CASCADE;

-- 2. Create tables matching Prisma schema
CREATE TABLE "KontakMasuk" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "namaLengkap" TEXT NOT NULL,
    "noTelepon" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "perusahaan" TEXT,
    "institusi" TEXT,
    "pesan" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Kegiatan" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "fotoUrl" TEXT NOT NULL,
    "linkVideo" TEXT,
    "tanggal" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Pengurus" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "fotoUrl" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "InfoInstansi" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mapsEmbed" TEXT NOT NULL
);

-- 3. Seed data for Kegiatan
INSERT INTO "Kegiatan" ("judul", "deskripsi", "fotoUrl", "tanggal") VALUES
('Konvensi VI BKTMG-PII', 'Konvensi ke-enam BKTMG-PII sebagai forum tertinggi organisasi untuk pelaporan pertanggungjawaban, pemilihan pengurus baru, dan penetapan arah strategis masa bakti 2026–2029.', 'https://images.unsplash.com/photo-1571645163064-77faa9676a46?w=800&h=500&fit=crop&auto=format', '2026-01-23 00:00:00+00'),
('Konvensi & Seminar V BKTMG-PII', 'Konvensi ke-lima sekaligus seminar nasional yang membahas isu strategis sektor energi dan kebijakan perminyakan nasional menuju transisi energi Indonesia.', 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=800&h=500&fit=crop&auto=format', '2023-01-28 00:00:00+00'),
('Diskusi Panel & Lokakarya', 'Serangkaian diskusi panel dan lokakarya yang menghadirkan pakar, praktisi, dan pemangku kepentingan untuk bertukar gagasan dan membangun kapasitas insinyur anggota BKTMG-PII.', 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=500&fit=crop&auto=format', CURRENT_TIMESTAMP);

-- 4. Seed data for Pengurus
INSERT INTO "Pengurus" ("nama", "jabatan", "kategori", "urutan") VALUES
('Prof. Ir. Purnomo Yusgiantoro', 'Dewan Pembina', 'Pembina', 1),
('Prof. Ir. Doddy Abdassah', 'Dewan Pembina', 'Pembina', 2),
('Prof. Ir. Asep Kurnia Permadi', 'Dewan Penasehat', 'Penasehat', 1),
('Ir. Mohamad Bawazeer', 'Dewan Penasehat', 'Penasehat', 2),
('Ir. Mohamad Noer', 'Dewan Penasehat', 'Penasehat', 3),
('Ir. Sugeng Suparwoto', 'Dewan Penasehat', 'Penasehat', 4),
('Ir. Luky A. Yusgiantoro, B.Sc., M.Sc., Ph.D., IPU., ASEAN Eng.', 'Ketua BKTMG', 'Inti', 1),
('—', 'Wakil Ketua Bidang I', 'Inti', 2),
('—', 'Wakil Ketua Bidang II', 'Inti', 3),
('—', 'Wakil Ketua Bidang III', 'Inti', 4),
('—', 'Sekretaris', 'Inti', 5),
('—', 'Bendahara', 'Inti', 6),
('Prof. Ir. Asri Nugrahanti, ST., M.S, Ph.D., IPU.', 'Ketua Tim MUK', 'MUK', 1),
('—', 'Wakil Ketua', 'MUK', 2),
('—', 'Sekretaris', 'MUK', 3),
('Data Lengkap di Sekretariat', 'Anggota Tim (9 orang)', 'MUK', 4);

-- 5. Seed data for InfoInstansi
INSERT INTO "InfoInstansi" ("nama", "alamat", "telepon", "email", "mapsEmbed") VALUES
('Sekretariat PII Pusat', 'Graha Rekayasa Indonesia Lt. 5, Jl. Halimun Raya No. 39, Guntur, Setiabudi, Jakarta Selatan 12980', '(021) 21481780 / 0812 9393 7552', 'info@pii.or.id', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.840!3d-6.225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMzAuMCJTIDEwNsKwNTAnMjQuMCJF!5e0!3m2!1sen!2sid!4v1620000000000'),
('Sekretariat BKTMG', 'Jl. Mimosa I No.5, Pejaten Barat, Jakarta Selatan', '(62 21) 7919 7673 / WhatsApp: 0818 794 906', 'pii.bktmg@gmail.com', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2!2d106.826!3d-6.268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTYnMDQuOCJTIDEwNsKwNDknMjEuNiJF!5e0!3m2!1sen!2sid!4v1620000000001');
