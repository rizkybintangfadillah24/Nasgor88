"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

type AlertType = "success" | "error" | "warning" | "info";

type AlertState = {
  type: AlertType;
  title: string;
  message: string;
};

const collaborationItems: {
  umkm: string;
  product: string;
  price: string;
  status: string;
}[] = [];

const transactionItems: {
  product: string;
  price: string;
  status: string;
}[] = [];

const mentoringItems: {
  product: string;
  schedule: string;
  progress: string;
  note: string;
}[] = [];

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

const valueStyle: CSSProperties = {
  marginTop: "8px",
  fontSize: "17px",
  fontWeight: 900,
  color: "#ffffff",
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

export default function MahasiswaCollaborationsPage() {
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [progressValue, setProgressValue] = useState("");
  const [noteValue, setNoteValue] = useState("");

  const showAlert = (type: AlertType, title: string, message: string) => {
    setAlert({ type, title, message });

    window.setTimeout(() => {
      setAlert(null);
    }, 3500);
  };

  const handleEmptyCollaborationCheck = () => {
    showAlert(
      "info",
      "Belum ada pengajuan",
      "Saat ini belum ada UMKM yang mengajukan kerja sama. Pengajuan akan muncul setelah UMKM memilih produk dan mengirim kerja sama."
    );
  };

  const handleEmptyTransactionCheck = () => {
    showAlert(
      "info",
      "Belum ada transaksi",
      "Transaksi akan muncul setelah kerja sama disetujui dan masuk ke proses pembayaran."
    );
  };

  const handleEmptyMentoringCheck = () => {
    showAlert(
      "info",
      "Belum ada pendampingan",
      "Pendampingan akan muncul setelah kerja sama aktif. Jadwal, progress, dan catatan implementasi akan ditampilkan di bagian ini."
    );
  };

  const handleApproveCollaboration = (productName: string) => {
    showAlert(
      "success",
      "Kerja sama disetujui",
      `Pengajuan kerja sama untuk produk ${productName} berhasil disetujui.`
    );
  };

  const handleRejectCollaboration = (productName: string) => {
    showAlert(
      "warning",
      "Kerja sama ditolak",
      `Pengajuan kerja sama untuk produk ${productName} ditolak.`
    );
  };

  const handleSaveMentoring = (productName: string) => {
    if (!progressValue.trim() && !noteValue.trim()) {
      showAlert(
        "warning",
        "Data belum lengkap",
        "Isi update progress atau catatan terlebih dahulu sebelum menyimpan pendampingan."
      );
      return;
    }

    showAlert(
      "success",
      "Pendampingan disimpan",
      `Progress pendampingan untuk produk ${productName} berhasil disimpan.`
    );

    setProgressValue("");
    setNoteValue("");
  };

  return (
    <>
      <ActionAlert alert={alert} onClose={() => setAlert(null)} />

      <style jsx global>{`
        input::placeholder {
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
            Kerja Sama
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
            Kelola Kerja Sama UMKM
          </h1>

          <p
            style={{
              marginTop: "14px",
              maxWidth: "850px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#cbd5e1",
            }}
          >
            Kelola proses kerja sama mulai dari konfirmasi pengajuan UMKM,
            status pembayaran transaksi, sampai proses pendampingan implementasi
            produk.
          </p>
        </section>

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <SectionHeading
            title="Konfirmasi Kerja Sama"
            subtitle="Menentukan kesepakatan berdasarkan harga produk yang sudah ada di katalog."
          />

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {collaborationItems.length === 0 && (
              <EmptyState
                title="Belum ada pengajuan kerja sama."
                description="Pengajuan dari UMKM akan tampil di sini setelah UMKM memilih produk mahasiswa dan mengajukan kerja sama."
                buttonText="Cek Pengajuan"
                onAction={handleEmptyCollaborationCheck}
              />
            )}

            {collaborationItems.map((item) => (
              <div
                key={`${item.umkm}-${item.product}`}
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
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gap: "18px",
                    alignItems: "start",
                  }}
                >
                  <InfoBlock label="Data UMKM" value={item.umkm} />
                  <InfoBlock label="Nama Produk" value={item.product} />
                  <InfoBlock label="Harga Produk" value={item.price} emerald />
                  <InfoBlock
                    label="Status Kerja Sama"
                    value={item.status}
                    emerald
                  />
                </div>

                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleApproveCollaboration(item.product)}
                    style={{
                      padding: "12px 18px",
                      borderRadius: "14px",
                      border: "none",
                      background: "#10b981",
                      color: "#04130f",
                      fontSize: "14px",
                      fontWeight: 900,
                      cursor: "pointer",
                      boxShadow: "0 10px 24px rgba(16,185,129,0.20)",
                    }}
                  >
                    Setujui
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRejectCollaboration(item.product)}
                    style={{
                      padding: "12px 18px",
                      borderRadius: "14px",
                      border: "1px solid rgba(248,113,113,0.35)",
                      background: "rgba(239,68,68,0.12)",
                      color: "#fecaca",
                      fontSize: "14px",
                      fontWeight: 900,
                      cursor: "pointer",
                    }}
                  >
                    Tolak
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <SectionHeading
            title="Transaksi"
            subtitle="Mengelola pembayaran setelah kerja sama disetujui."
          />

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {transactionItems.length === 0 && (
              <EmptyState
                title="Belum ada transaksi."
                description="Data transaksi akan muncul setelah kerja sama disetujui dan masuk proses pembayaran."
                buttonText="Cek Transaksi"
                onAction={handleEmptyTransactionCheck}
              />
            )}

            {transactionItems.map((item) => (
              <div
                key={`${item.product}-${item.status}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "18px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.035)",
                  padding: "20px",
                }}
              >
                <InfoBlock label="Nama Produk" value={item.product} />
                <InfoBlock label="Harga" value={item.price} emerald />
                <InfoBlock
                  label="Status Pembayaran"
                  value={item.status}
                  emerald
                />
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <SectionHeading
            title="Pendampingan"
            subtitle="Mengatur jadwal, memantau progress implementasi, dan menyimpan catatan selama proses pendampingan."
          />

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {mentoringItems.length === 0 && (
              <EmptyState
                title="Belum ada pendampingan."
                description="Jadwal, progress implementasi, dan catatan pendampingan akan muncul setelah kerja sama aktif."
                buttonText="Cek Pendampingan"
                onAction={handleEmptyMentoringCheck}
              />
            )}

            {mentoringItems.map((item) => (
              <div
                key={`${item.product}-${item.schedule}`}
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
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "18px",
                  }}
                >
                  <InfoBlock label="Nama Produk" value={item.product} />
                  <InfoBlock label="Jadwal" value={item.schedule} emerald />
                  <InfoBlock
                    label="Progress Implementasi"
                    value={item.progress}
                    emerald
                  />
                </div>

                <div
                  style={{
                    marginTop: "20px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.035)",
                    padding: "16px",
                  }}
                >
                  <p style={labelStyle}>Catatan</p>
                  <p
                    style={{
                      marginTop: "8px",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "#cbd5e1",
                    }}
                  >
                    {item.note}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "18px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <input
                    placeholder="Update progress implementasi"
                    value={progressValue}
                    onChange={(event) => setProgressValue(event.target.value)}
                    style={inputStyle}
                  />

                  <input
                    placeholder="Tambahkan catatan"
                    value={noteValue}
                    onChange={(event) => setNoteValue(event.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div
                  style={{
                    marginTop: "18px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleSaveMentoring(item.product)}
                    style={{
                      padding: "13px 20px",
                      borderRadius: "14px",
                      border: "1px solid rgba(52,211,153,0.24)",
                      background: "rgba(16,185,129,0.12)",
                      color: "#6ee7b7",
                      fontSize: "14px",
                      fontWeight: 900,
                      cursor: "pointer",
                    }}
                  >
                    Simpan Pendampingan
                  </button>
                </div>
              </div>
            ))}
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
          ...valueStyle,
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
  buttonText,
  onAction,
}: {
  title: string;
  description: string;
  buttonText?: string;
  onAction?: () => void;
}) {
  return (
    <div
      style={{
        borderRadius: "18px",
        border: "1px dashed rgba(52,211,153,0.24)",
        background: "rgba(16,185,129,0.06)",
        padding: "20px",
      }}
    >
      <p
        style={{
          fontSize: "15px",
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

      {buttonText && onAction && (
        <button
          type="button"
          onClick={onAction}
          style={{
            marginTop: "14px",
            padding: "11px 16px",
            borderRadius: "14px",
            border: "1px solid rgba(52,211,153,0.24)",
            background: "rgba(16,185,129,0.12)",
            color: "#6ee7b7",
            fontSize: "13px",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          {buttonText}
        </button>
      )}
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
