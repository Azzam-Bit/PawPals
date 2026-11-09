# PawPals

**PawPals** adalah website untuk menemukan dan mengajukan adopsi hewan —
anjing, kucing, kelinci, hamster, dan burung — yang membutuhkan rumah.

PawPals menghubungkan hewan-hewan yang membutuhkan rumah dengan orang-orang yang
penuh kasih. Setiap halaman berisi katalog hewan, pencarian, form adopsi, dan
halaman kontak.

Project ini berjalan di atas **Native PHP tanpa framework dan tanpa dependency**.
PHP dipakai untuk templating (header/footer/layout bersama) dan sebagai sumber
data hewan. Seluruh interaksi (pencarian, filter, validasi form, night mode)
tetap berjalan di browser dengan Vanilla JavaScript.

---

## Tujuan project

- Menampilkan katalog hewan yang tersedia untuk adopsi, lengkap dengan nama, jenis, usia, gender, dan deskripsi singkat.
- Memungkinkan pengguna mencari dan menyaring hewan berdasarkan nama, jenis, usia, atau deskripsi.
- Memvalidasi formulir adopsi, kontak, dan newsletter **di sisi browser**.
- Menyediakan tema terang dan gelap (Night Mode) yang mengikuti preferensi sistem dan pilihan pengguna.

---

## Fitur

| Fitur | Keterangan |
|---|---|
| Katalog hewan | 8 hewan dari `app/Data/PetRepository.php`; 4 ditandai *featured* dan tampil di beranda |
| Pencarian & filter | Pencarian multi-field (nama, jenis, usia, gender, deskripsi) + filter cepat per jenis |
| Form adopsi | Validasi nama, email, telepon, dan pilihan hewan; alur khusus opsi "Lainnya" |
| Form kontak | Validasi nama, email, dan pesan |
| Form newsletter | Validasi alamat email |
| Night Mode | Tombol di header, mengikuti `prefers-color-scheme`, pilihan tersimpan di `localStorage` |
| Toast notifikasi | Notifikasi singkat dengan batas jumlah agar tidak menumpuk |
| Navigasi responsif | Menu hamburger di layar kecil |
| Aksesibilitas | Navigasi keyboard, label ARIA, fokus yang terlihat, state error/success |

---

## Teknologi

- **PHP >= 8.2** — templating & sumber data. Tanpa framework, tanpa package Composer.
- **HTML5**
- **CSS3** — custom properties, `grid`/`flex`, `prefers-color-scheme`, `prefers-reduced-motion`
- **Vanilla JavaScript (ES2020)** — tanpa library, tanpa proses build

> **Backend: belum ada.** Tidak ada server-side processing untuk form, tidak ada
> API, tidak ada database. Seluruh formulir hanya memvalidasi di browser.
> Lihat bagian *Status formulir* di bawah.

---

## Struktur direktori

```
Web-Projek/
├── public/                        # DOCROOT — satu-satunya direktori yang terekspos web
│   ├── index.php                  # Beranda
│   ├── about.php                  # Tentang
│   ├── pets.php                   # Hewan
│   ├── search.php                 # Cari
│   ├── adopt.php                  # Adopsi
│   ├── contact.php                # Kontak
│   └── assets/
│       ├── css/style.css          # Seluruh gaya (satu file)
│       └── js/
│           ├── script.js          # Seluruh logika interaksi (satu file)
│           └── theme-boot.js      # Skrip anti-kilat (FOUC) untuk Night Mode
├── resources/views/
│   ├── layout.php                 # Skeleton bersama: head + header + isi + footer
│   ├── partials/
│   │   ├── header.php             # Header + navigasi (active state otomatis)
│   │   └── footer.php             # Footer bersama
│   └── pages/                     # Isi <main> tiap halaman
│       ├── home.php  about.php  pets.php
│       └── search.php  adopt.php  contact.php
├── app/
│   ├── bootstrap.php              # Autoloader PSR-4 + timezone + helper e()
│   ├── Data/PetRepository.php     # Sumber kebenaran tunggal data hewan
│   └── Support/View.php           # Renderer template minimal
├── config/site.php                # Nama situs, nav, kontak, statistik, testimoni, footer
├── composer.json                  # Hanya autoload PSR-4, tanpa dependency
└── README.md
```

`app/`, `config/`, dan `resources/` berada **di luar** docroot, sehingga tidak
dapat diakses melalui URL.

---

## Alur data

`PetRepository` adalah satu-satunya sumber data hewan. Saat halaman dirender,
`layout.php` menyuntikkannya ke browser:

```html
<script>window.PAWPALS_DATA = {"pets": [ ... ]};</script>
```

`assets/js/script.js` membaca `window.PAWPALS_DATA.pets` dan merender kartu,
pencarian, filter, serta pemilih hewan dari sana. Menambah atau mengubah hewan
cukup dilakukan di `PetRepository` — beranda, daftar hewan, pencarian, filter,
dan form adopsi ikut berubah otomatis.

Injeksi memakai `json_encode()` dengan flag `JSON_HEX_TAG` dkk. sehingga isi
data tidak bisa keluar dari konteks `<script>`.

---

## Menjalankan secara lokal

Wajib memakai server karena halaman kini berupa PHP.

**PHP built-in server** (paling cepat, tanpa konfigurasi):

```bash
cd Web-Projek
php -S localhost:8000 -t public
```

Lalu buka <http://localhost:8000>.

**Laragon / Apache / Nginx:** arahkan document root vhost ke direktori
`public/` milik project ini.

> Catatan: pada `php -S`, URL yang tidak dikenali akan dirender sebagai halaman
> beranda (perilaku fallback bawaan PHP development server ke `index.php`).
> Pada Apache/Nginx URL seperti itu akan menghasilkan 404 seperti biasa.

---

## Halaman yang tersedia

| File | Judul | Isi |
|---|---|---|
| `public/index.php` | PawPals · Beranda | Hero, statistik, 4 hewan unggulan, 3 testimoni, CTA |
| `public/about.php` | PawPals · Tentang | Misi PawPals, profil, 3 nilai |
| `public/pets.php` | PawPals · Hewan | Grid seluruh hewan |
| `public/search.php` | PawPals · Cari Hewan | Kolom pencarian + 6 filter jenis |
| `public/adopt.php` | PawPals · Adopsi | Formulir adopsi + 9 pilihan hewan |
| `public/contact.php` | PawPals · Hubungi Kami | Kontak + formulir pesan |

Semua halaman saling terhubung lewat menu header dan footer. Halaman kontak
dapat diakses dari link **"Hubungi Kami"** di footer setiap halaman.

---

## Status formulir & batasan backend

**PawPals belum memiliki backend.** Konsekuensinya:

| Formulir | Yang terjadi saat submit |
|---|---|
| **Adopsi** | Isian divalidasi di browser. Setelah lolos, antarmuka menampilkan bahwa formulir **tervalidasi dalam mode demo, belum dikirim dan tidak disimpan**. Isian pengguna **dipertahankan** (tidak di-reset otomatis). |
| **Kontak** | Sama seperti di atas — divalidasi, bukan dikirim. |
| **Newsletter** | Alamat email divalidasi, **tidak dikirim** dan **tidak disimpan** di mana pun. |

Hal-hal yang **sengaja tidak** dilakukan:

- Tidak ada `fetch()`/`XMLHttpRequest` ke endpoint mana pun.
- Tidak ada storage PII (nama, email, nomor telepon, pesan) di `localStorage` atau `sessionStorage`. `localStorage` **hanya** menyimpan preferensi tema (`pawpals-theme`).
- Tidak ada klaim "permohonan terkirim" / "pesan diterima" / "berlangganan berhasil" yang menipu.
- Tidak ada dependensi, service account, API key, atau kredensial.

Fungsi berikut adalah **titik integrasi** untuk backend di masa depan. Ganti
isi masing-masing fungsi dengan pemanggilan `fetch()` menuju endpoint Anda —
alur validasi, status, dan anti-duplikasi submit di `assets/js/script.js`
**tidak perlu ditulis ulang**:

- `submitAdoptionRequest(payload)` → `delivered: false`
- `submitContactMessage(payload)` → `delivered: false`
- `submitNewsletter(email)` → `delivered: false`

Selama `delivered` bernilai `false`, antarmuka menampilkan jalur mode demo.

---

## Catatan konfigurasi

- **Timezone** diset dari `config/site.php` (`Asia/Jakarta`) lewat
  `app/bootstrap.php`, bukan lewat `php.ini`. Tahun copyright di footer
  mengikuti `date('Y')`.
- **Statistik hero** (`150+`, `45`, `98%`) dan **testimoni** berada di
  `config/site.php` sebagai konten statis. Nilai `45 Hewan tersedia` adalah
  angka mock yang tidak sama dengan jumlah hewan di `PetRepository` (8) —
  dipertahankan apa adanya dari versi sebelumnya dan menunggu diganti dengan
  angka nyata saat backend tersedia.

---

## Migrasi ke Laravel di masa depan

Struktur sengaja mengikuti konvensi Laravel agar migrasi berarti memindahkan
isi, bukan membongkar layout:

| Sekarang | Nanti di Laravel |
|---|---|
| `public/` | `public/` (docroot, tetap) |
| `resources/views/*.php` + `layout.php` | Blade views + layout |
| `app/Data/PetRepository.php` | Eloquent model + repository |
| `app/Support/View.php` | tidak diperlukan (Blade) |
| `config/site.php` | file di `config/` |
| `app/bootstrap.php` | bootstrap bawaan framework |
| `composer.json` (autoload PSR-4) | sudah sesuai, tinggal tambah `laravel/framework` |

---

## Pengujian dasar

Tidak ada test runner yang perlu dipasang. Pemeriksaan berikut sudah cukup
untuk memverifikasi hasil perubahan.

### 1. Sintaks

```bash
# PHP
find . -name "*.php" -exec php -l {} \;

# JavaScript
node --check public/assets/js/script.js
node --check public/assets/js/theme-boot.js
```

### 2. Tidak ada referensi file lama

```bash
grep -rn "\.html" --include="*.php" --include="*.js" --include="*.css" .
# hasil yang diharapkan: tidak ada baris (kecuali properti htmlFor di JS)
```

### 3. Pemeriksaan manual di browser

Jalankan `php -S localhost:8000 -t public`, lalu periksa:

**Navigasi & tautan**
- [ ] Semua menu header berpindah halaman dengan benar di keenam halaman.
- [ ] Link "Hubungi Kami" di footer membuka `contact.php` (bukan 404).
- [ ] Tombol "Adopsi" pada kartu hewan membuka `adopt.php?pet=ID` dengan hewan tercentang.

**Pencarian (`search.php`)**
- [ ] Mengetik `luna` → 1 hasil.
- [ ] Mengetik `anjing` → 3 hasil.
- [ ] Mengetik `zzzz` → panel "Tidak ada hewan yang ditemukan".
- [ ] Kolom kosong → seluruh 8 hewan.
- [ ] `KUCING` (kapital) → tetap cocok dengan `kucing`.
- [ ] Tombol filter **Kucing** hanya menampilkan kucing, dan tombolnya terlihat aktif.
- [ ] Tekan Enter di kolom pencarian → hasil diperbarui tanpa reload.

**Night Mode**
- [ ] Klik tombol di sebelah logo → tema berubah ke gelap, ikon berubah jadi bulan.
- [ ] Muat ulang halaman → tema gelap tetap (tersimpan di `localStorage`).
- [ ] Buka halaman lain → tema tetap sama.
- [ ] Tidak ada kilatan tema salah saat halaman dimuat (anti-FOUC bekerja).
- [ ] Cincin fokus tombol terlihat di tema terang **dan** gelap.

**Formulir adopsi (`adopt.php`)**
- [ ] Submit dengan semua field kosong → muncul pesan error, **tidak ada** notifikasi sukses.
- [ ] Isi email `bukan-email` → error format email.
- [ ] Isi telepon `123` → error "terlalu pendek".
- [ ] Pilih beberapa hewan bergantian → hanya satu yang tercentang.
- [ ] Klik kartu hewan dengan mouse → tercentang.
- [ ] `Tab` ke kartu hewan lalu tekan **Spasi** → tercentang; **panah kiri/kanan** berpindah pilihan.
- [ ] Pilih **Lainnya** → kolom "Nama atau ciri hewan" muncul dan menjadi wajib.
- [ ] Pilih hewan biasa lagi → kolom "Lainnya" hilang lagi.
- [ ] Submit gagal → isian yang sudah diketik **tidak hilang**.
- [ ] Submit valid → pesan **"tervalidasi (mode demo), belum dikirim"**, isian tetap ada.
- [ ] Klik **Reset** → form kosong, pilihan hewan tidak tercentang, kolom Lainnya tersembunyi.
- [ ] Tekan submit berkali-kali cepat → tidak ada toast bertumpuk.

**Formulir kontak (`contact.php`) & newsletter**
- [ ] Submit kontak kosong → error, tidak ada klaim terkirim.
- [ ] Submit kontak valid → pesan mode demo, isi pesan tetap.
- [ ] Newsletter dengan `bukan-email` → error.
- [ ] Newsletter dengan email valid → pesan mode demo.
- [ ] Setelah submit newsletter, `localStorage` **tidak** berisi alamat email.

**Tata letak**
- [ ] Di lebar ±360px tidak ada scroll horizontal di keenam halaman.
- [ ] Halaman Tentang (`about.php`) menjadi satu kolom di layar sempit.
- [ ] Kartu pilihan hewan tetap nyaman disentuh di layar kecil.
- [ ] Menu hamburger membuka/menutup di layar kecil.

### 4. Cek konsol browser

Buka DevTools → Console. Tidak boleh ada error JavaScript atau request 404
(permintaan ke Google Fonts boleh gagal saat luring).

---

## Lisensi

Dibuat sebagai tugas pembelajaran coursework.
