import Link from "next/link";
import { ReactNode } from "react";

interface MahasiswaLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    label: "Dashboard Ringkasan",
    href: "/mahasiswa/dashboard",
  },
  {
    label: "Profil Mahasiswa",
    href: "/mahasiswa/profile",
  },
  {
    label: "Produk",
    href: "/mahasiswa/products",
  },
  {
    label: "Kerja Sama",
    href: "/mahasiswa/collaborations",
  },
  {
    label: "Transaksi",
    href: "/mahasiswa/transactions",
  },
  {
    label: "Pendampingan",
    href: "/mahasiswa/mentoring",
  },
  {
    label: "Ulasan",
    href: "/mahasiswa/reviews",
  },
];

export default function MahasiswaLayout({
  children,
}: MahasiswaLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <Link
              href="/"
              className="text-3xl font-bold text-blue-600"
            >
              ReKarya
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Dashboard Mahasiswa
            </p>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto p-4 border-t border-gray-200">
            <div className="mb-4 rounded-lg bg-gray-50 p-3">
              <p className="text-sm font-semibold text-gray-800">
                Mahasiswa Demo
              </p>
              <p className="text-xs text-gray-500">
                mahasiswa@rekarya.com
              </p>
            </div>

            <Link
              href="/login"
              className="block w-full rounded-lg bg-red-500 px-4 py-3 text-center font-medium text-white hover:bg-red-600 transition-colors"
            >
              Logout
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-8 py-5 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Mahasiswa
            </h1>
            <p className="text-sm text-gray-500">
              Kelola profil, produk tugas akhir, dan kerja sama dengan UMKM.
            </p>
          </header>

          {/* Content */}
          <section className="p-8">{children}</section>
        </main>
      </div>
    </div>
  );
}