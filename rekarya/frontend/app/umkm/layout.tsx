"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { removeToken } from "../../lib/api";

type SidebarUser = {
  id?: number;
  username?: string;
  email?: string;
  role?: string;
  verificationStatus?: string;
};

const menus = [
  {
    label: "Dashboard Ringkasan",
    href: "/umkm/dashboard",
    activePaths: ["/umkm/dashboard"],
  },
  {
    label: "Profil UMKM",
    href: "/umkm/profile",
    activePaths: ["/umkm/profile"],
  },
  {
    label: "Cari Solusi",
    href: "/umkm/search",
    activePaths: [
      "/umkm/search",
      "/umkm/recommendations",
      "/umkm/products",
    ],
  },
  {
    label: "Kerja Sama",
    href: "/umkm/collaborations",
    activePaths: ["/umkm/collaborations"],
  },
  {
    label: "Transaksi",
    href: "/umkm/transactions",
    activePaths: ["/umkm/transactions", "/umkm/offers"],
  },
  {
    label: "Pendampingan",
    href: "/umkm/mentoring",
    activePaths: ["/umkm/mentoring"],
  },
  {
    label: "Ulasan",
    href: "/umkm/reviews",
    activePaths: ["/umkm/reviews"],
  },
];

export default function UMKMLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<SidebarUser | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("rekarya_user");

    if (!savedUser) {
      setUser(null);
      return;
    }

    try {
      setUser(JSON.parse(savedUser));
    } catch {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("rekarya_user");
    router.push("/login");
  };

  const displayName =
    user?.username && user.username.trim() !== "" ? user.username : "UMKM";

  const displayEmail =
    user?.email && user.email.trim() !== ""
      ? user.email
      : "Email belum tersedia";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#060A18",
        color: "#0f172a",
      }}
    >
      <aside
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "260px",
          height: "100vh",
          background: "#090F21",
          borderRight: "1px solid rgba(255,255,255,0.10)",
          display: "flex",
          flexDirection: "column",
          zIndex: 50,
        }}
      >
        <div
          style={{
            padding: "28px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "32px",
              fontWeight: 900,
              lineHeight: 1,
              color: "#ffffff",
              textDecoration: "none",
              letterSpacing: "-0.04em",
            }}
          >
            Re<span style={{ color: "#34d399" }}>Karya</span>
          </Link>

          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
              color: "#94a3b8",
            }}
          >
            Dashboard UMKM
          </p>
        </div>

        <nav
          style={{
            flex: 1,
            padding: "18px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            overflowY: "auto",
          }}
        >
          {menus.map((menu) => {
            const isActive = menu.activePaths.some(
              (path) => pathname === path || pathname.startsWith(`${path}/`)
            );

            return (
              <Link
                key={menu.href}
                href={menu.href}
                style={{
                  display: "block",
                  padding: "13px 16px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: isActive ? "#020617" : "#cbd5e1",
                  background: isActive ? "#34d399" : "transparent",
                  border: isActive
                    ? "2px solid #34d399"
                    : "2px solid rgba(255,255,255,0.10)",
                  transition:
                    "background 0.2s ease, color 0.2s ease, border 0.2s ease",
                }}
              >
                {menu.label}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            padding: "16px",
            borderTop: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <div
            style={{
              padding: "14px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              marginBottom: "14px",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: 800,
                color: "#ffffff",
                wordBreak: "break-word",
              }}
            >
              {displayName}
            </p>

            <p
              style={{
                marginTop: "4px",
                fontSize: "12px",
                color: "#94a3b8",
                wordBreak: "break-word",
                lineHeight: 1.5,
              }}
            >
              {displayEmail}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "13px 16px",
              borderRadius: "14px",
              border: "1px solid rgba(248,113,113,0.35)",
              background: "rgba(239,68,68,0.12)",
              color: "#fecaca",
              fontSize: "14px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      <section
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
          background: "#060A18",
        }}
      >
        <div
          style={{
            padding: "28px 36px",
          }}
        >
          {children}
        </div>
      </section>
    </main>
  );
}