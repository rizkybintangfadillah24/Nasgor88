"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

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
    label: "Ulasan",
    href: "/mahasiswa/reviews",
  },
];

export default function MahasiswaLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Hapus data login yang tersimpan
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    // Redirect ke halaman login
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-4xl font-extrabold text-blue-600">
            ReKarya
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Dashboard Mahasiswa
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-xl font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info + Logout */}
        <div className="p-4 border-t border-gray-100 space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-800">
              Mahasiswa Demo
            </p>
            <p className="text-sm text-gray-500">
              mahasiswa@rekarya.com
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}