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

type OfferItem = {
  id: number | string;
  collaborationId?: number | string;
  productId?: number | string;
  mahasiswaId?: number | string;
  umkmId?: number | string;
  title: string;
  description: string;
  price: number | string;
  note?: string | null;
  status: "WAITING" | "APPROVED" | "REJECTED" | string;
  createdAt?: string;
  updatedAt?: string;
  product?: {
    id?: number | string;
    title?: string;
    category?: string;
    price?: number | string;
    description?: string;
    mainProblem?: string;
    technology?: string;
    mentoringMethod?: string;
    trainingDuration?: number | string;
  };
  collaboration?: {
    id?: number | string;
    status?: string;
    message?: string | null;
  };
  mahasiswa?: {
    id?: number | string;
    username?: string;
    email?: string;
    mahasiswaProfile?: {
      fullName?: string;
      phone?: string;
      campus?: string;
      studyProgram?: string;
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

const dangerButton: CSSProperties = {
  padding: "11px 15px",
  borderRadius: "13px",
  border: "1px solid rgba(248,113,113,0.28)",
  background: "rgba(239,68,68,0.10)",
  color: "#fecaca",
  fontSize: "13px",
  fontWeight: 900,
  cursor: "pointer",
};

const formatPrice = (price?: number | string) => {
  if (price === undefined || price === null || price === "") return "-";

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) return String(price);

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numericPrice);
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

const getStatusText = (status: string) => {
  if (status === "WAITING") return "Menunggu";
  if (status === "APPROVED") return "Disetujui";
  if (status === "REJECTED") return "Ditolak";
  return status;
};

const getStatusDescription = (status: string) => {
  if (status === "WAITING") {
    return "Penawaran dari mahasiswa sedang menunggu persetujuan UMKM.";
  }

  if (status === "APPROVED") {
    return "Penawaran sudah disetujui dan dapat dilanjutkan ke transaksi.";
  }

  if (status === "REJECTED") {
    return "Penawaran ditolak oleh UMKM.";
  }

  return "Status penawaran belum dikenali.";
};

export default function UMKMOffersPage() {
  const router = useRouter();

  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingId, setIsUpdatingId] = useState<number | string | null>(null);
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
    title = "Informasi Penawaran"
  ) => {
    setMessage(text);
    showToast(type, title, text);
  };

  const fetchOffers = async (showSuccessToast = false) => {
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

      const response = await fetch(`${API_BASE_URL}/offers/my`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showMessage(
          result.message || "Gagal mengambil data penawaran.",
          "error",
          "Gagal memuat penawaran"
        );
        return;
      }

      const data = Array.isArray(result.data) ? result.data : [];
      setOffers(data);

      if (showSuccessToast) {
        showMessage(
          data.length === 0
            ? "Belum ada penawaran dari mahasiswa."
            : "Data penawaran berhasil diperbarui.",
          data.length === 0 ? "info" : "success",
          data.length === 0 ? "Data masih kosong" : "Data diperbarui"
        );
      }
    } catch (error) {
      showMessage(
        "Gagal terhubung ke backend saat mengambil penawaran.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateOfferStatus = async (
    offerId: number | string,
    status: "APPROVED" | "REJECTED"
  ) => {
    try {
      setIsUpdatingId(offerId);

      const token = getAuthToken();

      if (!token) {
        showMessage(
          "Token tidak ditemukan. Silakan login ulang.",
          "error",
          "Akses ditolak"
        );
        return;
      }

      const response = await fetch(`${API_BASE_URL}/offers/${offerId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showMessage(
          result.message || "Gagal memperbarui status penawaran.",
          "error",
          "Update gagal"
        );
        return;
      }

      showMessage(
        status === "APPROVED"
          ? "Penawaran berhasil disetujui."
          : "Penawaran berhasil ditolak.",
        "success",
        "Status diperbarui"
      );

      await fetchOffers(false);
    } catch (error) {
      showMessage(
        "Gagal terhubung ke backend saat memperbarui penawaran.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchOffers(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const waitingCount = offers.filter((item) => item.status === "WAITING").length;
  const approvedCount = offers.filter(
    (item) => item.status === "APPROVED"
  ).length;
  const rejectedCount = offers.filter(
    (item) => item.status === "REJECTED"
  ).length;

  const totalOfferValue = offers
    .filter((item) => item.status === "APPROVED")
    .reduce((total, item) => {
      const price = Number(item.price);

      if (Number.isNaN(price)) return total;

      return total + price;
    }, 0);

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
            Penawaran UMKM
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
            Kelola Penawaran Kerja Sama
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
            Lihat rincian penawaran dari mahasiswa, termasuk nama produk,
            deskripsi, harga, catatan, status, dan lanjutkan proses dengan
            menyetujui atau menolak penawaran.
          </p>

          <div
            style={{
              marginTop: "24px",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "14px",
            }}
          >
            <HeroMiniCard label="Menunggu" value={String(waitingCount)} />
            <HeroMiniCard label="Disetujui" value={String(approvedCount)} />
            <HeroMiniCard label="Ditolak" value={String(rejectedCount)} />
            <HeroMiniCard
              label="Total Approved"
              value={formatPrice(totalOfferValue)}
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
              title="Daftar Penawaran"
              subtitle="Data penawaran yang dikirim mahasiswa setelah kerja sama disetujui."
            />

            <button
              type="button"
              onClick={() => fetchOffers(true)}
              style={secondaryButton}
            >
              Refresh Data
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
            {isLoading ? (
              <EmptyState
                title="Mengambil data penawaran..."
                description="Mohon tunggu, sistem sedang mengambil data penawaran milik UMKM."
              />
            ) : offers.length === 0 ? (
              <EmptyState
                title="Belum ada penawaran."
                description="Penawaran akan tampil di sini setelah mahasiswa menyetujui kerja sama dan mengirim rincian penawaran."
              />
            ) : (
              offers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  isUpdating={isUpdatingId === offer.id}
                  onApprove={() => updateOfferStatus(offer.id, "APPROVED")}
                  onReject={() => updateOfferStatus(offer.id, "REJECTED")}
                  onViewProduct={() => {
                    const productId = offer.product?.id || offer.productId;

                    if (!productId) {
                      showMessage(
                        "ID produk tidak ditemukan pada penawaran.",
                        "warning",
                        "Produk tidak valid"
                      );
                      return;
                    }

                    router.push(`/umkm/products/${productId}`);
                  }}
                  onViewTransaction={() => router.push("/umkm/transactions")}
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
            title="Alur Setelah Penawaran"
            subtitle="Setelah penawaran disetujui, proses dapat dilanjutkan ke transaksi dan pendampingan implementasi produk."
          />

          <div
            style={{
              marginTop: "20px",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "14px",
            }}
          >
            <FlowCard
              number="1"
              title="Review Penawaran"
              description="UMKM meninjau judul, deskripsi, harga, dan catatan penawaran dari mahasiswa."
            />

            <FlowCard
              number="2"
              title="Setujui / Tolak"
              description="UMKM dapat menyetujui jika sesuai, atau menolak jika penawaran belum cocok."
            />

            <FlowCard
              number="3"
              title="Transaksi"
              description="Jika disetujui, proses dapat dilanjutkan ke transaksi sesuai alur aplikasi."
            />
          </div>
        </section>
      </div>
    </>
  );
}

function OfferCard({
  offer,
  isUpdating,
  onApprove,
  onReject,
  onViewProduct,
  onViewTransaction,
}: {
  offer: OfferItem;
  isUpdating: boolean;
  onApprove: () => void;
  onReject: () => void;
  onViewProduct: () => void;
  onViewTransaction: () => void;
}) {
  const studentName =
    offer.mahasiswa?.mahasiswaProfile?.fullName ||
    offer.mahasiswa?.username ||
    "-";

  const studentContact =
    offer.mahasiswa?.mahasiswaProfile?.phone || offer.mahasiswa?.email || "-";

  const canUpdate = offer.status === "WAITING";

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
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div>
              <StatusBadge status={offer.status} />

              <h3
                style={{
                  marginTop: "14px",
                  fontSize: "24px",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                {offer.title || "Penawaran Tanpa Judul"}
              </h3>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#94a3b8",
                }}
              >
                {getStatusDescription(offer.status)}
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 900,
                  color: "#6ee7b7",
                }}
              >
                Tanggal Penawaran
              </p>

              <p
                style={{
                  marginTop: "6px",
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#ffffff",
                }}
              >
                {formatDate(offer.createdAt)}
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "18px",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "12px",
            }}
          >
            <InfoMini label="Produk" value={offer.product?.title || "-"} />
            <InfoMini label="Harga Penawaran" value={formatPrice(offer.price)} />
            <InfoMini
              label="Status Kerja Sama"
              value={offer.collaboration?.status || "-"}
            />
          </div>

          <TextBox title="Deskripsi Penawaran" text={offer.description} />

          <TextBox
            title="Catatan Penawaran"
            text={offer.note || "Tidak ada catatan tambahan dari mahasiswa."}
          />

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <button type="button" onClick={onViewProduct} style={secondaryButton}>
              Lihat Produk
            </button>

            <button
              type="button"
              onClick={onViewTransaction}
              style={secondaryButton}
            >
              Lihat Transaksi
            </button>

            {canUpdate && (
              <>
                <button
                  type="button"
                  onClick={onApprove}
                  disabled={isUpdating}
                  style={{
                    ...primaryButton,
                    opacity: isUpdating ? 0.65 : 1,
                    cursor: isUpdating ? "not-allowed" : "pointer",
                  }}
                >
                  {isUpdating ? "Memproses..." : "Setujui Penawaran"}
                </button>

                <button
                  type="button"
                  onClick={onReject}
                  disabled={isUpdating}
                  style={{
                    ...dangerButton,
                    opacity: isUpdating ? 0.65 : 1,
                    cursor: isUpdating ? "not-allowed" : "pointer",
                  }}
                >
                  {isUpdating ? "Memproses..." : "Tolak Penawaran"}
                </button>
              </>
            )}
          </div>
        </div>

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
              fontSize: "13px",
              fontWeight: 900,
              color: "#6ee7b7",
            }}
          >
            Mahasiswa Pengirim Penawaran
          </p>

          <div
            style={{
              marginTop: "14px",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "12px",
            }}
          >
            <InfoMini label="Nama" value={studentName} />
            <InfoMini
              label="Kampus"
              value={offer.mahasiswa?.mahasiswaProfile?.campus || "-"}
            />
            <InfoMini
              label="Program Studi"
              value={offer.mahasiswa?.mahasiswaProfile?.studyProgram || "-"}
            />
            <InfoMini label="Kontak" value={studentContact} />
          </div>

          <div
            style={{
              marginTop: "18px",
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
              Status Saat Ini
            </p>

            <p
              style={{
                marginTop: "8px",
                fontSize: "22px",
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              {getStatusText(offer.status)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusText = getStatusText(status);

  const styleMap: Record<
    string,
    {
      border: string;
      background: string;
      color: string;
    }
  > = {
    WAITING: {
      border: "1px solid rgba(251,191,36,0.30)",
      background: "rgba(251,191,36,0.10)",
      color: "#fbbf24",
    },
    APPROVED: {
      border: "1px solid rgba(52,211,153,0.30)",
      background: "rgba(16,185,129,0.12)",
      color: "#6ee7b7",
    },
    REJECTED: {
      border: "1px solid rgba(248,113,113,0.30)",
      background: "rgba(239,68,68,0.10)",
      color: "#fecaca",
    },
  };

  const selected =
    styleMap[status] ||
    ({
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.04)",
      color: "#cbd5e1",
    } as const);

  return (
    <span
      style={{
        display: "inline-flex",
        width: "fit-content",
        borderRadius: "999px",
        border: selected.border,
        background: selected.background,
        color: selected.color,
        padding: "7px 12px",
        fontSize: "12px",
        fontWeight: 900,
      }}
    >
      {statusText}
    </span>
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
          fontSize: value.length > 14 ? "14px" : "20px",
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

function TextBox({ title, text }: { title: string; text: string }) {
  return (
    <div
      style={{
        marginTop: "14px",
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
          lineHeight: 1.7,
          color: "#cbd5e1",
        }}
      >
        {text || "-"}
      </p>
    </div>
  );
}

function FlowCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
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
          width: "42px",
          height: "42px",
          borderRadius: "999px",
          background: "#10b981",
          color: "#04130f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          fontWeight: 900,
        }}
      >
        {number}
      </div>

      <p
        style={{
          marginTop: "14px",
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
    message.toLowerCase().includes("diperbarui") ||
    message.toLowerCase().includes("disetujui") ||
    message.toLowerCase().includes("ditolak");

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