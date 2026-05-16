"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CSSProperties } from "react";

type AlertType = "success" | "error" | "warning" | "info";

type ToastState = {
  type: AlertType;
  title: string;
  message: string;
};

type SearchForm = {
  keyword: string;
  mainProblem: string;
  problemDetail: string;
  budgetMin: string;
  budgetMax: string;
  trainingDuration: string;
  mentoringMethod: string;
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
  display: "block",
  marginBottom: "8px",
  fontSize: "13px",
  fontWeight: 800,
  color: "#cbd5e1",
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
  minHeight: "150px",
  resize: "vertical",
  lineHeight: 1.7,
};

const selectStyle: CSSProperties = {
  ...inputStyle,
};

export default function UMKMSearchPage() {
  const router = useRouter();

  const [form, setForm] = useState<SearchForm>({
    keyword: "",
    mainProblem: "",
    problemDetail: "",
    budgetMin: "200000",
    budgetMax: "250000",
    trainingDuration: "",
    mentoringMethod: "",
  });

  const [isSearching, setIsSearching] = useState(false);
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
    title = "Informasi Pencarian"
  ) => {
    setMessage(text);
    showToast(type, title, text);
  };

  const handleChange = (key: keyof SearchForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateSearchForm = () => {
    if (!form.mainProblem) return "Masalah utama wajib dipilih.";
    if (!form.problemDetail.trim()) return "Detail masalah wajib diisi.";
    if (!form.budgetMin.trim()) return "Budget minimal wajib diisi.";
    if (!form.budgetMax.trim()) return "Budget maksimal wajib diisi.";
    if (!form.trainingDuration) return "Estimasi durasi pelatihan wajib dipilih.";
    if (!form.mentoringMethod) return "Metode pendampingan wajib dipilih.";

    const budgetMin = Number(form.budgetMin);
    const budgetMax = Number(form.budgetMax);

    if (Number.isNaN(budgetMin) || budgetMin < 0) {
      return "Budget minimal harus berupa angka valid.";
    }

    if (Number.isNaN(budgetMax) || budgetMax <= 0) {
      return "Budget maksimal harus berupa angka lebih dari 0.";
    }

    if (budgetMax < budgetMin) {
      return "Budget maksimal tidak boleh lebih kecil dari budget minimal.";
    }

    return "";
  };

  const handleSearchSolution = async () => {
    try {
      setIsSearching(true);
      setMessage("");

      const validationMessage = validateSearchForm();

      if (validationMessage) {
        showMessage(validationMessage, "warning", "Data belum lengkap");
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

      const response = await fetch(`${API_BASE_URL}/matches/recommendations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          keyword: form.keyword,
          mainProblem: form.mainProblem,
          problemDetail: form.problemDetail,
          budgetMin: Number(form.budgetMin),
          budgetMax: Number(form.budgetMax),
          trainingDuration: Number(form.trainingDuration),
          mentoringMethod: form.mentoringMethod,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showMessage(
          result.message || "Gagal mencari rekomendasi produk.",
          "error",
          "Pencarian gagal"
        );
        return;
      }

      const recommendations = Array.isArray(result.data) ? result.data : [];

      localStorage.setItem(
        "rekarya_umkm_search_query",
        JSON.stringify({
          keyword: form.keyword,
          mainProblem: form.mainProblem,
          problemDetail: form.problemDetail,
          budgetMin: form.budgetMin,
          budgetMax: form.budgetMax,
          trainingDuration: form.trainingDuration,
          mentoringMethod: form.mentoringMethod,
        })
      );

      localStorage.setItem(
        "rekarya_umkm_recommendations",
        JSON.stringify(recommendations)
      );

      if (recommendations.length === 0) {
        showMessage(
          "Belum ada produk approved yang cocok dengan kebutuhan usaha ini.",
          "info",
          "Belum ada rekomendasi"
        );
        return;
      }

      showMessage(
        `Ditemukan ${recommendations.length} rekomendasi produk tugas akhir.`,
        "success",
        "Rekomendasi ditemukan"
      );

      window.setTimeout(() => {
        router.push("/umkm/recommendations");
      }, 900);
    } catch (error) {
      showMessage(
        "Gagal terhubung ke backend saat mencari solusi.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <ToastAlert alert={toast} onClose={() => setToast(null)} />

      <style jsx global>{`
        input::placeholder,
        textarea::placeholder {
          color: #64748b;
          opacity: 1;
        }

        select option {
          background: #0f172a;
          color: #ffffff;
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
            Cari Solusi
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
            Pencarian Produk ReKarya Match
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
            Masukkan kebutuhan usaha, masalah utama, range harga, estimasi
            durasi pelatihan, dan metode pendampingan. Sistem akan mencari
            produk tugas akhir mahasiswa yang sudah approved dan mengurutkannya
            berdasarkan skor kecocokan.
          </p>

          <div
            style={{
              marginTop: "24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "14px",
            }}
          >
            <HeroMiniCard label="Fokus" value="Pencarian Produk" />
            <HeroMiniCard label="Sumber Data" value="Produk Approved" />
            <HeroMiniCard label="Output" value="Match Score + Alasan" />
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
            title="Form Kebutuhan Usaha"
            subtitle="Isi filter kebutuhan usaha untuk mendapatkan hasil rekomendasi produk tugas akhir mahasiswa."
          />

          <div
            style={{
              marginTop: "22px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px 16px",
            }}
          >
            <SelectField
              label="Keyword Bidang Usaha"
              value={form.keyword}
              onChange={(val) => handleChange("keyword", val)}
              options={[
                "Pilih keyword bidang usaha",
                "Kuliner",
                "Retail Toko",
                "Jasa",
                "Fashion",
                "Pertanian",
                "UMKM",
              ]}
            />

            <SelectField
              label="Masalah Utama"
              value={form.mainProblem}
              onChange={(val) => handleChange("mainProblem", val)}
              options={[
                "Pilih masalah utama",
                "Pemasaran Digital Lemah",
                "Penjualan Belum Online",
                "Pencatatan Keuangan Manual",
                "Stok Tidak Tertata",
                "Operasional Tidak Efisien",
                "Analisis Berbasis Data",
              ]}
            />

            <InputField
              label="Budget Minimal"
              type="number"
              placeholder="Contoh: 200000"
              value={form.budgetMin}
              onChange={(val) => handleChange("budgetMin", val)}
            />

            <InputField
              label="Budget Maksimal"
              type="number"
              placeholder="Contoh: 250000"
              value={form.budgetMax}
              onChange={(val) => handleChange("budgetMax", val)}
            />

            <SelectField
              label="Estimasi Durasi Pelatihan"
              value={form.trainingDuration}
              onChange={(val) => handleChange("trainingDuration", val)}
              options={["Pilih durasi pelatihan", "7", "10","14"]}
              suffix=" Hari"
            />

            <SelectField
              label="Metode Pendampingan"
              value={form.mentoringMethod}
              onChange={(val) => handleChange("mentoringMethod", val)}
              options={["Pilih metode pendampingan", "Online", "Offline", "Hybrid"]}
            />
          </div>

          <div style={{ marginTop: "18px" }}>
            <label style={labelStyle}>Detail Masalah</label>

            <textarea
              style={textareaStyle}
              placeholder="Contoh: Penjualan belum online, belum memiliki website atau toko digital, belum berjualan di marketplace, tidak memiliki sistem pemesanan online, serta kesulitan mengelola pesanan secara digital."
              value={form.problemDetail}
              onChange={(event) =>
                handleChange("problemDetail", event.target.value)
              }
            />
          </div>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              onClick={handleSearchSolution}
              disabled={isSearching}
              style={{
                padding: "14px 24px",
                borderRadius: "14px",
                border: "none",
                background: isSearching ? "#065f46" : "#10b981",
                color: "#04130f",
                fontSize: "14px",
                fontWeight: 900,
                cursor: isSearching ? "not-allowed" : "pointer",
                boxShadow: "0 10px 24px rgba(16,185,129,0.24)",
              }}
            >
              {isSearching ? "Mencari solusi..." : "Cari Solusi"}
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
            title="Catatan Pencarian"
            subtitle="Pencarian ini mengikuti kebutuhan fitur UMKM dan endpoint ReKarya Match."
          />

          <div
            style={{
              marginTop: "20px",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "14px",
            }}
          >
            <InfoCard
              title="Keyword"
              description="Keyword bidang usaha bersifat opsional. Jika tidak diisi, pencarian tetap memakai masalah utama dan kebutuhan usaha."
            />

            <InfoCard
              title="Range Harga"
              description="Budget minimal dan maksimal dipakai untuk mencocokkan harga produk tugas akhir mahasiswa."
            />

            <InfoCard
              title="Hasil"
              description="Hasil rekomendasi akan disimpan sementara lalu ditampilkan pada halaman Rekomendasi."
            />
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

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>

      <input
        type={type}
        style={inputStyle}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  suffix = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  suffix?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>

      <select
        style={{
          ...selectStyle,
          color: value ? "#ffffff" : "#94a3b8",
        }}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option, index) => (
          <option key={option} value={index === 0 ? "" : option}>
            {index === 0 ? option : `${option}${suffix}`}
          </option>
        ))}
      </select>
    </div>
  );
}

function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
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