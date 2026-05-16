"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type AlertType = "success" | "error" | "warning" | "info";

type ToastState = {
  type: AlertType;
  title: string;
  message: string;
};

type ApiItem = {
  id?: number | string;
  status?: string;
  paymentStatus?: string;
  product?: {
    title?: string;
  };
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

const cardStyle: CSSProperties = {
  borderRadius: "24px",
  border: "1px solid rgba(255,255,255,0.08)",
  background:
    "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(8,13,29,0.98) 100%)",
  boxShadow: "0 16px 40px rgba(0,0,0,0.24)",
};

export default function UMKMDashboardPage() {
  const [collaborations, setCollaborations] = useState<ApiItem[]>([]);
  const [demoRequests, setDemoRequests] = useState<ApiItem[]>([]);
  const [offers, setOffers] = useState<ApiItem[]>([]);
  const [transactions, setTransactions] = useState<ApiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (
    type: AlertType,
    title: string,
    toastMessage: string
  ) => {
    setToast({
      type,
      title,
      message: toastMessage,
    });

    window.setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const showMessage = (
    text: string,
    type: AlertType = "info",
    title = "Informasi UMKM"
  ) => {
    setMessage(text);
    showToast(type, title, text);
  };

  const fetchJson = async (endpoint: string) => {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login ulang.");
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Gagal mengambil data.");
    }

    return result.data || [];
  };

  const fetchDashboardData = async (showSuccessToast = false) => {
    try {
      setIsLoading(true);
      setMessage("");

      const [
        collaborationResult,
        demoRequestResult,
        offerResult,
        transactionResult,
      ] = await Promise.allSettled([
        fetchJson("/collaborations/my"),
        fetchJson("/demo-requests/my"),
        fetchJson("/offers/my"),
        fetchJson("/transactions/my"),
      ]);

      if (collaborationResult.status === "fulfilled") {
        setCollaborations(collaborationResult.value);
      }

      if (demoRequestResult.status === "fulfilled") {
        setDemoRequests(demoRequestResult.value);
      }

      if (offerResult.status === "fulfilled") {
        setOffers(offerResult.value);
      }

      if (transactionResult.status === "fulfilled") {
        setTransactions(transactionResult.value);
      }

      const allFailed =
        collaborationResult.status === "rejected" &&
        demoRequestResult.status === "rejected" &&
        offerResult.status === "rejected" &&
        transactionResult.status === "rejected";

      if (allFailed) {
        showMessage(
          "Data dashboard belum bisa dimuat. Pastikan login sebagai UMKM dan backend berjalan.",
          "error",
          "Gagal memuat dashboard"
        );
        return;
      }

      if (showSuccessToast) {
        showMessage(
          "Data dashboard UMKM berhasil diperbarui.",
          "success",
          "Dashboard diperbarui"
        );
      }
    } catch (error) {
      showMessage(
        error instanceof Error
          ? error.message
          : "Gagal terhubung ke backend dashboard.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeCollaborations = collaborations.filter(
    (item) => item.status === "APPROVED" || item.status === "DONE"
  ).length;

  const waitingCollaborations = collaborations.filter(
    (item) => item.status === "WAITING"
  ).length;

  const rejectedCollaborations = collaborations.filter(
    (item) => item.status === "REJECTED"
  ).length;

  const waitingOffers = offers.filter(
    (item) => item.status === "WAITING"
  ).length;

  const reviewTransactions = transactions.filter(
    (item) =>
      item.paymentStatus === "REVIEW" ||
      item.status === "REVIEW" ||
      item.paymentStatus === "UNPAID" ||
      item.status === "UNPAID"
  ).length;

  const latestActivity =
    demoRequests[0]?.product?.title ||
    collaborations[0]?.product?.title ||
    offers[0]?.product?.title ||
    transactions[0]?.product?.title ||
    "";

  return (
    <>
      <ToastAlert alert={toast} onClose={() => setToast(null)} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "22px",
        }}
      >
        <section
          style={{
            ...cardStyle,
            overflow: "hidden",
            padding: "30px",
            background:
              "radial-gradient(circle at top right, rgba(16,185,129,0.18), transparent 30%), linear-gradient(135deg, #070B19 0%, #0B1226 60%, #06251f 100%)",
            border: "1px solid rgba(52,211,153,0.18)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(52,211,153,0.30)",
              background: "rgba(16,185,129,0.10)",
              color: "#6ee7b7",
              fontSize: "12px",
              fontWeight: 900,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Dashboard UMKM
          </div>

          <h1
            style={{
              marginTop: "18px",
              fontSize: "34px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Dashboard Ringkasan
          </h1>

          <p
            style={{
              marginTop: "14px",
              maxWidth: "860px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#cbd5e1",
            }}
          >
            Pantau aktivitas akun UMKM, jumlah kerja sama aktif, status kerja
            sama, penawaran, transaksi, dan rekomendasi terbaru dari sistem
            ReKarya.
          </p>

          <div
            style={{
              marginTop: "24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "14px",
            }}
          >
            <HeroMiniCard label="Fokus Utama" value="Cari Solusi Digital" />
            <HeroMiniCard
              label="Alur"
              value="Cari → Rekomendasi → Kerja Sama"
            />
            <HeroMiniCard label="Status Akun" value="Menunggu Verifikasi" />
          </div>
        </section>

        {message && <MessageBox message={message} />}

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "16px",
          }}
        >
          <SummaryCard
            title="Kerja Sama Aktif"
            value={isLoading ? "..." : String(activeCollaborations)}
            description="Jumlah kerja sama UMKM yang sedang berjalan."
            badge="Kerja Sama"
          />

          <SummaryCard
            title="Status Kerja Sama"
            value={
              isLoading
                ? "..."
                : `Menunggu: ${waitingCollaborations} • Ditolak: ${rejectedCollaborations}`
            }
            description="Status pengajuan kerja sama ke mahasiswa."
            badge="Status"
          />

          <SummaryCard
            title="Penawaran Baru"
            value={isLoading ? "..." : String(waitingOffers)}
            description="Penawaran dari mahasiswa yang menunggu keputusan."
            badge="Penawaran"
          />

          <SummaryCard
            title="Transaksi Review"
            value={isLoading ? "..." : String(reviewTransactions)}
            description="Transaksi yang belum selesai atau dalam review."
            badge="Transaksi"
          />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "16px",
          }}
        >
          <div
            style={{
              ...cardStyle,
              padding: "26px",
            }}
          >
            <SectionTitle
              eyebrow="Aktivitas"
              title="Notifikasi Terbaru"
              description="Menampilkan informasi aktivitas terbaru pada akun UMKM."
            />

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {latestActivity ? (
                <NotificationCard
                  title="Aktivitas terbaru ditemukan"
                  description={`Terdapat aktivitas terkait produk ${latestActivity}.`}
                  active
                />
              ) : (
                <NotificationCard
                  title="Belum ada notifikasi terbaru."
                  description="Aktivitas seperti request demo, kerja sama, penawaran, transaksi, dan pendampingan akan tampil di sini."
                />
              )}

              <NotificationCard
                title="Lengkapi profil UMKM"
                description="Pastikan data usaha lengkap agar rekomendasi solusi digital lebih sesuai kebutuhan."
                active
              />

              <NotificationCard
                title="Cari solusi berikutnya"
                description="Gunakan menu Cari Solusi untuk menemukan produk tugas akhir yang cocok dengan masalah usaha."
              />
            </div>
          </div>

          <div
            style={{
              ...cardStyle,
              padding: "26px",
            }}
          >
            <SectionTitle
              eyebrow="Rekomendasi"
              title="Langkah Berikutnya"
              description="Arahkan UMKM untuk melanjutkan proses pencarian solusi."
            />

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <ActionCard
                title="Isi Profil UMKM"
                description="Lengkapi data usaha, jenis usaha, masalah utama, budget, dan preferensi pendampingan."
                href="/umkm/profile"
              />

              <ActionCard
                title="Cari Solusi"
                description="Masukkan masalah usaha dan filter kebutuhan untuk mendapatkan rekomendasi produk."
                href="/umkm/search"
              />

              <ActionCard
                title="Lihat Kerja Sama"
                description="Pantau status pengajuan kerja sama yang sudah dikirim ke mahasiswa."
                href="/umkm/collaborations"
              />
            </div>
          </div>
        </section>

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              alignItems: "flex-start",
            }}
          >
            <SectionTitle
              eyebrow="Data"
              title="Ringkasan Aktivitas Akun"
              description="Data ini diambil dari endpoint kerja sama, demo request, penawaran, dan transaksi milik UMKM."
            />

            <button
              type="button"
              onClick={() => fetchDashboardData(true)}
              style={{
                padding: "12px 16px",
                borderRadius: "14px",
                border: "1px solid rgba(52,211,153,0.24)",
                background: "rgba(16,185,129,0.10)",
                color: "#6ee7b7",
                fontSize: "13px",
                fontWeight: 900,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Refresh Data
            </button>
          </div>

          <div
            style={{
              marginTop: "22px",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "14px",
            }}
          >
            <InfoBox label="Request Demo" value={String(demoRequests.length)} />
            <InfoBox label="Kerja Sama" value={String(collaborations.length)} />
            <InfoBox label="Penawaran" value={String(offers.length)} />
            <InfoBox label="Transaksi" value={String(transactions.length)} />
          </div>
        </section>
      </div>
    </>
  );
}

function HeroMiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.05)",
        padding: "14px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 900,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#6ee7b7",
        }}
      >
        {label}
      </p>

      <p
        style={{
          marginTop: "8px",
          fontSize: "14px",
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  description,
  badge,
}: {
  title: string;
  value: string;
  description: string;
  badge: string;
}) {
  return (
    <div
      style={{
        ...cardStyle,
        padding: "22px",
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
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 900,
            color: "#ffffff",
          }}
        >
          {title}
        </h3>

        <span
          style={{
            borderRadius: "999px",
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(52,211,153,0.22)",
            padding: "6px 10px",
            fontSize: "10px",
            fontWeight: 900,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6ee7b7",
          }}
        >
          {badge}
        </span>
      </div>

      <p
        style={{
          marginTop: "24px",
          fontSize: value.length > 12 ? "20px" : "34px",
          lineHeight: 1.1,
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        {value}
      </p>

      <p
        style={{
          marginTop: "12px",
          minHeight: "44px",
          fontSize: "13px",
          lineHeight: 1.7,
          color: "#94a3b8",
        }}
      >
        {description}
      </p>

      <div
        style={{
          marginTop: "16px",
          height: "6px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "38%",
            height: "100%",
            background: "#10b981",
            borderRadius: "999px",
          }}
        />
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p
        style={{
          fontSize: "12px",
          fontWeight: 900,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#6ee7b7",
        }}
      >
        {eyebrow}
      </p>

      <h2
        style={{
          marginTop: "10px",
          fontSize: "26px",
          fontWeight: 900,
          color: "#ffffff",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          marginTop: "8px",
          fontSize: "14px",
          lineHeight: 1.7,
          color: "#94a3b8",
        }}
      >
        {description}
      </p>
    </div>
  );
}

function NotificationCard({
  title,
  description,
  active = false,
}: {
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div
      style={{
        borderRadius: "16px",
        border: active
          ? "1px solid rgba(52,211,153,0.22)"
          : "1px solid rgba(255,255,255,0.08)",
        background: active
          ? "rgba(16,185,129,0.08)"
          : "rgba(255,255,255,0.03)",
        padding: "16px",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          fontWeight: 900,
          color: active ? "#6ee7b7" : "#ffffff",
        }}
      >
        {title}
      </p>

      <p
        style={{
          marginTop: "6px",
          fontSize: "13px",
          lineHeight: 1.7,
          color: "#94a3b8",
        }}
      >
        {description}
      </p>
    </div>
  );
}

function ActionCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      style={{
        display: "block",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        padding: "16px",
        textDecoration: "none",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        {title}
      </p>

      <p
        style={{
          marginTop: "6px",
          fontSize: "13px",
          lineHeight: 1.7,
          color: "#94a3b8",
        }}
      >
        {description}
      </p>
    </a>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        padding: "18px",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          fontWeight: 900,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#6ee7b7",
        }}
      >
        {label}
      </p>

      <p
        style={{
          marginTop: "10px",
          fontSize: "28px",
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function MessageBox({ message }: { message: string }) {
  const isSuccess =
    message.toLowerCase().includes("berhasil") ||
    message.toLowerCase().includes("diperbarui");

  return (
    <div
      style={{
        borderRadius: "16px",
        border: isSuccess
          ? "1px solid rgba(52,211,153,0.24)"
          : "1px solid rgba(248,113,113,0.35)",
        background: isSuccess
          ? "rgba(16,185,129,0.10)"
          : "rgba(239,68,68,0.10)",
        padding: "14px 16px",
        color: isSuccess ? "#6ee7b7" : "#fecaca",
        fontSize: "14px",
        fontWeight: 800,
      }}
    >
      {message}
    </div>
  );
}

function ToastAlert({
  alert,
  onClose,
}: {
  alert: ToastState | null;
  onClose: () => void;
}) {
  if (!alert) return null;

  const styleMap: Record<
    AlertType,
    {
      border: string;
      background: string;
      titleColor: string;
      icon: string;
    }
  > = {
    success: {
      border: "1px solid rgba(52,211,153,0.35)",
      background:
        "linear-gradient(135deg, rgba(6,78,59,0.98), rgba(16,185,129,0.20))",
      titleColor: "#6ee7b7",
      icon: "✓",
    },
    error: {
      border: "1px solid rgba(248,113,113,0.35)",
      background:
        "linear-gradient(135deg, rgba(127,29,29,0.98), rgba(239,68,68,0.20))",
      titleColor: "#fecaca",
      icon: "!",
    },
    warning: {
      border: "1px solid rgba(251,191,36,0.35)",
      background:
        "linear-gradient(135deg, rgba(113,63,18,0.98), rgba(251,191,36,0.20))",
      titleColor: "#fde68a",
      icon: "!",
    },
    info: {
      border: "1px solid rgba(96,165,250,0.35)",
      background:
        "linear-gradient(135deg, rgba(30,58,138,0.98), rgba(59,130,246,0.20))",
      titleColor: "#bfdbfe",
      icon: "i",
    },
  };

  const selected = styleMap[alert.type];

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
        border: selected.border,
        background: selected.background,
        boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
        padding: "16px",
        color: "#ffffff",
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.12)",
            color: selected.titleColor,
            fontSize: "18px",
            fontWeight: 900,
            flexShrink: 0,
          }}
        >
          {selected.icon}
        </div>

        <div style={{ flex: 1 }}>
          <h4
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: 900,
              color: selected.titleColor,
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