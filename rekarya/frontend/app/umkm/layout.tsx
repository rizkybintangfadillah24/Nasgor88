"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type MenuItem = {
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  {
    label: "Dashboard Ringkasan",
    href: "/umkm/dashboard",
  },
  {
    label: "Profil UMKM",
    href: "/umkm/profile",
  },
  {
    label: "Kebutuhan Usaha",
    href: "/umkm/needs",
  },
  {
    label: "Cari Produk",
    href: "/umkm/search",
  },
  {
    label: "Kerja Sama",
    href: "/umkm/collaborations",
  },
  {
    label: "Transaksi",
    href: "/umkm/transactions",
  },
  {
    label: "Pendampingan",
    href: "/umkm/mentoring",
  },
  {
    label: "Ulasan",
    href: "/umkm/reviews",
  },
];

type UmkmLayoutProps = {
  children: ReactNode;
};

export default function UmkmLayout({ children }: UmkmLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-blue-600">ReKarya</h1>
          <p className="text-sm text-gray-500 mt-2">Dashboard UMKM</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl px-4 py-3 text-base transition ${
                  isActive
                    ? "border-2 border-black font-medium text-black bg-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info + Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4 rounded-xl bg-gray-50 p-3">
            <p className="font-semibold text-gray-800">UMKM Demo</p>
            <p className="text-sm text-gray-500">umkm@rekarya.com</p>
          </div>

          <button className="w-full rounded-xl bg-red-500 px-4 py-3 font-semibold text-white hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard UMKM</h1>
          <p className="mt-2 text-gray-600">
            Kelola profil usaha, kebutuhan digital, dan kerja sama dengan
            mahasiswa.
          </p>
        </header>

        {/* Page Content */}
        <section className="p-8">{children}</section>
      </main>
    </div>
  );
}