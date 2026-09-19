# TokoKu — Catat Stok & Kas Toko (dengan Login)

Aplikasi manajemen toko sederhana: stok barang, pemasukan/pengeluaran, plus **sistem login email + password** via **Supabase Auth**.

## Fitur baru

- **Login / Daftar** dengan email + password
- Data **produk** dan **transaksi** terikat ke user (`user_id`)
- Middleware melindungi halaman & API (harus login)
- Tombol **Keluar** di sidebar (desktop) dan header (mobile)

## Setup

### 1. Buat project Supabase

1. Buka [supabase.com](https://supabase.com) → New project
2. Di **Project Settings → API**, salin:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Di **Project Settings → Database**, salin connection string (URI) → `DATABASE_URL`

### 2. Environment

```bash
cp .env.example .env.local
# isi nilai Supabase & DATABASE_URL
```

### 3. Database schema

Jika tabel belum ada, buat dengan Drizzle:

```bash
npx drizzle-kit push
```

Jika tabel sudah ada (versi lama tanpa `user_id`), jalankan SQL di `supabase-migration.sql` lewat **SQL Editor** Supabase.

### 4. Auth di Supabase

- **Authentication → Providers → Email**: pastikan Email enabled
- (Opsional) Nonaktifkan "Confirm email" di Auth settings agar bisa langsung login setelah daftar (untuk development)

### 5. Install & jalanin

```bash
npm install
npm run dev
```

Buka http://localhost:3000 — akan diarahkan ke `/login`.

## Alur setelah login

1. **Daftar** akun baru di `/register` atau **Masuk** di `/login`
2. Di **Beranda** / **Kas**: catat pengeluaran & pemasukan
3. Di **Barang**: kelola stok
4. Riwayat transaksi tampil di halaman **Kas** (hanya data milik user yang login)
5. **Keluar** lewat tombol di sidebar / header

## Stack

- Next.js 16 (App Router)
- Supabase Auth (email/password)
- PostgreSQL + Drizzle ORM
- Tailwind CSS 4
