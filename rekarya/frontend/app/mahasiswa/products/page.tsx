// app/mahasiswa/products/page.tsx

"use client";

import { useState } from "react";
import { studentProducts } from "@/lib/dummy-data";

function getStatusBadgeClass(status: string) {
  if (status === "APPROVED") {
    return "bg-green-100 text-green-700 border-green-200";
  }

  if (status === "PENDING") {
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  }

  if (status === "REJECTED") {
    return "bg-red-100 text-red-700 border-red-200";
  }

  return "bg-gray-100 text-gray-700 border-gray-200";
}

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-8">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Produk Saya
          </h1>
          <p className="mt-2 text-slate-600">
            Kelola produk tugas akhir yang telah diunggah.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          {showForm ? "Tutup Form" : "+ Tambah Produk"}
        </button>
      </div>

      {/* =========================================================
          FORM UPLOAD PRODUK
      ========================================================= */}
      {showForm && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">
            Upload Produk
          </h2>
          <p className="mt-2 text-slate-600">
            Menginput data produk tugas akhir untuk ditawarkan kepada UMKM.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Judul Produk */}
            <InputField
              label="Judul Produk"
              placeholder="Contoh: Inventoriku"
            />

            {/* Kategori */}
            <SelectField
              label="Kategori Produk"
              options={[
                "Penjualan",
                "Operasional",
                "Keuangan",
                "Pemasaran",
                "E-Commerce",
                "Inventori",
              ]}
            />

            {/* Masalah Utama */}
            <InputField
              label="Masalah Utama yang Diselesaikan"
              placeholder="Contoh: Penjualan belum online"
            />

            {/* Target UMKM */}
            <SelectField
              label="Target UMKM"
              options={[
                "Kuliner",
                "Retail Toko",
                "Jasa",
                "Fashion",
                "Pertanian",
                "UMKM Umum",
              ]}
            />

            {/* Fitur Utama */}
            <SelectField
              label="Fitur Utama"
              options={[
                "Manajemen Stok",
                "Laporan Penjualan",
                "Dashboard Analisis",
                "Kasir Digital",
                "Website Toko",
              ]}
            />

            {/* Teknologi */}
            <SelectField
              label="Teknologi yang Digunakan"
              options={[
                "Web App",
                "Mobile App",
                "IoT",
                "AI / Machine Learning",
              ]}
            />

            {/* Durasi Pelatihan */}
            <SelectField
              label="Estimasi Durasi Pelatihan"
              options={["7 Hari", "14 Hari", "30 Hari"]}
            />

            {/* Metode Pendampingan */}
            <SelectField
              label="Metode Pendampingan"
              options={["Online", "Offline", "Hybrid"]}
            />

            {/* Harga */}
            <InputField
              label="Harga (Net)"
              placeholder="Contoh: Rp2.500.000"
            />
          </div>

          {/* Deskripsi */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Deskripsi Produk
            </label>
            <textarea
              rows={4}
              placeholder="Jelaskan produk TA, manfaat, dan masalah yang ingin diselesaikan."
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Detail Fitur */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Detail Fitur
            </label>
            <textarea
              rows={4}
              placeholder="Masukkan rincian fitur-fitur utama dari produk Anda."
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Screenshot */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Screenshot Produk (JPG / JPEG / PNG)
            </label>
            <input
              type="file"
              className="block w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-blue-700"
            />
          </div>

          {/* Submit */}
          <div className="mt-8">
            <button className="rounded-2xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700">
              Upload Produk
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          KELOLA PRODUK
      ========================================================= */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Header Table */}
        <div className="border-b border-slate-100 px-8 py-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Kelola Produk
          </h2>
          <p className="mt-2 text-slate-600">
            Melihat, mengedit, menghapus, dan memantau status produk.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Judul Produk
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Kategori
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {studentProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-5">
                    <div className="font-semibold text-slate-900">
                      {product.title}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {product.category}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      <button className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100">
                        Edit
                      </button>

                      <button className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100">
                        Hapus
                      </button>

                      <button className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200">
                        Lihat Status
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="border-t border-slate-100 bg-slate-50 px-8 py-4 text-sm text-slate-500">
          Total produk terdaftar:{" "}
          <span className="font-semibold text-slate-700">
            {studentProducts.length}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function InputField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
        <option>Pilih {label}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}