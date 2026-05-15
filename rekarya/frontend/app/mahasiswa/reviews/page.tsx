"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type AlertType = "success" | "error" | "warning" | "info";

type AlertState = {
  type: AlertType;
  title: string;
  message: string;
};

type ReviewItem = {
  id?: number | string;
  umkm?: string;
  product?: string;
  rating: number;
  comment: string;
  date?: string;
  createdAt?: string;
  productTitle?: string;
  umkmName?: string;
  productData?: {
    title?: string;
  };
  umkmProfile?: {
    businessName?: string;
    ownerName?: string;
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

const labelStyle: CSSProperties = {
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#94a3b8",
};

export default function MahasiswaReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [message, setMessage] = useState("");
  const [actionAlert, setActionAlert] = useState<AlertState | null>(null);

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews === 0
      ? "-"
      : (
          reviews.reduce((total, item) => total + Number(item.rating || 0), 0) /
          totalReviews
        ).toFixed(1);

  const showToast = (
    type: AlertType,
    title: string,
    toastMessage: string,
  ) => {
    setActionAlert({ type, title, message: toastMessage });

    window.setTimeout(() => {
      setActionAlert(null);
    }, 3500);
  };

  const showMessage = (
    text: string,
    type: AlertType = "info",
    title = "Informasi Ulasan",
  ) => {
    setMessage(text);
    showToast(type, title, text);
  };

  const normalizeReviews = (payload: unknown): ReviewItem[] => {
    if (Array.isArray(payload)) return payload as ReviewItem[];

    if (
      payload &&
      typeof payload === "object" &&
      "reviews" in payload &&
      Array.isArray((payload as { reviews: unknown }).reviews)
    ) {
      return (payload as { reviews: ReviewItem[] }).reviews;
    }

    return [];
  };

  const fetchReviews = async (withToast = false) => {
    try {
      setIsLoadingReviews(true);

      const token = getAuthToken();

      if (!token) {
        showMessage("Token tidak ditemukan. Silakan login ulang.", "error", "Akses ditolak");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/reviews/my`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showMessage(result.message || "Gagal mengambil data ulasan.", "error", "Ulasan gagal dimuat");
        return;
      }

      const data = normalizeReviews(result.data);
      setReviews(data);

      if (withToast) {
        if (data.length === 0) {
          showMessage(
            "Belum ada ulasan dari UMKM. Ulasan akan muncul setelah UMKM memberi rating dan komentar.",
            "info",
            "Belum ada ulasan",
          );
        } else {
          showMessage(`Berhasil memuat ${data.length} ulasan.`, "success", "Ulasan diperbarui");
        }
      }
    } catch (error) {
      showMessage("Gagal terhubung ke backend saat mengambil ulasan.", "error", "Koneksi gagal");
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const getProductName = (item: ReviewItem) => {
    return item.product || item.productTitle || item.productData?.title || "-";
  };

  const getUmkmName = (item: ReviewItem) => {
    return (
      item.umkm ||
      item.umkmName ||
      item.umkmProfile?.businessName ||
      item.umkmProfile?.ownerName ||
      "-"
    );
  };

  const formatDate = (value?: string) => {
    if (!value) return "-";

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      return value;
    }

    return parsedDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetchReviews(false);
  }, []);

  return (
    <>
      <ToastAlert alert={actionAlert} onClose={() => setActionAlert(null)} />

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
            Ulasan
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
            Ulasan Produk Mahasiswa
          </h1>

          <p
            style={{
              marginTop: "14px",
              maxWidth: "820px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#cbd5e1",
            }}
          >
            Lihat rating dan komentar dari UMKM terhadap produk tugas akhir yang
            sudah digunakan dalam proses kerja sama.
          </p>

          <button
            type="button"
            onClick={() => fetchReviews(true)}
            disabled={isLoadingReviews}
            style={{
              marginTop: "20px",
              padding: "12px 18px",
              borderRadius: "14px",
              border: "1px solid rgba(52,211,153,0.24)",
              background: "rgba(16,185,129,0.12)",
              color: "#6ee7b7",
              fontSize: "14px",
              fontWeight: 900,
              cursor: isLoadingReviews ? "not-allowed" : "pointer",
            }}
          >
            {isLoadingReviews ? "Memuat ulasan..." : "Refresh Ulasan"}
          </button>
        </section>

        {message && <MessageBox message={message} />}

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "16px",
          }}
        >
          <SummaryCard
            title="Total Ulasan"
            value={isLoadingReviews ? "..." : String(totalReviews)}
            description="Jumlah ulasan yang diberikan UMKM terhadap produk Anda."
          />

          <SummaryCard
            title="Rata-rata Rating"
            value={isLoadingReviews ? "..." : String(averageRating)}
            description="Nilai rata-rata rating produk dari UMKM."
          />

          <SummaryCard
            title="Status"
            value={totalReviews === 0 ? "Belum Ada" : "Tersedia"}
            description="Status ulasan yang diterima pada akun mahasiswa."
          />
        </section>

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <SectionHeading
            title="Daftar Ulasan"
            subtitle="Ulasan akan muncul setelah UMKM menyelesaikan kerja sama dan memberikan rating."
          />

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {isLoadingReviews ? (
              <EmptyState
                title="Mengambil data ulasan..."
                description="Mohon tunggu sebentar, sistem sedang mengambil ulasan dari backend."
              />
            ) : reviews.length === 0 ? (
              <EmptyState
                title="Belum ada ulasan dari UMKM."
                description="Ulasan akan tampil di sini setelah UMKM menyelesaikan kerja sama dan memberikan rating serta komentar."
              />
            ) : (
              reviews.map((item, index) => (
                <ReviewCard
                  key={item.id || index}
                  umkm={getUmkmName(item)}
                  product={getProductName(item)}
                  rating={item.rating}
                  comment={item.comment}
                  date={formatDate(item.date || item.createdAt)}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h2
        style={{
          fontSize: "30px",
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#ffffff",
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
        {subtitle}
      </p>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div
      style={{
        ...cardStyle,
        padding: "22px",
      }}
    >
      <p style={labelStyle}>{title}</p>

      <h3
        style={{
          marginTop: "16px",
          fontSize: "32px",
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        {value}
      </h3>

      <p
        style={{
          marginTop: "10px",
          fontSize: "13px",
          lineHeight: 1.7,
          color: "#94a3b8",
        }}
      >
        {description}
      </p>

      <div
        style={{
          marginTop: "18px",
          height: "6px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            height: "6px",
            width: value === "Belum Ada" || value === "0" || value === "-" ? "18%" : "52%",
            borderRadius: "999px",
            background: "#10b981",
          }}
        />
      </div>
    </div>
  );
}

function ReviewCard({
  umkm,
  product,
  rating,
  comment,
  date,
}: {
  umkm: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
}) {
  return (
    <div
      style={{
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.035)",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 0.6fr 0.8fr",
          gap: "18px",
          alignItems: "start",
        }}
      >
        <InfoBlock label="Nama UMKM" value={umkm} />
        <InfoBlock label="Nama Produk" value={product} />
        <InfoBlock label="Rating" value={`${rating}/5`} emerald />
        <InfoBlock label="Tanggal" value={date} emerald />
      </div>

      <div
        style={{
          marginTop: "18px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.035)",
          padding: "16px",
        }}
      >
        <p style={labelStyle}>Komentar</p>
        <p
          style={{
            marginTop: "8px",
            fontSize: "14px",
            lineHeight: 1.7,
            color: "#cbd5e1",
          }}
        >
          {comment || "-"}
        </p>
      </div>
    </div>
  );
}

function InfoBlock({
  label,
  value,
  emerald = false,
}: {
  label: string;
  value: string;
  emerald?: boolean;
}) {
  return (
    <div>
      <p style={labelStyle}>{label}</p>

      <h3
        style={{
          marginTop: "8px",
          fontSize: "17px",
          fontWeight: 900,
          color: emerald ? "#6ee7b7" : "#ffffff",
        }}
      >
        {value}
      </h3>
    </div>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        borderRadius: "20px",
        border: "1px dashed rgba(52,211,153,0.28)",
        background: "rgba(16,185,129,0.06)",
        padding: "24px",
      }}
    >
      <p
        style={{
          fontSize: "16px",
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        {title}
      </p>

      <p
        style={{
          marginTop: "8px",
          maxWidth: "760px",
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

function MessageBox({ message }: { message: string }) {
  const isSuccess =
    message.toLowerCase().includes("berhasil") ||
    message.toLowerCase().includes("diperbarui") ||
    message.toLowerCase().includes("memuat");

  return (
    <div
      style={{
        borderRadius: "16px",
        border: isSuccess
          ? "1px solid rgba(52,211,153,0.24)"
          : "1px solid rgba(96,165,250,0.35)",
        background: isSuccess
          ? "rgba(16,185,129,0.10)"
          : "rgba(59,130,246,0.10)",
        padding: "14px 16px",
        color: isSuccess ? "#6ee7b7" : "#bfdbfe",
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
  alert: AlertState | null;
  onClose: () => void;
}) {
  if (!alert) return null;

  const styleMap: Record<
    AlertType,
    {
      border: string;
      background: string;
      color: string;
      icon: string;
    }
  > = {
    success: {
      border: "1px solid rgba(52,211,153,0.35)",
      background:
        "linear-gradient(135deg, rgba(6,78,59,0.98), rgba(16,185,129,0.22))",
      color: "#6ee7b7",
      icon: "✓",
    },
    error: {
      border: "1px solid rgba(248,113,113,0.38)",
      background:
        "linear-gradient(135deg, rgba(127,29,29,0.98), rgba(239,68,68,0.20))",
      color: "#fecaca",
      icon: "!",
    },
    warning: {
      border: "1px solid rgba(251,191,36,0.38)",
      background:
        "linear-gradient(135deg, rgba(113,63,18,0.98), rgba(251,191,36,0.20))",
      color: "#fde68a",
      icon: "!",
    },
    info: {
      border: "1px solid rgba(96,165,250,0.38)",
      background:
        "linear-gradient(135deg, rgba(30,58,138,0.98), rgba(59,130,246,0.20))",
      color: "#bfdbfe",
      icon: "i",
    },
  };

  const activeStyle = styleMap[alert.type];

  return (
    <div
      style={{
        position: "fixed",
        top: "22px",
        right: "22px",
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
            color: activeStyle.color,
            fontSize: "18px",
            fontWeight: 900,
            flexShrink: 0,
          }}
        >
          {activeStyle.icon}
        </div>

        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: 900,
              color: activeStyle.color,
            }}
          >
            {alert.title}
          </p>

          <p
            style={{
              margin: "6px 0 0",
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
            width: "28px",
            height: "28px",
            borderRadius: "999px",
            border: "none",
            background: "rgba(255,255,255,0.12)",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
