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
  title?: string;
  description?: string;
  price?: number | string;
  status?: string;
  product?: {
    id?: number | string;
    title?: string;
    category?: string;
    price?: number | string;
  };
  mahasiswa?: {
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

type TransactionItem = {
  id: number | string;
  collaborationId?: number | string;
  offerId?: number | string;
  amount: number | string;
  status: "UNPAID" | "REVIEW" | "PAID" | string;
  note?: string | null;
  createdAt?: string;
  updatedAt?: string;
  offer?: {
    id?: number | string;
    title?: string;
    description?: string;
    price?: number | string;
    status?: string;
    note?: string | null;
  };
  collaboration?: {
    id?: number | string;
    status?: string;
    product?: {
      id?: number | string;
      title?: string;
      category?: string;
      price?: number | string;
      description?: string;
      mainProblem?: string;
      technology?: string;
    };
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

const getPaymentText = (status: string) => {
  if (status === "UNPAID") return "Belum";
  if (status === "PAID") return "Sudah";
  if (status === "REVIEW") return "Sedang diproses admin";
  return status;
};

const getPaymentDescription = (status: string) => {
  if (status === "UNPAID") {
    return "Transaksi sudah dibuat, tetapi status pembayaran masih belum dibayar.";
  }

  if (status === "REVIEW") {
    return "Pembayaran sedang diproses atau ditinjau admin.";
  }

  if (status === "PAID") {
    return "Pembayaran sudah dikonfirmasi.";
  }

  return "Status pembayaran belum dikenali.";
};

export default function UMKMTransactionsPage() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [approvedOffers, setApprovedOffers] = useState<OfferItem[]>([]);
  const [selectedOfferId, setSelectedOfferId] = useState("");
  const [transactionNote, setTransactionNote] = useState(
    "Saya ingin melanjutkan transaksi berdasarkan penawaran yang sudah disetujui."
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
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
    title = "Informasi Transaksi"
  ) => {
    setMessage(text);
    showToast(type, title, text);
  };

  const fetchTransactions = async () => {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login ulang.");
    }

    const response = await fetch(`${API_BASE_URL}/transactions/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Gagal mengambil data transaksi.");
    }

    return Array.isArray(result.data) ? result.data : [];
  };

  const fetchApprovedOffers = async () => {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login ulang.");
    }

    const response = await fetch(`${API_BASE_URL}/offers/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Gagal mengambil data penawaran.");
    }

    const offers = Array.isArray(result.data) ? result.data : [];

    return offers.filter((offer: OfferItem) => offer.status === "APPROVED");
  };

  const fetchPageData = async (showSuccessToast = false) => {
    try {
      setIsLoading(true);
      setMessage("");

      const [transactionResult, offerResult] = await Promise.allSettled([
        fetchTransactions(),
        fetchApprovedOffers(),
      ]);

      if (transactionResult.status === "fulfilled") {
        setTransactions(transactionResult.value);
      }

      if (offerResult.status === "fulfilled") {
        const transactionOfferIds =
          transactionResult.status === "fulfilled"
            ? transactionResult.value.map((item: TransactionItem) =>
                String(item.offerId)
              )
            : [];

        const offersWithoutTransaction = offerResult.value.filter(
          (offer: OfferItem) => !transactionOfferIds.includes(String(offer.id))
        );

        setApprovedOffers(offersWithoutTransaction);
      }

      if (
        transactionResult.status === "rejected" &&
        offerResult.status === "rejected"
      ) {
        showMessage(
          "Data transaksi belum bisa dimuat. Pastikan login sebagai UMKM dan backend berjalan.",
          "error",
          "Gagal memuat transaksi"
        );
        return;
      }

      if (showSuccessToast) {
        showMessage(
          "Data transaksi berhasil diperbarui.",
          "success",
          "Data diperbarui"
        );
      }
    } catch (error) {
      showMessage(
        error instanceof Error
          ? error.message
          : "Gagal terhubung ke backend transaksi.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTransaction = async () => {
    try {
      setIsCreating(true);

      if (!selectedOfferId) {
        showMessage(
          "Pilih penawaran yang ingin dibuat transaksi.",
          "warning",
          "Penawaran belum dipilih"
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

      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          offerId: selectedOfferId,
          note: transactionNote,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showMessage(
          result.message || "Gagal membuat transaksi.",
          "error",
          "Transaksi gagal"
        );
        return;
      }

      showMessage(
        result.message || "Transaksi berhasil dibuat.",
        "success",
        "Transaksi berhasil"
      );

      setSelectedOfferId("");
      setTransactionNote(
        "Saya ingin melanjutkan transaksi berdasarkan penawaran yang sudah disetujui."
      );

      await fetchPageData(false);
    } catch (error) {
      showMessage(
        "Gagal terhubung ke backend saat membuat transaksi.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    fetchPageData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unpaidCount = transactions.filter(
    (item) => item.status === "UNPAID"
  ).length;

  const reviewCount = transactions.filter((item) => item.status === "REVIEW")
    .length;

  const paidCount = transactions.filter((item) => item.status === "PAID").length;

  const totalAmount = transactions.reduce((total, item) => {
    const amount = Number(item.amount);

    if (Number.isNaN(amount)) return total;

    return total + amount;
  }, 0);

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
            Transaksi UMKM
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
            Kelola Transaksi
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
            Buat transaksi dari penawaran yang sudah disetujui dan pantau status
            pembayaran. Status pembayaran mengikuti backend: Belum, Sedang
            diproses admin, atau Sudah.
          </p>

          <div
            style={{
              marginTop: "24px",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "14px",
            }}
          >
            <HeroMiniCard label="Belum" value={String(unpaidCount)} />
            <HeroMiniCard label="Review" value={String(reviewCount)} />
            <HeroMiniCard label="Sudah" value={String(paidCount)} />
            <HeroMiniCard label="Total Nilai" value={formatPrice(totalAmount)} />
          </div>
        </section>

        {message && <MessageBox message={message} />}

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <SectionHeading
            title="Buat Transaksi"
            subtitle="Transaksi hanya bisa dibuat dari penawaran yang sudah disetujui dan belum memiliki transaksi."
          />

          <div
            style={{
              marginTop: "20px",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "16px",
            }}
          >
            <div>
              <label style={labelStyle}>Pilih Penawaran Disetujui</label>

              <select
                value={selectedOfferId}
                onChange={(event) => setSelectedOfferId(event.target.value)}
                style={{
                  ...inputStyle,
                  color: selectedOfferId ? "#ffffff" : "#94a3b8",
                }}
              >
                <option value="">Pilih penawaran</option>
                {approvedOffers.map((offer) => (
                  <option key={offer.id} value={offer.id}>
                    {(offer.title || offer.product?.title || "Penawaran")} -{" "}
                    {formatPrice(offer.price)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Catatan Transaksi</label>

              <textarea
                style={textareaStyle}
                value={transactionNote}
                placeholder="Tuliskan catatan transaksi."
                onChange={(event) => setTransactionNote(event.target.value)}
              />
            </div>
          </div>

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
              onClick={() => router.push("/umkm/offers")}
              style={secondaryButton}
            >
              Lihat Penawaran
            </button>

            <button
              type="button"
              onClick={handleCreateTransaction}
              disabled={isCreating}
              style={{
                ...primaryButton,
                opacity: isCreating ? 0.65 : 1,
                cursor: isCreating ? "not-allowed" : "pointer",
              }}
            >
              {isCreating ? "Membuat transaksi..." : "Buat Transaksi"}
            </button>
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
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <SectionHeading
              title="Daftar Transaksi"
              subtitle="Data transaksi milik UMKM berdasarkan penawaran yang sudah disetujui."
            />

            <button
              type="button"
              onClick={() => fetchPageData(true)}
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
                title="Mengambil data transaksi..."
                description="Mohon tunggu, sistem sedang mengambil transaksi milik UMKM."
              />
            ) : transactions.length === 0 ? (
              <EmptyState
                title="Belum ada transaksi."
                description="Transaksi akan tampil di sini setelah UMKM membuat transaksi dari penawaran yang sudah disetujui."
              />
            ) : (
              transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onViewProduct={() => {
                    const productId = transaction.collaboration?.product?.id;

                    if (!productId) {
                      showMessage(
                        "ID produk tidak ditemukan pada transaksi.",
                        "warning",
                        "Produk tidak valid"
                      );
                      return;
                    }

                    router.push(`/umkm/products/${productId}`);
                  }}
                  onViewMentoring={() => router.push("/umkm/mentoring")}
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
            title="Alur Setelah Transaksi"
            subtitle="Setelah transaksi dibuat dan diproses, kerja sama dapat dilanjutkan ke pendampingan implementasi."
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
              title="Transaksi Dibuat"
              description="UMKM membuat transaksi dari penawaran yang sudah disetujui."
            />

            <FlowCard
              number="2"
              title="Status Pembayaran"
              description="Status pembayaran akan dipantau oleh sistem dan admin."
            />

            <FlowCard
              number="3"
              title="Pendampingan"
              description="Setelah proses transaksi berjalan, implementasi dapat dilanjutkan ke pendampingan."
            />
          </div>
        </section>
      </div>
    </>
  );
}

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontSize: "13px",
  fontWeight: 800,
  color: "#cbd5e1",
};

function TransactionCard({
  transaction,
  onViewProduct,
  onViewMentoring,
}: {
  transaction: TransactionItem;
  onViewProduct: () => void;
  onViewMentoring: () => void;
}) {
  const product = transaction.collaboration?.product;

  const studentName =
    transaction.mahasiswa?.mahasiswaProfile?.fullName ||
    transaction.mahasiswa?.username ||
    "-";

  const studentContact =
    transaction.mahasiswa?.mahasiswaProfile?.phone ||
    transaction.mahasiswa?.email ||
    "-";

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
              <StatusBadge status={transaction.status} />

              <h3
                style={{
                  marginTop: "14px",
                  fontSize: "24px",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                {product?.title || transaction.offer?.title || "Transaksi"}
              </h3>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#94a3b8",
                }}
              >
                {getPaymentDescription(transaction.status)}
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
                Tanggal Transaksi
              </p>

              <p
                style={{
                  marginTop: "6px",
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#ffffff",
                }}
              >
                {formatDate(transaction.createdAt)}
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
            <InfoMini label="Jumlah" value={formatPrice(transaction.amount)} />
            <InfoMini label="Produk" value={product?.title || "-"} />
            <InfoMini
              label="Status Bayar"
              value={getPaymentText(transaction.status)}
            />
          </div>

          <TextBox
            title="Catatan Transaksi"
            text={transaction.note || "Tidak ada catatan transaksi."}
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
              onClick={onViewMentoring}
              style={secondaryButton}
            >
              Lihat Pendampingan
            </button>
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
            Mahasiswa
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
              value={transaction.mahasiswa?.mahasiswaProfile?.campus || "-"}
            />
            <InfoMini
              label="Program Studi"
              value={
                transaction.mahasiswa?.mahasiswaProfile?.studyProgram || "-"
              }
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
              {getPaymentText(transaction.status)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusText = getPaymentText(status);

  const styleMap: Record<
    string,
    {
      border: string;
      background: string;
      color: string;
    }
  > = {
    UNPAID: {
      border: "1px solid rgba(251,191,36,0.30)",
      background: "rgba(251,191,36,0.10)",
      color: "#fbbf24",
    },
    REVIEW: {
      border: "1px solid rgba(96,165,250,0.30)",
      background: "rgba(59,130,246,0.10)",
      color: "#bfdbfe",
    },
    PAID: {
      border: "1px solid rgba(52,211,153,0.30)",
      background: "rgba(16,185,129,0.12)",
      color: "#6ee7b7",
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