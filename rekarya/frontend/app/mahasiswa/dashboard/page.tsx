"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

type ProductItem = {
  id: number | string;
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
};

type AlertType = "success" | "error" | "warning" | "info";

type AlertState = {
  type: AlertType;
  title: string;
  message: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("rekarya_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken")
  );
};

const trends = [
  "Pemasaran Digital Lemah",
  "Penjualan Belum Online",
  "Pencatatan Keuangan Manual",
  "Stok Tidak Tertata",
  "Operasional Tidak Efisien",
  "Analisis Berbasis Data",
];

export default function MahasiswaDashboardPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState<AlertState | null>(null);

  const pendingProducts = useMemo(
    () => products.filter((product) => product.status === "PENDING").length,
    [products]
  );

  const approvedProducts = useMemo(
    () => products.filter((product) => product.status === "APPROVED").length,
    [products]
  );

  const rejectedProducts = useMemo(
    () => products.filter((product) => product.status === "REJECTED").length,
    [products]
  );

  const showAlert = (type: AlertType, title: string, messageText: string) => {
    setAlert({ type, title, message: messageText });

    window.setTimeout(() => {
      setAlert(null);
    }, 3500);
  };

  const fetchMyProducts = async (showSuccessAlert = false) => {
    try {
      setIsLoadingProducts(true);
      setMessage("");

      const token = getAuthToken();

      if (!token) {
        const errorMessage = "Token tidak ditemukan. Silakan login ulang.";
        setMessage(errorMessage);
        showAlert("error", "Akses ditolak", errorMessage);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/products/my`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        const errorMessage =
          result.message || "Gagal mengambil data produk dashboard.";
        setMessage(errorMessage);
        showAlert("error", "Gagal mengambil data", errorMessage);
        return;
      }

      const data = result.data || [];
      setProducts(data);

      if (showSuccessAlert) {
        showAlert(
          "success",
          "Dashboard diperbarui",
          `Data produk berhasil diperbarui. Total produk saat ini: ${data.length}.`
        );
      }
    } catch (error) {
      const errorMessage =
        "Gagal terhubung ke backend saat mengambil data dashboard.";
      setMessage(errorMessage);
      showAlert("error", "Koneksi gagal", errorMessage);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleRefreshDashboard = () => {
    fetchMyProducts(true);
  };

  const handleEmptyCollaborationInfo = () => {
    showAlert(
      "info",
      "Belum ada pengajuan kerja sama",
      "Pengajuan kerja sama akan muncul setelah UMKM memilih produk yang sudah disetujui admin dan mengirim pengajuan kerja sama."
    );
  };

  const summaryCards = [
    {
      title: "Jumlah Produk",
      value: isLoadingProducts ? "..." : String(products.length),
      description: "Total produk tugas akhir yang sudah diunggah.",
      label: "Produk",
    },
    {
      title: "Status Produk",
      value: isLoadingProducts
        ? "Pending: ... Approved: ..."
        : `Pending: ${pendingProducts} Approved: ${approvedProducts}`,
      description: "Status produk yang menunggu atau sudah disetujui admin.",
      label: "Verifikasi",
    },
    {
      title: "Pengajuan Baru",
      value: "-",
      description: "Pengajuan kerja sama baru dari UMKM.",
      label: "Kerja Sama",
      onClick: handleEmptyCollaborationInfo,
    },
    {
      title: "Status Data Diri",
      value: "Pending",
      description: "Status verifikasi profil mahasiswa oleh admin.",
      label: "Akun",
    },
  ];

  useEffect(() => {
    fetchMyProducts(false);
  }, []);

  return (
    <>
      <ActionAlert alert={alert} onClose={() => setAlert(null)} />

      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "28px",
            border: "1px solid rgba(52, 211, 153, 0.22)",
            background:
              "radial-gradient(circle at top right, rgba(16,185,129,0.20), transparent 35%), linear-gradient(135deg, #070B19 0%, #0B1226 60%, #06251f 100%)",
            padding: "34px",
            color: "#ffffff",
            boxShadow: "0 18px 40px rgba(0, 0, 0, 0.24)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: "999px",
              border: "1px solid rgba(52, 211, 153, 0.35)",
              background: "rgba(16, 185, 129, 0.12)",
              padding: "9px 16px",
              fontSize: "12px",
              fontWeight: 900,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6ee7b7",
            }}
          >
            Dashboard Mahasiswa
          </div>

          <h1
            style={{
              marginTop: "22px",
              maxWidth: "820px",
              fontSize: "44px",
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#ffffff",
            }}
          >
            Dashboard Ringkasan
          </h1>

          <p
            style={{
              marginTop: "18px",
              maxWidth: "780px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#cbd5e1",
            }}
          >
            Pantau jumlah produk, status produk, pengajuan kerja sama baru,
            status data diri, tren kebutuhan UMKM, dan notifikasi aktivitas
            terbaru pada akun.
          </p>

          <div
            style={{
              marginTop: "22px",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={handleRefreshDashboard}
              disabled={isLoadingProducts}
              style={{
                padding: "12px 16px",
                borderRadius: "14px",
                border: "1px solid rgba(52, 211, 153, 0.30)",
                background: isLoadingProducts
                  ? "rgba(16, 185, 129, 0.08)"
                  : "rgba(16, 185, 129, 0.14)",
                color: "#6ee7b7",
                fontSize: "13px",
                fontWeight: 900,
                cursor: isLoadingProducts ? "not-allowed" : "pointer",
              }}
            >
              {isLoadingProducts ? "Memuat data..." : "Refresh Data"}
            </button>
          </div>

          <div
            style={{
              marginTop: "28px",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "14px",
            }}
          >
            <HeroInfo title="Fokus Utama" value="Produk Tugas Akhir" />
            <HeroInfo title="Alur" value="Upload → Verifikasi → Kerja Sama" />
            <HeroInfo title="Status Akun" value="Menunggu Verifikasi" active />
          </div>
        </section>

        {message && <MessageBox message={message} />}

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "18px",
          }}
        >
          {summaryCards.map((card) => (
            <button
              type="button"
              key={card.title}
              onClick={card.onClick}
              style={{
                position: "relative",
                overflow: "hidden",
                textAlign: "left",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.08)",
                background:
                  "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(8,13,29,0.98) 100%)",
                padding: "24px",
                boxShadow: "0 14px 34px rgba(0,0,0,0.22)",
                cursor: card.onClick ? "pointer" : "default",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 900,
                    color: "#ffffff",
                  }}
                >
                  {card.title}
                </p>

                <span
                  style={{
                    borderRadius: "999px",
                    border: "1px solid rgba(52, 211, 153, 0.24)",
                    background: "rgba(16, 185, 129, 0.12)",
                    padding: "6px 10px",
                    fontSize: "11px",
                    fontWeight: 900,
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    color: "#6ee7b7",
                  }}
                >
                  {card.label}
                </span>
              </div>

              <h2
                style={{
                  marginTop: "22px",
                  fontSize: "28px",
                  fontWeight: 900,
                  color: "#ffffff",
                }}
              >
                {card.value}
              </h2>

              <p
                style={{
                  marginTop: "10px",
                  minHeight: "44px",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#94a3b8",
                }}
              >
                {card.description}
              </p>

              <div
                style={{
                  marginTop: "18px",
                  height: "6px",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.08)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "38%",
                    height: "100%",
                    borderRadius: "999px",
                    background: "linear-gradient(90deg, #10b981, #34d399)",
                  }}
                />
              </div>
            </button>
          ))}
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.9fr",
            gap: "18px",
          }}
        >
          <div
            style={{
              borderRadius: "22px",
              border: "1px solid rgba(255, 255, 255, 0.10)",
              background:
                "linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(8, 13, 29, 0.98) 100%)",
              padding: "24px",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.22)",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                fontWeight: 900,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6ee7b7",
              }}
            >
              Tren UMKM
            </p>

            <h2
              style={{
                marginTop: "10px",
                fontSize: "24px",
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              Tren Kebutuhan UMKM
            </h2>

            <p
              style={{
                marginTop: "8px",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#94a3b8",
              }}
            >
              Top ranking masalah utama UMKM yang menjadi acuan pengembangan
              produk tugas akhir.
            </p>

            <div
              style={{
                marginTop: "20px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {trends.map((trend, index) => (
                <div
                  key={trend}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.10)",
                    background: "rgba(255, 255, 255, 0.045)",
                    padding: "14px 16px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#e2e8f0",
                    }}
                  >
                    {trend}
                  </span>

                  <span
                    style={{
                      borderRadius: "999px",
                      background: "rgba(16, 185, 129, 0.15)",
                      padding: "5px 10px",
                      fontSize: "12px",
                      fontWeight: 900,
                      color: "#6ee7b7",
                    }}
                  >
                    #{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              borderRadius: "22px",
              border: "1px solid rgba(255, 255, 255, 0.10)",
              background:
                "linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(8, 13, 29, 0.98) 100%)",
              padding: "24px",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.22)",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                fontWeight: 900,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6ee7b7",
              }}
            >
              Aktivitas
            </p>

            <h2
              style={{
                marginTop: "10px",
                fontSize: "24px",
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              Notifikasi
            </h2>

            <p
              style={{
                marginTop: "8px",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#94a3b8",
              }}
            >
              Menampilkan informasi aktivitas terbaru pada akun mahasiswa.
            </p>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <NotificationCard
                title="Status produk terbaru"
                text={
                  isLoadingProducts
                    ? "Sedang mengambil data produk dari backend."
                    : `Total ${products.length} produk: ${pendingProducts} pending, ${approvedProducts} approved, ${rejectedProducts} rejected.`
                }
                emerald={products.length > 0}
              />

              <NotificationCard
                title="Lengkapi data diri"
                text="Pastikan profil dan dokumen verifikasi lengkap agar admin dapat menyetujui akun."
                emerald
              />

              <div
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(52, 211, 153, 0.18)",
                  background: "#060A18",
                  padding: "16px",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 900,
                    color: "#ffffff",
                  }}
                >
                  Rekomendasi berikutnya
                </p>
                <p
                  style={{
                    marginTop: "6px",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "#94a3b8",
                  }}
                >
                  Upload produk tugas akhir agar dapat masuk proses verifikasi
                  dan tampil di katalog setelah approved.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function HeroInfo({
  title,
  value,
  active = false,
}: {
  title: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div
      style={{
        borderRadius: "18px",
        border: active
          ? "1px solid rgba(52, 211, 153, 0.35)"
          : "1px solid rgba(255,255,255,0.10)",
        background: active
          ? "rgba(16, 185, 129, 0.12)"
          : "rgba(255,255,255,0.06)",
        padding: "16px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 900,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: active ? "#6ee7b7" : "#94a3b8",
        }}
      >
        {title}
      </p>
      <p
        style={{
          marginTop: "8px",
          fontSize: "15px",
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function NotificationCard({
  title,
  text,
  emerald = false,
}: {
  title: string;
  text: string;
  emerald?: boolean;
}) {
  return (
    <div
      style={{
        borderRadius: "16px",
        border: emerald
          ? "1px solid rgba(52, 211, 153, 0.22)"
          : "1px solid rgba(255, 255, 255, 0.10)",
        background: emerald
          ? "rgba(16, 185, 129, 0.12)"
          : "rgba(255, 255, 255, 0.045)",
        padding: "16px",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          fontWeight: 900,
          color: emerald ? "#6ee7b7" : "#ffffff",
        }}
      >
        {title}
      </p>
      <p
        style={{
          marginTop: "6px",
          fontSize: "14px",
          lineHeight: 1.7,
          color: emerald ? "#a7f3d0" : "#94a3b8",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function MessageBox({ message }: { message: string }) {
  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(248,113,113,0.35)",
        background: "rgba(239,68,68,0.10)",
        padding: "14px 16px",
        color: "#fecaca",
        fontSize: "14px",
        fontWeight: 800,
      }}
    >
      {message}
    </div>
  );
}

function ActionAlert({
  alert,
  onClose,
}: {
  alert: AlertState | null;
  onClose: () => void;
}) {
  if (!alert) return null;

  const styles: Record<
    AlertType,
    { border: string; background: string; titleColor: string; icon: string }
  > = {
    success: {
      border: "1px solid rgba(52,211,153,0.35)",
      background:
        "linear-gradient(135deg, rgba(6,78,59,0.98), rgba(16,185,129,0.18))",
      titleColor: "#6ee7b7",
      icon: "✓",
    },
    error: {
      border: "1px solid rgba(248,113,113,0.35)",
      background:
        "linear-gradient(135deg, rgba(127,29,29,0.98), rgba(239,68,68,0.18))",
      titleColor: "#fecaca",
      icon: "!",
    },
    warning: {
      border: "1px solid rgba(251,191,36,0.35)",
      background:
        "linear-gradient(135deg, rgba(113,63,18,0.98), rgba(251,191,36,0.18))",
      titleColor: "#fde68a",
      icon: "!",
    },
    info: {
      border: "1px solid rgba(96,165,250,0.35)",
      background:
        "linear-gradient(135deg, rgba(30,58,138,0.98), rgba(59,130,246,0.18))",
      titleColor: "#bfdbfe",
      icon: "i",
    },
  };

  const activeStyle = styles[alert.type];

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        width: "370px",
        maxWidth: "calc(100vw - 32px)",
        zIndex: 9999,
        borderRadius: "18px",
        border: activeStyle.border,
        background: activeStyle.background,
        boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
        padding: "16px",
        color: "#ffffff",
        backdropFilter: "blur(16px)",
      }}
    >
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.12)",
            color: activeStyle.titleColor,
            fontSize: "18px",
            fontWeight: 900,
            flexShrink: 0,
          }}
        >
          {activeStyle.icon}
        </div>

        <div style={{ flex: 1 }}>
          <h4
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: 900,
              color: activeStyle.titleColor,
            }}
          >
            {alert.title}
          </h4>
          <p
            style={{
              marginTop: "6px",
              marginBottom: 0,
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#e2e8f0",
            }}
          >
            {alert.message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            border: "none",
            background: "rgba(255,255,255,0.10)",
            color: "#ffffff",
            width: "28px",
            height: "28px",
            borderRadius: "999px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
