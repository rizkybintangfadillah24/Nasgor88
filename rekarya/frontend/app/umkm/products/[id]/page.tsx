"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type AlertType = "success" | "error" | "warning" | "info";

type ToastState = {
  type: AlertType;
  title: string;
  message: string;
};

type ProductDetail = {
  id: number | string;
  title: string;
  category: string;
  description: string;
  mainProblem: string;
  problemDetail?: string | null;
  targetBusiness?: string | null;
  mainFeatures: string;
  featureDetail: string;
  technology: string;
  trainingDuration: number | string;
  mentoringMethod: string;
  price: number | string;
  screenshot?: string | null;
  status?: string;
  mahasiswa?: {
    id?: number | string;
    username?: string;
    email?: string;
    mahasiswaProfile?: {
      fullName?: string;
      phone?: string;
      campus?: string;
      major?: string;
      studyProgram?: string;
      bio?: string;
      photo?: string;
    };
  };
  reviews?: {
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
  }[];
};

type RecommendationItem = {
  productId: number | string;
  title: string;
  shortDescription?: string;
  category?: string;
  price?: number | string;
  matchScore?: number;
  matchLabel?: string;
  reasons?: string[];
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const FILE_BASE_URL = API_BASE_URL.replace("/api", "");

const getAuthToken = () => {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("rekarya_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken")
  );
};

const getFileUrl = (path?: string | null) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${FILE_BASE_URL}${path}`;
};

const formatPrice = (price: number | string) => {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) return String(price);

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numericPrice);
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
  minHeight: "110px",
  resize: "vertical",
  lineHeight: 1.7,
};

export default function UMKMProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const productId = params?.id as string;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendationItem | null>(
    null
  );
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingCollaboration, setIsSubmittingCollaboration] =
    useState(false);
  const [collaborationMessage, setCollaborationMessage] = useState(
    "Saya tertarik mengajukan kerja sama untuk implementasi produk ini pada usaha saya."
  );
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
    title = "Informasi Produk"
  ) => {
    setMessageText(text);
    showToast(type, title, text);
  };

  const loadRecommendationFromStorage = () => {
    const savedRecommendations = localStorage.getItem(
      "rekarya_umkm_recommendations"
    );

    if (!savedRecommendations) return;

    try {
      const parsedRecommendations = JSON.parse(savedRecommendations);

      if (!Array.isArray(parsedRecommendations)) return;

      const selectedRecommendation = parsedRecommendations.find(
        (item: RecommendationItem) => String(item.productId) === String(productId)
      );

      if (selectedRecommendation) {
        setRecommendation(selectedRecommendation);
      }
    } catch {
      setRecommendation(null);
    }
  };

  const fetchProductDetail = async () => {
    try {
      setIsLoading(true);

      const token = getAuthToken();

      if (!token) {
        showMessage(
          "Token tidak ditemukan. Silakan login ulang.",
          "error",
          "Akses ditolak"
        );
        return;
      }

      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showMessage(
          result.message || "Gagal mengambil detail produk.",
          "error",
          "Gagal memuat produk"
        );
        return;
      }

      setProduct(result.data || null);
    } catch (error) {
      showMessage(
        "Gagal terhubung ke backend saat mengambil detail produk.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCollaboration = async () => {
    try {
      setIsSubmittingCollaboration(true);

      const token = getAuthToken();

      if (!token) {
        showMessage(
          "Token tidak ditemukan. Silakan login ulang.",
          "error",
          "Akses ditolak"
        );
        return;
      }

      if (!product?.id) {
        showMessage(
          "Produk belum valid untuk diajukan kerja sama.",
          "warning",
          "Produk tidak valid"
        );
        return;
      }

      const response = await fetch(`${API_BASE_URL}/collaborations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          message: collaborationMessage,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showMessage(
          result.message || "Gagal mengajukan kerja sama.",
          "error",
          "Pengajuan gagal"
        );
        return;
      }

      showMessage(
        result.message || "Pengajuan kerja sama berhasil dibuat.",
        "success",
        "Kerja sama diajukan"
      );

      window.setTimeout(() => {
        router.push("/umkm/collaborations");
      }, 1000);
    } catch (error) {
      showMessage(
        "Gagal terhubung ke backend saat mengajukan kerja sama.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsSubmittingCollaboration(false);
    }
  };

  useEffect(() => {
    loadRecommendationFromStorage();
    fetchProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const matchScore = recommendation?.matchScore ?? 0;
  const matchLabel =
    recommendation?.matchLabel ||
    (matchScore >= 80
      ? "Sangat Cocok"
      : matchScore >= 60
      ? "Cocok"
      : matchScore >= 40
      ? "Cukup Sesuai"
      : "Belum Ada Kecocokan");

  const studentProfile = product?.mahasiswa?.mahasiswaProfile;

  return (
    <>
      <ToastAlert alert={toast} onClose={() => setToast(null)} />

      <style jsx global>{`
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
            Detail Produk
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
            {isLoading ? "Memuat Detail Produk..." : product?.title || "Produk"}
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
            Melihat informasi lengkap produk, profil mahasiswa pembuat produk,
            kecocokan detail, dan pengajuan kerja sama untuk implementasi solusi
            digital UMKM.
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
              label="Kategori"
              value={product?.category || "Belum tersedia"}
            />
            <HeroMiniCard
              label="Harga"
              value={product ? formatPrice(product.price) : "-"}
            />
            <HeroMiniCard
              label="Kecocokan"
              value={recommendation ? `${matchScore}% • ${matchLabel}` : "-"}
            />
          </div>
        </section>

        {messageText && <MessageBox message={messageText} />}

        {isLoading ? (
          <section style={{ ...cardStyle, padding: "26px" }}>
            <SectionHeading
              title="Mengambil data produk..."
              subtitle="Mohon tunggu, sistem sedang mengambil detail produk dari backend."
            />
          </section>
        ) : !product ? (
          <section style={{ ...cardStyle, padding: "26px" }}>
            <SectionHeading
              title="Produk tidak ditemukan"
              subtitle="Produk belum tersedia, belum approved, atau tidak bisa diakses."
            />

            <button
              type="button"
              onClick={() => router.push("/umkm/recommendations")}
              style={secondaryButtonStyle}
            >
              Back ke Hasil
            </button>
          </section>
        ) : (
          <>
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "1.05fr 0.95fr",
                gap: "16px",
              }}
            >
              <div
                style={{
                  ...cardStyle,
                  padding: "26px",
                }}
              >
                <SectionHeading
                  title="Informasi Lengkap Produk"
                  subtitle="Data produk tugas akhir mahasiswa yang dapat digunakan sebagai solusi digital UMKM."
                />

                <div
                  style={{
                    marginTop: "22px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <InfoBox label="Judul Produk" value={product.title} />
                  <InfoBox label="Kategori Produk" value={product.category} />
                  <InfoBox
                    label="Masalah Utama"
                    value={product.mainProblem || "-"}
                  />
                  <InfoBox
                    label="Target UMKM"
                    value={product.targetBusiness || "-"}
                  />
                  <InfoBox
                    label="Fitur Utama"
                    value={product.mainFeatures || "-"}
                  />
                  <InfoBox
                    label="Teknologi"
                    value={product.technology || "-"}
                  />
                  <InfoBox
                    label="Estimasi Durasi"
                    value={`${product.trainingDuration} Hari`}
                  />
                  <InfoBox
                    label="Metode Pendampingan"
                    value={product.mentoringMethod || "-"}
                  />
                  <InfoBox label="Harga" value={formatPrice(product.price)} />
                </div>

                <div style={{ marginTop: "18px" }}>
                  <TextSection title="Deskripsi" text={product.description} />
                </div>

                <div style={{ marginTop: "14px" }}>
                  <TextSection
                    title="Detail Masalah"
                    text={
                      product.problemDetail ||
                      "Detail masalah belum ditambahkan."
                    }
                  />
                </div>

                <div style={{ marginTop: "14px" }}>
                  <TextSection
                    title="Detail Fitur"
                    text={
                      product.featureDetail ||
                      "Detail fitur belum ditambahkan."
                    }
                  />
                </div>
              </div>

              <div
                style={{
                  ...cardStyle,
                  padding: "26px",
                }}
              >
                <SectionHeading
                  title="Screenshot Produk"
                  subtitle="Tampilan produk atau poster solusi yang diunggah mahasiswa."
                />

                <div
                  style={{
                    marginTop: "20px",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    minHeight: "260px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {product.screenshot ? (
                    <img
                      src={getFileUrl(product.screenshot)}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "360px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div style={{ textAlign: "center", padding: "28px" }}>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: 900,
                          color: "#ffffff",
                        }}
                      >
                        Belum ada screenshot produk.
                      </p>
                      <p
                        style={{
                          marginTop: "8px",
                          fontSize: "14px",
                          color: "#94a3b8",
                          lineHeight: 1.7,
                        }}
                      >
                        Screenshot akan tampil jika mahasiswa mengunggah gambar
                        produk.
                      </p>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: "20px" }}>
                  <SectionHeading
                    title="Profil Mahasiswa"
                    subtitle="Informasi pembuat produk tugas akhir."
                  />

                  <div
                    style={{
                      marginTop: "16px",
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "12px",
                    }}
                  >
                    <InfoBox
                      label="Nama Mahasiswa"
                      value={
                        studentProfile?.fullName ||
                        product.mahasiswa?.username ||
                        "-"
                      }
                    />
                    <InfoBox
                      label="Universitas / Kampus"
                      value={studentProfile?.campus || "-"}
                    />
                    <InfoBox
                      label="Program Studi"
                      value={studentProfile?.studyProgram || "-"}
                    />
                    <InfoBox
                      label="Kontak"
                      value={
                        studentProfile?.phone ||
                        product.mahasiswa?.email ||
                        "-"
                      }
                    />
                  </div>
                </div>
              </div>
            </section>

            <section
              style={{
                ...cardStyle,
                padding: "26px",
              }}
            >
              <SectionHeading
                title="Kecocokan Detail"
                subtitle="Rincian kecocokan berdasarkan kebutuhan UMKM dan produk tugas akhir mahasiswa."
              />

              <div
                style={{
                  marginTop: "22px",
                  display: "grid",
                  gridTemplateColumns: "0.8fr 1.2fr",
                  gap: "20px",
                  alignItems: "stretch",
                }}
              >
                <div
                  style={{
                    borderRadius: "22px",
                    border: "1px solid rgba(52,211,153,0.22)",
                    background: "rgba(16,185,129,0.08)",
                    padding: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "170px",
                      height: "170px",
                      borderRadius: "999px",
                      border: "16px solid rgba(255,255,255,0.08)",
                      borderTopColor: getScoreColor(matchScore),
                      borderRightColor: getScoreColor(matchScore),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "38px",
                        fontWeight: 900,
                        color: getScoreColor(matchScore),
                      }}
                    >
                      {recommendation ? `${matchScore}%` : "-"}
                    </p>

                    <p
                      style={{
                        marginTop: "4px",
                        fontSize: "13px",
                        fontWeight: 900,
                        color: "#cbd5e1",
                      }}
                    >
                      {matchLabel}
                    </p>
                  </div>

                  <p
                    style={{
                      marginTop: "18px",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "#94a3b8",
                    }}
                  >
                    Skor berasal dari hasil pencarian ReKarya Match terakhir
                    yang dilakukan oleh UMKM.
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <ScoreBox title="Kecocokan Masalah" value="35%" />
                  <ScoreBox title="Kesesuaian Harga" value="20%" />
                  <ScoreBox title="Kecocokan Fitur Utama" value="20%" />
                  <ScoreBox title="Keyword / Kategori" value="10%" />
                  <ScoreBox title="Estimasi Durasi Pelatihan" value="10%" />
                  <ScoreBox title="Metode Pendampingan" value="5%" />
                </div>
              </div>

              <div
                style={{
                  marginTop: "22px",
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  padding: "18px",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 900,
                    color: "#6ee7b7",
                  }}
                >
                  Alasan Rekomendasi
                </p>

                <div
                  style={{
                    marginTop: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {recommendation?.reasons && recommendation.reasons.length > 0 ? (
                    recommendation.reasons.map((reason) => (
                      <p
                        key={reason}
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.7,
                          color: "#cbd5e1",
                        }}
                      >
                        • {reason}
                      </p>
                    ))
                  ) : (
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.7,
                        color: "#94a3b8",
                      }}
                    >
                      Belum ada alasan rekomendasi. Buka menu Cari Solusi untuk
                      menghasilkan kecocokan berdasarkan kebutuhan UMKM.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section
              style={{
                ...cardStyle,
                padding: "26px",
              }}
            >
              <SectionHeading
                title="Ajukan Kerja Sama"
                subtitle="Kirim permintaan kerja sama ke mahasiswa pembuat produk."
              />

              <div style={{ marginTop: "18px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#cbd5e1",
                  }}
                >
                  Pesan Pengajuan
                </label>

                <textarea
                  style={textareaStyle}
                  value={collaborationMessage}
                  placeholder="Tuliskan pesan pengajuan kerja sama untuk mahasiswa."
                  onChange={(event) =>
                    setCollaborationMessage(event.target.value)
                  }
                />
              </div>

              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  onClick={() => router.push("/umkm/recommendations")}
                  style={secondaryButtonStyle}
                >
                  Back ke Hasil
                </button>

                <button
                  type="button"
                  onClick={handleCreateCollaboration}
                  disabled={isSubmittingCollaboration}
                  style={{
                    padding: "14px 24px",
                    borderRadius: "14px",
                    border: "none",
                    background: isSubmittingCollaboration
                      ? "#065f46"
                      : "#10b981",
                    color: "#04130f",
                    fontSize: "14px",
                    fontWeight: 900,
                    cursor: isSubmittingCollaboration
                      ? "not-allowed"
                      : "pointer",
                    boxShadow: "0 10px 24px rgba(16,185,129,0.24)",
                  }}
                >
                  {isSubmittingCollaboration
                    ? "Mengirim pengajuan..."
                    : "Ajukan Kerja Sama"}
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}

const secondaryButtonStyle: CSSProperties = {
  padding: "14px 20px",
  borderRadius: "14px",
  border: "1px solid rgba(52,211,153,0.24)",
  background: "rgba(16,185,129,0.10)",
  color: "#6ee7b7",
  fontSize: "14px",
  fontWeight: 900,
  cursor: "pointer",
};

function getScoreColor(score: number) {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#84cc16";
  if (score >= 40) return "#fbbf24";
  return "#f87171";
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

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        padding: "16px",
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
          marginTop: "8px",
          fontSize: "14px",
          lineHeight: 1.6,
          fontWeight: 800,
          color: "#ffffff",
          wordBreak: "break-word",
        }}
      >
        {value || "-"}
      </p>
    </div>
  );
}

function TextSection({ title, text }: { title: string; text: string }) {
  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        padding: "16px",
      }}
    >
      <p
        style={{
          fontSize: "13px",
          fontWeight: 900,
          color: "#6ee7b7",
        }}
      >
        {title}
      </p>

      <p
        style={{
          marginTop: "8px",
          fontSize: "14px",
          lineHeight: 1.8,
          color: "#cbd5e1",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function ScoreBox({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        borderRadius: "18px",
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
          marginTop: "10px",
          fontSize: "28px",
          fontWeight: 900,
          color: "#6ee7b7",
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
    message.toLowerCase().includes("diajukan");

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