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

type RecommendationItem = {
  productId: number | string;
  title: string;
  shortDescription: string;
  category: string;
  price: number | string;
  screenshot?: string | null;
  averageRating?: number;
  matchScore: number;
  matchLabel: string;
  reasons: string[];
  mahasiswa?: {
    id?: number | string;
    username?: string;
    email?: string;
    mahasiswaProfile?: {
      fullName?: string;
      campus?: string;
      studyProgram?: string;
      photo?: string;
    };
  };
};

type SearchQuery = {
  keyword?: string;
  mainProblem?: string;
  problemDetail?: string;
  budgetMin?: string;
  budgetMax?: string;
  trainingDuration?: string;
  mentoringMethod?: string;
};

const cardStyle: CSSProperties = {
  borderRadius: "24px",
  border: "1px solid rgba(255,255,255,0.08)",
  background:
    "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(8,13,29,0.98) 100%)",
  boxShadow: "0 16px 40px rgba(0,0,0,0.24)",
};

const formatPrice = (price: number | string) => {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return String(price);
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numericPrice);
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#84cc16";
  if (score >= 40) return "#fbbf24";
  return "#f87171";
};

export default function UMKMRecommendationsPage() {
  const router = useRouter();

  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState<SearchQuery | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [message, setMessage] = useState("");

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
    title = "Informasi Rekomendasi"
  ) => {
    setMessage(text);
    showToast(type, title, text);
  };

  useEffect(() => {
    const savedRecommendations = localStorage.getItem(
      "rekarya_umkm_recommendations"
    );
    const savedQuery = localStorage.getItem("rekarya_umkm_search_query");

    if (savedQuery) {
      try {
        setSearchQuery(JSON.parse(savedQuery));
      } catch {
        setSearchQuery(null);
      }
    }

    if (!savedRecommendations) {
      showMessage(
        "Belum ada hasil rekomendasi. Silakan lakukan pencarian solusi terlebih dahulu.",
        "warning",
        "Belum ada data"
      );
      return;
    }

    try {
      const parsedRecommendations = JSON.parse(savedRecommendations);

      if (!Array.isArray(parsedRecommendations)) {
        showMessage(
          "Format data rekomendasi tidak valid. Silakan cari solusi ulang.",
          "error",
          "Data tidak valid"
        );
        return;
      }

      setRecommendations(parsedRecommendations);

      if (parsedRecommendations.length === 0) {
        showMessage(
          "Belum ada produk approved yang cocok dengan kebutuhan usaha.",
          "info",
          "Rekomendasi kosong"
        );
      }
    } catch {
      showMessage(
        "Gagal membaca hasil rekomendasi. Silakan cari solusi ulang.",
        "error",
        "Data rusak"
      );
    }
  }, []);

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
            Rekomendasi
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
            Hasil Rekomendasi ReKarya Match
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
            Produk tugas akhir mahasiswa diurutkan berdasarkan skor kecocokan
            dari masalah utama, fitur produk, budget, durasi implementasi,
            metode pendampingan, dan keyword bidang usaha.
          </p>

          <div
            style={{
              marginTop: "24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "14px",
            }}
          >
            <HeroMiniCard
              label="Total Hasil"
              value={`${recommendations.length} Produk`}
            />
            <HeroMiniCard
              label="Masalah Utama"
              value={searchQuery?.mainProblem || "-"}
            />
            <HeroMiniCard
              label="Range Harga"
              value={
                searchQuery?.budgetMin && searchQuery?.budgetMax
                  ? `${formatPrice(searchQuery.budgetMin)} - ${formatPrice(
                      searchQuery.budgetMax
                    )}`
                  : "-"
              }
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
              title="List Produk Rekomendasi"
              subtitle="Klik Lihat Detail untuk membuka informasi produk dan kecocokan detail."
            />

            <button
              type="button"
              onClick={() => router.push("/umkm/search")}
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
              Cari Ulang
            </button>
          </div>

          <div
            style={{
              marginTop: "22px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {recommendations.length === 0 ? (
              <EmptyState />
            ) : (
              recommendations.map((item) => (
                <RecommendationCard
                  key={item.productId}
                  item={item}
                  onDetail={() =>
                    router.push(`/umkm/products/${item.productId}`)
                  }
                  onRequestDemo={() =>
                    showMessage(
                      "Request demo akan dibuat setelah halaman detail produk dan endpoint demo request dipasang.",
                      "info",
                      "Request demo"
                    )
                  }
                  onCollaboration={() =>
                    showMessage(
                      "Ajukan kerja sama akan diproses dari halaman detail produk agar data produk lebih lengkap.",
                      "info",
                      "Ajukan kerja sama"
                    )
                  }
                />
              ))
            )}
          </div>
        </section>

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <SectionHeading
            title="Detail Kecocokan yang Digunakan"
            subtitle="Ringkasan bobot kecocokan yang ditampilkan pada hasil rekomendasi."
          />

          <div
            style={{
              marginTop: "20px",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "14px",
            }}
          >
            <ScoreInfo title="Kecocokan Masalah" value="40 poin" />
            <ScoreInfo title="Kecocokan Fitur" value="25 poin" />
            <ScoreInfo title="Kesesuaian Budget" value="15 poin" />
            <ScoreInfo title="Durasi Pelatihan" value="10 poin" />
            <ScoreInfo title="Metode Pendampingan" value="5 poin" />
            <ScoreInfo title="Keyword / Kategori" value="5 poin" />
          </div>
        </section>
      </div>
    </>
  );
}

function RecommendationCard({
  item,
  onDetail,
  onRequestDemo,
  onCollaboration,
}: {
  item: RecommendationItem;
  onDetail: () => void;
  onRequestDemo: () => void;
  onCollaboration: () => void;
}) {
  const scoreColor = getScoreColor(item.matchScore);

  return (
    <div
      style={{
        borderRadius: "22px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.035)",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            padding: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-flex",
                  borderRadius: "999px",
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(52,211,153,0.22)",
                  padding: "6px 10px",
                  fontSize: "11px",
                  fontWeight: 900,
                  color: "#6ee7b7",
                }}
              >
                {item.category || "Produk"}
              </span>

              <h3
                style={{
                  marginTop: "14px",
                  fontSize: "24px",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                {item.title}
              </h3>
            </div>

            <span
              style={{
                borderRadius: "999px",
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(52,211,153,0.22)",
                padding: "7px 11px",
                fontSize: "11px",
                fontWeight: 900,
                color: "#6ee7b7",
                whiteSpace: "nowrap",
              }}
            >
              Siap Demo
            </span>
          </div>

          <p
            style={{
              marginTop: "14px",
              fontSize: "14px",
              lineHeight: 1.8,
              color: "#cbd5e1",
            }}
          >
            {item.shortDescription || "Belum ada deskripsi singkat produk."}
          </p>

          <div
            style={{
              marginTop: "16px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <InfoMini label="Harga" value={formatPrice(item.price)} />
            <InfoMini
              label="Mahasiswa"
              value={
                item.mahasiswa?.mahasiswaProfile?.fullName ||
                item.mahasiswa?.username ||
                "-"
              }
            />
          </div>

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <button
              type="button"
              onClick={onDetail}
              style={{
                padding: "11px 15px",
                borderRadius: "13px",
                border: "none",
                background: "#10b981",
                color: "#04130f",
                fontSize: "13px",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Lihat Detail
            </button>

            <button
              type="button"
              onClick={onRequestDemo}
              style={{
                padding: "11px 15px",
                borderRadius: "13px",
                border: "1px solid rgba(52,211,153,0.24)",
                background: "rgba(16,185,129,0.10)",
                color: "#6ee7b7",
                fontSize: "13px",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Request Demo
            </button>

            <button
              type="button"
              onClick={onCollaboration}
              style={{
                padding: "11px 15px",
                borderRadius: "13px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                color: "#cbd5e1",
                fontSize: "13px",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Ajukan Kerja Sama
            </button>
          </div>
        </div>

        <div
          style={{
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            padding: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "18px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 900,
                color: "#94a3b8",
              }}
            >
              Tingkat kecocokan
            </p>

            <div
              style={{
                marginTop: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "999px",
                  border: `14px solid rgba(255,255,255,0.08)`,
                  borderTopColor: scoreColor,
                  borderRightColor: scoreColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    fontSize: "34px",
                    fontWeight: 900,
                    color: scoreColor,
                  }}
                >
                  {item.matchScore}%
                </p>

                <p
                  style={{
                    marginTop: "4px",
                    fontSize: "13px",
                    fontWeight: 900,
                    color: "#cbd5e1",
                  }}
                >
                  {item.matchLabel}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(52,211,153,0.18)",
              background: "rgba(16,185,129,0.08)",
              padding: "14px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                fontWeight: 900,
                color: "#6ee7b7",
              }}
            >
              Alasan rekomendasi
            </p>

            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {item.reasons && item.reasons.length > 0 ? (
                item.reasons.slice(0, 4).map((reason) => (
                  <p
                    key={reason}
                    style={{
                      fontSize: "12px",
                      lineHeight: 1.6,
                      color: "#cbd5e1",
                    }}
                  >
                    • {reason}
                  </p>
                ))
              ) : (
                <p
                  style={{
                    fontSize: "12px",
                    lineHeight: 1.6,
                    color: "#cbd5e1",
                  }}
                >
                  Belum ada alasan rekomendasi dari sistem.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
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
          color: "#ffffff",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function ScoreInfo({ title, value }: { title: string; value: string }) {
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
          fontSize: "14px",
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        {title}
      </p>

      <p
        style={{
          marginTop: "8px",
          fontSize: "22px",
          fontWeight: 900,
          color: "#6ee7b7",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
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
        Belum ada hasil rekomendasi.
      </p>

      <p
        style={{
          marginTop: "8px",
          fontSize: "14px",
          lineHeight: 1.7,
          color: "#94a3b8",
        }}
      >
        Silakan buka halaman Cari Solusi dan masukkan kebutuhan usaha untuk
        mendapatkan rekomendasi produk tugas akhir mahasiswa.
      </p>
    </div>
  );
}

function MessageBox({ message }: { message: string }) {
  const isSuccess =
    message.toLowerCase().includes("berhasil") ||
    message.toLowerCase().includes("ditemukan");

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