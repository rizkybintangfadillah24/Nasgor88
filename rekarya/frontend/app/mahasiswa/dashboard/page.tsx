// app/mahasiswa/dashboard/page.tsx

import { dashboardStats } from "@/lib/dummy-data";

export default function DashboardPage() {
  const cards = [
    {
      label: "Jumlah Produk",
      value: dashboardStats.totalProducts,
      description: `Total produk yang telah diunggah (${dashboardStats.totalProducts} produk).`,
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: "📦",
    },
    {
      label: "Status Produk",
      value: `${dashboardStats.pendingProducts} / ${dashboardStats.approvedProducts}`,
      description: `Pending: ${dashboardStats.pendingProducts} • Approved: ${dashboardStats.approvedProducts}`,
      color: "text-amber-600",
      bg: "bg-amber-50",
      icon: "⏳",
    },
    {
      label: "Pengajuan Kerja Sama",
      value: dashboardStats.collaborations,
      description:
        "Jumlah pengajuan kerja sama baru dari UMKM.",
      color: "text-purple-600",
      bg: "bg-purple-50",
      icon: "🤝",
    },
    {
      label: "Status Data Diri",
      value: dashboardStats.profileStatus,
      description:
        "Status verifikasi profil mahasiswa.",
      color:
        dashboardStats.profileStatus.toLowerCase() === "approved"
          ? "text-green-600"
          : "text-amber-600",
      bg:
        dashboardStats.profileStatus.toLowerCase() === "approved"
          ? "bg-green-50"
          : "bg-amber-50",
      icon: "🪪",
    },
  ];

  const trendNeeds = [
    "Pemasaran Digital Lemah",
    "Penjualan Belum Online",
    "Pencatatan Keuangan Manual",
    "Stok Tidak Tertata",
    "Branding Produk Kurang Menarik",
    "Website Belum Profesional",
  ];

  const latestActivities = [
    "Produk 'Website Toko Online' sedang menunggu verifikasi admin.",
    "UMKM Kuliner Makmur mengajukan kerja sama baru.",
    "Sesi mentoring dijadwalkan pada 15 Mei 2026 pukul 14:00 WIB.",
    "Pembayaran invoice INV-001 berhasil diterima.",
    "Admin meminta revisi dokumen KTP agar lebih jelas.",
  ];

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Dashboard Ringkasan
        </h1>
        <p className="mt-2 text-slate-600">
          Ringkasan total produk, status verifikasi, tren kebutuhan UMKM,
          dan aktivitas terbaru akun Anda.
        </p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.label}
                </p>

                <p
                  className={`mt-3 text-3xl font-bold ${card.color}`}
                >
                  {card.value}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${card.bg}`}
              >
                {card.icon}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* ================= STATUS DETAIL ================= */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status Produk */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Status Produk
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Ringkasan verifikasi produk oleh admin.
          </p>

          <div className="mt-6 space-y-4">
            <StatusItem
              label="Total Produk"
              value={`${dashboardStats.totalProducts} Produk`}
              badgeColor="bg-blue-100 text-blue-700"
            />

            <StatusItem
              label="Pending"
              value={`${dashboardStats.pendingProducts} Produk`}
              badgeColor="bg-amber-100 text-amber-700"
            />

            <StatusItem
              label="Approved"
              value={`${dashboardStats.approvedProducts} Produk`}
              badgeColor="bg-green-100 text-green-700"
            />
          </div>
        </div>

        {/* Status Data Diri */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Status Data Diri
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Hasil verifikasi data diri oleh admin.
          </p>

          <div className="mt-6">
            <span
              className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                dashboardStats.profileStatus.toLowerCase() ===
                "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {dashboardStats.profileStatus}
            </span>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {dashboardStats.profileStatus.toLowerCase() ===
              "approved"
                ? "Profil Anda telah diverifikasi dan dapat digunakan untuk mengikuti seluruh aktivitas pada platform."
                : "Profil Anda masih menunggu verifikasi admin. Pastikan seluruh data dan dokumen telah lengkap."}
            </p>
          </div>
        </div>
      </div>

      {/* ================= TREN KEBUTUHAN UMKM ================= */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">
          Tren Kebutuhan UMKM
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Top ranking permasalahan utama yang paling banyak dihadapi UMKM.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {trendNeeds.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700"
            >
              #{index + 1} {item}
            </div>
          ))}
        </div>
      </div>

      {/* ================= NOTIFIKASI ================= */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">
          Notifikasi Aktivitas Terbaru
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Menampilkan informasi aktivitas terbaru pada akun Anda.
        </p>

        <div className="mt-6 space-y-3">
          {latestActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4"
            >
              <span className="mt-0.5 text-lg">🔔</span>
              <p className="text-sm leading-relaxed text-slate-700">
                {activity}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function StatusItem({
  label,
  value,
  badgeColor,
}: {
  label: string;
  value: string;
  badgeColor: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
      <span className="text-sm font-medium text-slate-600">
        {label}
      </span>

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
      >
        {value}
      </span>
    </div>
  );
}