// app/mahasiswa/collaborations/page.tsx

"use client";

const collaborations = [
  {
    umkm: "Kuliner Makmur",
    product: "Sistem POS UMKM",
    price: "Rp2.500.000",
    status: "Menunggu Konfirmasi",
    paymentStatus: "Belum Dibayar",
    schedule: "15 Mei 2026, 14:00 WIB",
    progress: 20,
    notes:
      "UMKM sedang meninjau proposal dan menunggu keputusan persetujuan.",
  },
  {
    umkm: "Batik Nusantara",
    product: "Website Toko Online",
    price: "Rp4.000.000",
    status: "Disetujui",
    paymentStatus: "Sudah Dibayar",
    schedule: "18 Mei 2026, 10:00 WIB",
    progress: 75,
    notes:
      "Implementasi sedang berjalan dan proses revisi desain telah selesai.",
  },
];

function getStatusBadge(status: string) {
  if (status === "Disetujui") {
    return "bg-green-100 text-green-700 border-green-200";
  }

  if (status === "Menunggu Konfirmasi") {
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  }

  if (status === "Ditolak") {
    return "bg-red-100 text-red-700 border-red-200";
  }

  return "bg-gray-100 text-gray-700 border-gray-200";
}

function getPaymentBadge(status: string) {
  if (status === "Sudah Dibayar") {
    return "bg-green-100 text-green-700 border-green-200";
  }

  if (status === "Sedang Diproses Admin") {
    return "bg-blue-100 text-blue-700 border-blue-200";
  }

  return "bg-red-100 text-red-700 border-red-200";
}

export default function MahasiswaCollaborationsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Kerja Sama</h1>
        <p className="mt-2 text-slate-600">
          Proses dari ketertarikan UMKM, kesepakatan, transaksi, hingga
          implementasi dan pendampingan.
        </p>
      </div>

      {/* List Kerja Sama */}
      <div className="space-y-6">
        {collaborations.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            {/* Informasi Utama */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {item.umkm}
                </h2>

                <p className="mt-2 text-slate-600">
                  Produk:{" "}
                  <span className="font-semibold text-slate-800">
                    {item.product}
                  </span>
                </p>

                <p className="mt-1 text-slate-600">
                  Harga:{" "}
                  <span className="font-semibold text-slate-800">
                    {item.price}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadge(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>

                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getPaymentBadge(
                    item.paymentStatus
                  )}`}
                >
                  {item.paymentStatus}
                </span>
              </div>
            </div>

            {/* Konfirmasi Kerja Sama */}
            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <h3 className="text-lg font-bold text-blue-900">
                Konfirmasi Kerja Sama
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-blue-800">
                Menentukan kesepakatan berdasarkan harga produk yang telah
                ditawarkan.
              </p>

              <div className="mt-4 grid gap-3 text-sm text-blue-900 md:grid-cols-2">
                <div>
                  <span className="font-semibold">Nama Produk:</span>{" "}
                  {item.product}
                </div>

                <div>
                  <span className="font-semibold">Harga Produk:</span>{" "}
                  {item.price}
                </div>

                <div className="md:col-span-2">
                  <span className="font-semibold">Data UMKM:</span>{" "}
                  {item.umkm}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700">
                  Setujui
                </button>

                <button className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">
                  Tolak
                </button>
              </div>
            </div>

            {/* Transaksi */}
            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
              <h3 className="text-lg font-bold text-emerald-900">
                Transaksi
              </h3>

              <p className="mt-2 text-sm text-emerald-800">
                Mengelola pembayaran setelah kerja sama disetujui.
              </p>

              <div className="mt-4 grid gap-3 text-sm text-emerald-900 md:grid-cols-3">
                <div>
                  <span className="font-semibold">Produk:</span>{" "}
                  {item.product}
                </div>

                <div>
                  <span className="font-semibold">Harga:</span>{" "}
                  {item.price}
                </div>

                <div>
                  <span className="font-semibold">Status Pembayaran:</span>{" "}
                  {item.paymentStatus}
                </div>
              </div>
            </div>

            {/* Pendampingan */}
            <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50 p-6">
              <h3 className="text-lg font-bold text-purple-900">
                Pendampingan
              </h3>

              <p className="mt-2 text-sm text-purple-800">
                Mengatur jadwal implementasi, memantau progres, dan
                menambahkan catatan.
              </p>

              <div className="mt-4 grid gap-3 text-sm text-purple-900">
                <div>
                  <span className="font-semibold">Jadwal:</span>{" "}
                  {item.schedule}
                </div>

                <div>
                  <span className="font-semibold">Progres:</span>{" "}
                  {item.progress}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-3 w-full rounded-full bg-purple-100">
                <div
                  className="h-3 rounded-full bg-purple-600 transition-all"
                  style={{ width: `${item.progress}%` }}
                />
              </div>

              {/* Catatan */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-purple-900">
                  Catatan
                </label>

                <textarea
                  rows={3}
                  defaultValue={item.notes}
                  className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-purple-400 focus:outline-none"
                />
              </div>

              {/* Simpan Catatan */}
              <div className="mt-4">
                <button className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700">
                  Simpan Catatan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}