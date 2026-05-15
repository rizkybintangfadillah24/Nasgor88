import Link from "next/link";

type DashboardPageProps = {
  params: Promise<{
    role: string;
  }>;
};

const dashboardContent = {
  mahasiswa: {
    title: "Dashboard Mahasiswa",
    description:
      "Kelola profil mahasiswa, produk tugas akhir, kerja sama, transaksi, pendampingan, dan ulasan.",
    menus: [
      "Profil Mahasiswa",
      "Produk Tugas Akhir",
      "Kerja Sama",
      "Transaksi",
      "Pendampingan",
      "Ulasan",
    ],
  },
  umkm: {
    title: "Dashboard UMKM",
    description:
      "Kelola profil UMKM, cari solusi, lihat rekomendasi ReKarya Match, kerja sama, transaksi, pendampingan, dan ulasan.",
    menus: [
      "Profil UMKM",
      "Cari Solusi",
      "Rekomendasi",
      "Request Demo",
      "Kerja Sama",
      "Transaksi",
      "Pendampingan",
      "Ulasan",
    ],
  },
  admin: {
    title: "Dashboard Admin",
    description:
      "Verifikasi akun, verifikasi produk tugas akhir, monitoring aktivitas, transaksi, pendampingan, statistik, dan laporan sistem.",
    menus: [
      "Verifikasi Akun",
      "Verifikasi Produk TA",
      "Kelola Kategori",
      "Monitoring Aktivitas",
      "Monitoring Transaksi",
      "Monitoring Pendampingan",
      "Statistik Masalah UMKM",
      "Laporan Sistem",
    ],
  },
};

export default async function RoleDashboardPage({
  params,
}: DashboardPageProps) {
  const { role } = await params;
  const key = role.toLowerCase() as keyof typeof dashboardContent;
  const content = dashboardContent[key] || dashboardContent.umkm;

  return (
    <main className="min-h-screen bg-[#060A18] px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:flex-row md:items-center">
          <div>
            <Link href="/" className="text-2xl font-black">
              Re<span className="text-emerald-400">Karya</span>
            </Link>
            <h1 className="mt-8 text-4xl font-black">{content.title}</h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              {content.description}
            </p>
          </div>

          <Link
            href="/login"
            className="rounded-full border border-white/15 px-5 py-3 text-center text-sm font-bold text-white transition hover:border-emerald-400/60 hover:bg-white/10"
          >
            Logout Sementara
          </Link>
        </header>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {content.menus.map((menu) => (
            <div
              key={menu}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
                Menu
              </p>
              <h2 className="mt-3 text-xl font-black">{menu}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Halaman detail akan dibuat pada checkpoint berikutnya sesuai
                dokumen FITUR.
              </p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}