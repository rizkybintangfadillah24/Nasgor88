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

type CollaborationItem = {
  id: number | string;
  productId?: number | string;
  umkmId?: number | string;
  mahasiswaId?: number | string;
  message?: string | null;
  status: "WAITING" | "APPROVED" | "REJECTED" | "DONE" | string;
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
  offers?: {
    id?: number | string;
    status?: string;
    price?: number | string;
  }[];
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
  if (status === "DONE") return "Selesai";
  return status;
};

const getStatusDescription = (status: string) => {
  if (status === "WAITING") {
    return "Pengajuan kerja sama sudah dikirim dan sedang menunggu persetujuan mahasiswa.";
  }

  if (status === "APPROVED") {
    return "Pengajuan kerja sama sudah disetujui mahasiswa dan dapat berlanjut ke penawaran atau transaksi.";
  }

  if (status === "REJECTED") {
    return "Pengajuan kerja sama ditolak oleh mahasiswa.";
  }

  if (status === "DONE") {
    return "Kerja sama sudah selesai.";
  }

  return "Status kerja sama belum dikenali.";
};

export default function UMKMCollaborationsPage() {
  const router = useRouter();

  const [collaborations, setCollaborations] = useState<CollaborationItem[]>([]);
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
    title = "Informasi Kerja Sama"
  ) => {
    setMessage(text);
    showToast(type, title, text);
  };

  const fetchCollaborations = async (showSuccessToast = false) => {
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

      const response = await fetch(`${API_BASE_URL}/collaborations/my`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showMessage(
          result.message || "Gagal mengambil data kerja sama.",
          "error",
          "Gagal memuat kerja sama"
        );
        return;
      }

      const data = Array.isArray(result.data) ? result.data : [];
      setCollaborations(data);

      if (showSuccessToast) {
        showMessage(
          "Data kerja sama berhasil diperbarui.",
          "success",
          "Data diperbarui"
        );
      }

      if (data.length === 0 && showSuccessToast) {
        showMessage(
          "Belum ada pengajuan kerja sama.",
          "info",
          "Data masih kosong"
        );
      }
    } catch (error) {
      showMessage(
        "Gagal terhubung ke backend saat mengambil kerja sama.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborations(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const waitingCount = collaborations.filter(
    (item) => item.status === "WAITING"
  ).length;

  const approvedCount = collaborations.filter(
    (item) => item.status === "APPROVED"
  ).length;

  const rejectedCount = collaborations.filter(
    (item) => item.status === "REJECTED"
  ).length;

  const doneCount = collaborations.filter((item) => item.status === "DONE")
    .length;

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
            Kerja Sama UMKM
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
            Status Pengajuan Kerja Sama
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
            Pantau pengajuan kerja sama yang dikirim ke mahasiswa. Status
            pengajuan dapat berupa menunggu, disetujui, ditolak, atau selesai.
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
            <HeroMiniCard label="Selesai" value={String(doneCount)} />
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
              title="Daftar Kerja Sama"
              subtitle="Data kerja sama diambil dari pengajuan yang pernah dibuat oleh akun UMKM."
            />

            <button
              type="button"
              onClick={() => fetchCollaborations(true)}
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
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {isLoading ? (
              <EmptyState
                title="Mengambil data kerja sama..."
                description="Mohon tunggu, sistem sedang mengambil data kerja sama milik UMKM."
              />
            ) : collaborations.length === 0 ? (
              <EmptyState
                title="Belum ada pengajuan kerja sama."
                description="Pengajuan kerja sama akan tampil di sini setelah UMKM menekan tombol Ajukan Kerja Sama pada detail produk."
              />
            ) : (
              collaborations.map((item) => (
                <CollaborationCard
                  key={item.id}
                  item={item}
                  onViewProduct={() => {
                    const targetProductId = item.product?.id || item.productId;

                    if (!targetProductId) {
                      showMessage(
                        "ID produk tidak ditemukan pada data kerja sama.",
                        "warning",
                        "Produk tidak valid"
                      );
                      return;
                    }

                    router.push(`/umkm/products/${targetProductId}`);
                  }}
                  onViewOffer={() => {
                    router.push("/umkm/offers");
                  }}
                  onViewTransaction={() => {
                    router.push("/umkm/transactions");
                  }}
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
            title="Alur Setelah Kerja Sama"
            subtitle="Setelah pengajuan disetujui mahasiswa, proses dapat berlanjut ke penawaran, transaksi, pendampingan, dan ulasan."
          />

          <div
            style={{
              marginTop: "20px",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "14px",
            }}
          >
            <FlowCard
              number="1"
              title="Menunggu"
              description="UMKM menunggu mahasiswa menyetujui atau menolak pengajuan kerja sama."
            />
            <FlowCard
              number="2"
              title="Penawaran"
              description="Jika disetujui, mahasiswa dapat mengirim rincian penawaran kerja sama."
            />
            <FlowCard
              number="3"
              title="Transaksi"
              description="UMKM melanjutkan transaksi setelah penawaran disetujui."
            />
            <FlowCard
              number="4"
              title="Pendampingan"
              description="Mahasiswa melakukan pendampingan implementasi produk pada UMKM."
            />
          </div>
        </section>
      </div>
    </>
  );
}

function CollaborationCard({
  item,
  onViewProduct,
  onViewOffer,
  onViewTransaction,
}: {
  item: CollaborationItem;
  onViewProduct: () => void;
  onViewOffer: () => void;
  onViewTransaction: () => void;
}) {
  const studentName =
    item.mahasiswa?.mahasiswaProfile?.fullName ||
    item.mahasiswa?.username ||
    "-";

  const studentContact =
    item.mahasiswa?.mahasiswaProfile?.phone || item.mahasiswa?.email || "-";

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
              <StatusBadge status={item.status} />

              <h3
                style={{
                  marginTop: "14px",
                  fontSize: "24px",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                {item.product?.title || "Produk tidak tersedia"}
              </h3>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#94a3b8",
                }}
              >
                {getStatusDescription(item.status)}
              </p>
            </div>

            <div
              style={{
                textAlign: "right",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 900,
                  color: "#6ee7b7",
                }}
              >
                Tanggal Pengajuan
              </p>

              <p
                style={{
                  marginTop: "6px",
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#ffffff",
                }}
              >
                {formatDate(item.createdAt)}
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
            <InfoMini
              label="Harga Produk"
              value={formatPrice(item.product?.price)}
            />
            <InfoMini
              label="Kategori"
              value={item.product?.category || "-"}
            />
            <InfoMini
              label="Masalah"
              value={item.product?.mainProblem || "-"}
            />
          </div>

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
              Pesan Pengajuan
            </p>

            <p
              style={{
                marginTop: "8px",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#cbd5e1",
              }}
            >
              {item.message || "Tidak ada pesan tambahan dari UMKM."}
            </p>
          </div>

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <button type="button" onClick={onViewProduct} style={primaryButton}>
              Lihat Produk
            </button>

            <button type="button" onClick={onViewOffer} style={secondaryButton}>
              Lihat Penawaran
            </button>

            <button
              type="button"
              onClick={onViewTransaction}
              style={secondaryButton}
            >
              Lihat Transaksi
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
            Mahasiswa Pembuat Produk
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
              value={item.mahasiswa?.mahasiswaProfile?.campus || "-"}
            />
            <InfoMini
              label="Program Studi"
              value={item.mahasiswa?.mahasiswaProfile?.studyProgram || "-"}
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
              {getStatusText(item.status)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    DONE: {
      border: "1px solid rgba(96,165,250,0.30)",
      background: "rgba(59,130,246,0.10)",
      color: "#bfdbfe",
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
          fontSize: "20px",
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