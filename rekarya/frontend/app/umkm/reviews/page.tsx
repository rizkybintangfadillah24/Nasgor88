"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";

type AlertType = "success" | "error" | "warning" | "info";

type ToastState = {
  type: AlertType;
  title: string;
  message: string;
};

type MentoringItem = {
  id: number | string;
  collaborationId?: number | string;
  status: string;
  collaboration?: {
    id?: number | string;
    status?: string;
    product?: {
      id?: number | string;
      title?: string;
      category?: string;
      price?: number | string;
      description?: string;
    };
  };
  mahasiswa?: {
    id?: number | string;
    username?: string;
    email?: string;
    mahasiswaProfile?: {
      fullName?: string;
      campus?: string;
      studyProgram?: string;
    };
  };
};

type ReviewItem = {
  id: number | string;
  rating: number;
  comment?: string | null;
  createdAt?: string;
  umkm?: {
    username?: string;
    umkmProfile?: {
      businessName?: string;
      ownerName?: string;
    };
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

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  color: "#ffffff",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle: CSSProperties = {
  ...inputStyle,
  minHeight: "130px",
  resize: "vertical",
  lineHeight: 1.7,
};

const primaryButton: CSSProperties = {
  padding: "11px 15px",
  borderRadius: "13px",
  border: "none",
  background: "#10b981",
  color: "#04130f",
  fontSize: "13px",
  fontWeight: 900,
  cursor: "pointer",
};

const secondaryButton: CSSProperties = {
  padding: "11px 15px",
  borderRadius: "13px",
  border: "1px solid rgba(52,211,153,0.24)",
  background: "rgba(16,185,129,0.10)",
  color: "#6ee7b7",
  fontSize: "13px",
  fontWeight: 900,
  cursor: "pointer",
};

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontSize: "13px",
  fontWeight: 800,
  color: "#cbd5e1",
};

const formatDate = (date?: string) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
};

export default function UMKMReviewsPage() {
  const router = useRouter();

  const [completedMentoring, setCompletedMentoring] = useState<MentoringItem[]>(
    []
  );
  const [selectedMentoringId, setSelectedMentoringId] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [productReviews, setProductReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);

  const selectedMentoring = completedMentoring.find(
    (item) => String(item.id) === String(selectedMentoringId)
  );

  const selectedProductId = selectedMentoring?.collaboration?.product?.id;
  const selectedCollaborationId = selectedMentoring?.collaboration?.id;

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
    title = "Informasi Ulasan"
  ) => {
    setMessage(text);
    showToast(type, title, text);
  };

  const fetchCompletedMentoring = async (showSuccessToast = false) => {
    try {
      setIsLoading(true);
      setMessage("");

      const token = getAuthToken();

      if (!token) {
        showMessage(
          "Token tidak ditemukan. Silakan login ulang.",
          "error",
          "Akses ditolak"
        );
        return;
      }

      const response = await fetch(`${API_BASE_URL}/mentoring/my`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showMessage(
          result.message || "Gagal mengambil data pendampingan.",
          "error",
          "Gagal memuat data"
        );
        return;
      }

      const mentoringData = Array.isArray(result.data) ? result.data : [];
      const doneMentoring = mentoringData.filter(
        (item: MentoringItem) => item.status === "DONE"
      );

      setCompletedMentoring(doneMentoring);

      if (showSuccessToast) {
        showMessage(
          doneMentoring.length === 0
            ? "Belum ada pendampingan selesai yang bisa diberi ulasan."
            : "Data pendampingan selesai berhasil diperbarui.",
          doneMentoring.length === 0 ? "info" : "success",
          doneMentoring.length === 0 ? "Belum ada data" : "Data diperbarui"
        );
      }
    } catch (error) {
      showMessage(
        "Gagal terhubung ke backend saat mengambil data pendampingan.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductReviews = async (productId: number | string) => {
    try {
      const token = getAuthToken();

      if (!token) {
        showMessage(
          "Token tidak ditemukan. Silakan login ulang.",
          "error",
          "Akses ditolak"
        );
        return;
      }

      const response = await fetch(`${API_BASE_URL}/reviews/product/${productId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showMessage(
          result.message || "Gagal mengambil ulasan produk.",
          "error",
          "Gagal memuat ulasan"
        );
        return;
      }

      setProductReviews(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      showMessage(
        "Gagal terhubung ke backend saat mengambil ulasan produk.",
        "error",
        "Koneksi gagal"
      );
    }
  };

  const handleSubmitReview = async () => {
    try {
      setIsSubmitting(true);

      if (!selectedProductId || !selectedCollaborationId) {
        showMessage(
          "Pilih pendampingan selesai terlebih dahulu.",
          "warning",
          "Data belum lengkap"
        );
        return;
      }

      const numericRating = Number(rating);

      if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
        showMessage(
          "Rating harus berupa angka 1 sampai 5.",
          "warning",
          "Rating tidak valid"
        );
        return;
      }

      const token = getAuthToken();

      if (!token) {
        showMessage(
          "Token tidak ditemukan. Silakan login ulang.",
          "error",
          "Akses ditolak"
        );
        return;
      }

      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: selectedProductId,
          collaborationId: selectedCollaborationId,
          rating: numericRating,
          comment,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showMessage(
          result.message || "Gagal membuat ulasan.",
          "error",
          "Ulasan gagal"
        );
        return;
      }

      showMessage(
        result.message || "Ulasan berhasil dibuat.",
        "success",
        "Ulasan berhasil"
      );

      setComment("");
      setRating("5");

      await fetchProductReviews(selectedProductId);
    } catch (error) {
      showMessage(
        "Gagal terhubung ke backend saat membuat ulasan.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchCompletedMentoring(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      fetchProductReviews(selectedProductId);
    } else {
      setProductReviews([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProductId]);

  const averageRating =
    productReviews.length > 0
      ? productReviews.reduce((sum, item) => sum + Number(item.rating || 0), 0) /
        productReviews.length
      : 0;

  return (
    <>
      <ToastAlert alert={toast} onClose={() => setToast(null)} />

      <style jsx global>{`
        select option {
          background: #0f172a;
          color: #ffffff;
        }

        textarea::placeholder {
          color: #64748b;
          opacity: 1;
        }
      `}</style>

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
            Ulasan UMKM
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
            Beri Ulasan Produk
          </h1>

          <p
            style={{
              marginTop: "14px",
              maxWidth: "900px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#cbd5e1",
            }}
          >
            UMKM dapat memberi ulasan setelah proses pendampingan selesai.
            Ulasan akan tersimpan pada produk dan dapat menjadi bukti kualitas
            implementasi solusi mahasiswa.
          </p>

          <div
            style={{
              marginTop: "24px",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "14px",
            }}
          >
            <HeroMiniCard
              label="Siap Diulas"
              value={String(completedMentoring.length)}
            />
            <HeroMiniCard
              label="Produk Dipilih"
              value={selectedMentoring?.collaboration?.product?.title || "-"}
            />
            <HeroMiniCard
              label="Total Ulasan Produk"
              value={String(productReviews.length)}
            />
            <HeroMiniCard
              label="Rata-rata Rating"
              value={averageRating ? averageRating.toFixed(1) : "-"}
            />
          </div>
        </section>

        {message && <MessageBox message={message} />}

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <SectionHeading
              title="Form Ulasan"
              subtitle="Pilih pendampingan yang sudah selesai, lalu beri rating dan komentar."
            />

            <button
              type="button"
              onClick={() => fetchCompletedMentoring(true)}
              style={secondaryButton}
            >
              Refresh Data
            </button>
          </div>

          <div
            style={{
              marginTop: "22px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div>
              <label style={labelStyle}>Pilih Pendampingan Selesai</label>

              <select
                value={selectedMentoringId}
                onChange={(event) => setSelectedMentoringId(event.target.value)}
                style={{
                  ...inputStyle,
                  color: selectedMentoringId ? "#ffffff" : "#94a3b8",
                }}
              >
                <option value="">Pilih produk yang sudah selesai</option>
                {completedMentoring.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.collaboration?.product?.title || "Produk"} -{" "}
                    {item.mahasiswa?.mahasiswaProfile?.fullName ||
                      item.mahasiswa?.username ||
                      "Mahasiswa"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Rating</label>

              <select
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                style={inputStyle}
              >
                <option value="5">5 - Sangat Baik</option>
                <option value="4">4 - Baik</option>
                <option value="3">3 - Cukup</option>
                <option value="2">2 - Kurang</option>
                <option value="1">1 - Buruk</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <label style={labelStyle}>Komentar Ulasan</label>

            <textarea
              style={textareaStyle}
              value={comment}
              placeholder="Tuliskan pengalaman UMKM setelah menggunakan atau menerima pendampingan produk ini."
              onChange={(event) => setComment(event.target.value)}
            />
          </div>

          {selectedMentoring && (
            <div
              style={{
                marginTop: "18px",
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "12px",
              }}
            >
              <InfoMini
                label="Produk"
                value={selectedMentoring.collaboration?.product?.title || "-"}
              />
              <InfoMini
                label="Kategori"
                value={selectedMentoring.collaboration?.product?.category || "-"}
              />
              <InfoMini
                label="Mahasiswa"
                value={
                  selectedMentoring.mahasiswa?.mahasiswaProfile?.fullName ||
                  selectedMentoring.mahasiswa?.username ||
                  "-"
                }
              />
            </div>
          )}

          <div
            style={{
              marginTop: "22px",
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => router.push("/umkm/mentoring")}
              style={secondaryButton}
            >
              Kembali ke Pendampingan
            </button>

            <button
              type="button"
              onClick={handleSubmitReview}
              disabled={isSubmitting}
              style={{
                ...primaryButton,
                opacity: isSubmitting ? 0.65 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? "Mengirim ulasan..." : "Kirim Ulasan"}
            </button>
          </div>
        </section>

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <SectionHeading
            title="Ulasan Produk Terpilih"
            subtitle="Daftar ulasan yang sudah masuk untuk produk yang dipilih."
          />

          <div
            style={{
              marginTop: "22px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {isLoading ? (
              <EmptyState
                title="Mengambil data pendampingan..."
                description="Mohon tunggu, sistem sedang mengambil data pendampingan selesai."
              />
            ) : !selectedProductId ? (
              <EmptyState
                title="Belum ada produk dipilih."
                description="Pilih pendampingan selesai terlebih dahulu untuk melihat ulasan produk."
              />
            ) : productReviews.length === 0 ? (
              <EmptyState
                title="Belum ada ulasan produk."
                description="Ulasan untuk produk ini akan tampil setelah UMKM mengirimkan rating dan komentar."
              />
            ) : (
              productReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}

function ReviewCard({ review }: { review: ReviewItem }) {
  const reviewerName =
    review.umkm?.umkmProfile?.businessName ||
    review.umkm?.umkmProfile?.ownerName ||
    review.umkm?.username ||
    "UMKM";

  return (
    <div
      style={{
        borderRadius: "18px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.035)",
        padding: "18px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "14px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: 900,
              color: "#ffffff",
            }}
          >
            {reviewerName}
          </p>

          <p
            style={{
              marginTop: "6px",
              fontSize: "13px",
              color: "#94a3b8",
            }}
          >
            {formatDate(review.createdAt)}
          </p>
        </div>

        <div
          style={{
            borderRadius: "999px",
            border: "1px solid rgba(52,211,153,0.24)",
            background: "rgba(16,185,129,0.10)",
            padding: "8px 12px",
            color: "#6ee7b7",
            fontSize: "13px",
            fontWeight: 900,
          }}
        >
          ★ {review.rating}/5
        </div>
      </div>

      <p
        style={{
          marginTop: "14px",
          fontSize: "14px",
          lineHeight: 1.8,
          color: "#cbd5e1",
        }}
      >
        {review.comment || "Tidak ada komentar tambahan."}
      </p>
    </div>
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
          fontSize: value.length > 18 ? "13px" : "20px",
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        {value}
      </p>
    </div>
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

function InfoMini({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        padding: "12px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
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
          marginTop: "6px",
          fontSize: "13px",
          fontWeight: 800,
          lineHeight: 1.5,
          color: "#ffffff",
          wordBreak: "break-word",
        }}
      >
        {value || "-"}
      </p>
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
        border: "1px dashed rgba(52,211,153,0.30)",
        background: "rgba(16,185,129,0.08)",
        padding: "26px",
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