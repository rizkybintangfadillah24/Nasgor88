// app/mahasiswa/profile/page.tsx

"use client";

import { mahasiswaProfile } from "@/lib/dummy-data";

export default function MahasiswaProfilePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Profil Mahasiswa
        </h1>
        <p className="mt-2 text-slate-600">
          Lengkapi seluruh data diri untuk proses verifikasi admin dan
          meningkatkan kredibilitas profil Anda.
        </p>
      </div>

      {/* Status Verifikasi */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">⏳</div>
          <div>
            <h3 className="font-semibold text-amber-900">
              Status Verifikasi: {mahasiswaProfile.statusVerifikasi}
            </h3>
            <p className="mt-1 text-sm text-amber-700">
              Lengkapi data dan dokumen agar profil Anda dapat diverifikasi.
            </p>
          </div>
        </div>
      </div>

      {/* Card Utama */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <form className="space-y-10">
          {/* ================= DATA DIRI ================= */}
          <SectionHeader
            title="Data Diri"
            description="Informasi utama mahasiswa."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Nama Lengkap"
              defaultValue={mahasiswaProfile.nama}
              placeholder="Nama lengkap sesuai KTP/KTM"
            />
            <InputField
              label="Email"
              type="email"
              defaultValue={mahasiswaProfile.email}
              placeholder="Email aktif"
            />
            <InputField
              label="No. Kontak"
              defaultValue={mahasiswaProfile.phone}
              placeholder="Nomor HP aktif"
            />
            <InputField
              label="No. Rekening"
              defaultValue={mahasiswaProfile.rekening}
              placeholder="BNI - XXXXXXXX"
            />
          </div>

          {/* ================= DATA AKADEMIK ================= */}
          <SectionHeader
            title="Data Akademik"
            description="Informasi kampus dan program studi."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Kampus"
              defaultValue={mahasiswaProfile.kampus}
            />
            <InputField
              label="Jurusan"
              defaultValue={mahasiswaProfile.jurusan}
            />
            <InputField
              label="Program Studi"
              defaultValue={mahasiswaProfile.prodi}
            />
            <InputField
              label="Semester / Tahun Lulus"
              defaultValue={mahasiswaProfile.semester}
              placeholder="Semester aktif atau tahun lulus"
            />
          </div>

          {/* ================= DESKRIPSI PROFIL ================= */}
          <SectionHeader
            title="Deskripsi Profil"
            description="Jelaskan keahlian dan fokus pengembangan Anda."
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Deskripsi Singkat
            </label>
            <textarea
              rows={5}
              defaultValue={mahasiswaProfile.bio}
              placeholder="Saya seorang web developer yang fokus pada solusi digital untuk UMKM."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* ================= UPLOAD DOKUMEN ================= */}
          <SectionHeader
            title="Upload Dokumen"
            description="Dokumen wajib untuk proses verifikasi."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <UploadField
              label="Foto Profil"
              description="Foto wajah terlihat jelas."
            />
            <UploadField
              label="KTM / Surat Aktif Kuliah"
              description="Dokumen harus terlihat jelas."
            />
            <UploadField
              label="KTP"
              description="KTP harus terlihat jelas."
            />
          </div>

          {/* ================= TOMBOL SIMPAN PROFIL ================= */}
          <div className="border-t border-slate-200 pt-6">
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
            >
              Simpan Profil
            </button>
          </div>

          {/* ================= UBAH PASSWORD ================= */}
          <SectionHeader
            title="Akun"
            description="Ubah password akun Anda."
          />

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Ubah Password
            </h3>

            <div className="grid gap-5">
              <InputField
                label="Password Lama"
                type="password"
                placeholder="Masukkan password lama"
              />
              <InputField
                label="Password Baru"
                type="password"
                placeholder="Masukkan password baru"
              />
              <InputField
                label="Ulangi Password Baru"
                type="password"
                placeholder="Konfirmasi password baru"
              />
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-emerald-700"
              >
                Simpan Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-slate-200 pb-3">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}

function InputField({
  label,
  defaultValue,
  placeholder,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}

function UploadField({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <p className="mb-3 text-xs text-slate-500">
        {description}
      </p>

      <input
        type="file"
        className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-blue-700"
      />
    </div>
  );
}