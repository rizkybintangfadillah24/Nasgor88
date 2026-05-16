"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type AlertType = "success" | "error" | "warning" | "info";

type ToastState = {
  type: AlertType;
  title: string;
  message: string;
};

type UMKMProfileForm = {
  ownerName: string;
  businessName: string;
  businessType: string;
  description: string;
  address: string;
  phone: string;
  mainProblem: string;
  specificNeeds: string;
  budgetMin: string;
  budgetMax: string;
  targetDuration: string;
  mentoringPreference: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
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
  minHeight: "130px",
  resize: "vertical",
  lineHeight: 1.7,
};

const selectStyle: CSSProperties = {
  ...inputStyle,
};

export default function UMKMProfilePage() {
  const [form, setForm] = useState<UMKMProfileForm>({
    ownerName: "",
    businessName: "",
    businessType: "",
    description: "",
    address: "",
    phone: "",
    mainProblem: "",
    specificNeeds: "",
    budgetMin: "",
    budgetMax: "",
    targetDuration: "",
    mentoringPreference: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
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

  const showProfileMessage = (
    text: string,
    type: AlertType = "info",
    title = "Informasi Profil"
  ) => {
    setProfileMessage(text);
    showToast(type, title, text);
  };

  const showPasswordMessage = (
    text: string,
    type: AlertType = "info",
    title = "Informasi Password"
  ) => {
    setPasswordMessage(text);
    showToast(type, title, text);
  };

  const handleChange = (key: keyof UMKMProfileForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const fetchProfile = async () => {
    try {
      setIsLoadingProfile(true);

      const token = getAuthToken();

      if (!token) {
        showProfileMessage(
          "Token tidak ditemukan. Silakan login ulang.",
          "error",
          "Akses ditolak"
        );
        return;
      }

      const response = await fetch(`${API_BASE_URL}/umkm/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showProfileMessage(
          result.message || "Gagal mengambil profil UMKM.",
          "error",
          "Gagal memuat profil"
        );
        return;
      }

      const profile = result.data || {};

      setForm((prev) => ({
        ...prev,
        ownerName: profile.ownerName || "",
        businessName: profile.businessName || "",
        businessType: profile.businessType || "",
        description: profile.description || "",
        address: profile.address || "",
        phone: profile.phone || "",
        mainProblem: profile.mainProblem || "",
        specificNeeds: profile.specificNeeds || "",
        budgetMin:
          profile.budgetMin === null || profile.budgetMin === undefined
            ? ""
            : String(profile.budgetMin),
        budgetMax:
          profile.budgetMax === null || profile.budgetMax === undefined
            ? ""
            : String(profile.budgetMax),
        targetDuration:
          profile.targetDuration === null || profile.targetDuration === undefined
            ? ""
            : String(profile.targetDuration),
        mentoringPreference: profile.mentoringPreference || "",
      }));
    } catch (error) {
      showProfileMessage(
        "Gagal terhubung ke backend saat mengambil profil UMKM.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const validateProfileForm = () => {
    if (!form.ownerName.trim()) return "Nama pemilik usaha wajib diisi.";
    if (!form.businessName.trim()) return "Nama usaha wajib diisi.";
    if (!form.businessType) return "Jenis usaha wajib dipilih.";
    if (!form.description.trim()) return "Deskripsi usaha wajib diisi.";
    if (!form.address.trim()) return "Alamat usaha wajib diisi.";
    if (!form.phone.trim()) return "Nomor kontak wajib diisi.";
    if (!form.mainProblem) return "Masalah utama wajib dipilih.";
    if (!form.specificNeeds.trim()) return "Kebutuhan spesifik wajib diisi.";
    if (!form.budgetMin.trim()) return "Budget minimal wajib diisi.";
    if (!form.budgetMax.trim()) return "Budget maksimal wajib diisi.";
    if (!form.targetDuration) return "Target durasi wajib dipilih.";
    if (!form.mentoringPreference)
      return "Preferensi pendampingan wajib dipilih.";

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

  const handleSaveProfile = async () => {
    try {
      setIsSavingProfile(true);
      setProfileMessage("");

      const validationMessage = validateProfileForm();

      if (validationMessage) {
        showProfileMessage(validationMessage, "warning", "Data belum lengkap");
        return;
      }

      const token = getAuthToken();

      if (!token) {
        showProfileMessage(
          "Token tidak ditemukan. Silakan login ulang.",
          "error",
          "Akses ditolak"
        );
        return;
      }

      const response = await fetch(`${API_BASE_URL}/umkm/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ownerName: form.ownerName,
          businessName: form.businessName,
          businessType: form.businessType,
          description: form.description,
          address: form.address,
          phone: form.phone,
          mainProblem: form.mainProblem,
          specificNeeds: form.specificNeeds,
          budgetMin: Number(form.budgetMin),
          budgetMax: Number(form.budgetMax),
          targetDuration: Number(form.targetDuration),
          mentoringPreference: form.mentoringPreference,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showProfileMessage(
          result.message || "Gagal menyimpan profil UMKM.",
          "error",
          "Gagal menyimpan"
        );
        return;
      }

      showProfileMessage(
        "Profil UMKM berhasil diperbarui.",
        "success",
        "Profil berhasil"
      );

      await fetchProfile();
    } catch (error) {
      showProfileMessage(
        "Gagal terhubung ke backend saat menyimpan profil UMKM.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSavePassword = async () => {
    try {
      setIsSavingPassword(true);
      setPasswordMessage("");

      const token = getAuthToken();

      if (!token) {
        showPasswordMessage(
          "Token tidak ditemukan. Silakan login ulang.",
          "error",
          "Akses ditolak"
        );
        return;
      }

      if (!form.oldPassword || !form.newPassword || !form.confirmNewPassword) {
        showPasswordMessage(
          "Semua field password wajib diisi.",
          "warning",
          "Data belum lengkap"
        );
        return;
      }

      if (form.newPassword.length < 6) {
        showPasswordMessage(
          "Password baru minimal 6 karakter.",
          "warning",
          "Password terlalu pendek"
        );
        return;
      }

      if (form.newPassword !== form.confirmNewPassword) {
        showPasswordMessage(
          "Password baru dan konfirmasi password tidak sama.",
          "warning",
          "Konfirmasi tidak cocok"
        );
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
          confirmNewPassword: form.confirmNewPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showPasswordMessage(
          result.message || "Gagal mengubah password.",
          "error",
          "Gagal mengubah password"
        );
        return;
      }

      showPasswordMessage(
        "Password berhasil diubah.",
        "success",
        "Password berhasil"
      );

      setForm((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
    } catch (error) {
      showPasswordMessage(
        "Gagal terhubung ke backend saat mengubah password.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsSavingPassword(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            Profil UMKM
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
            Kelola Profil Usaha
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
            Lengkapi data usaha agar sistem ReKarya dapat memberikan
            rekomendasi produk tugas akhir yang lebih sesuai dengan kebutuhan
            digital UMKM.
          </p>
        </section>

        <section
          style={{
            ...cardStyle,
            padding: "18px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#6ee7b7",
              }}
            >
              Status Profil
            </p>

            <p
              style={{
                marginTop: "8px",
                fontSize: "15px",
                color: "#cbd5e1",
              }}
            >
              {isLoadingProfile
                ? "Mengambil data profil UMKM..."
                : "Profil usaha dipakai untuk memperkuat hasil pencarian solusi dan rekomendasi produk."}
            </p>
          </div>

          <div
            style={{
              padding: "12px 16px",
              borderRadius: "14px",
              border: "1px solid rgba(52,211,153,0.24)",
              background: "rgba(16,185,129,0.10)",
              color: "#6ee7b7",
              fontSize: "14px",
              fontWeight: 900,
              whiteSpace: "nowrap",
            }}
          >
            Data UMKM
          </div>
        </section>

        {profileMessage && <MessageBox message={profileMessage} />}

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <SectionHeading
            title="Data Usaha"
            subtitle="Informasi utama yang menjelaskan identitas dan kondisi usaha."
          />

          <div
            style={{
              marginTop: "20px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px 16px",
            }}
          >
            <InputField
              label="Nama Pemilik Usaha"
              placeholder="Contoh: Rizki Bintang"
              value={form.ownerName}
              onChange={(val) => handleChange("ownerName", val)}
            />

            <InputField
              label="Nama Usaha"
              placeholder="Contoh: Kedai Kopi Bintang"
              value={form.businessName}
              onChange={(val) => handleChange("businessName", val)}
            />

            <SelectField
              label="Jenis Usaha"
              value={form.businessType}
              onChange={(val) => handleChange("businessType", val)}
              options={[
                "Pilih jenis usaha",
                "Kuliner",
                "Retail Toko",
                "Fashion",
                "Pertanian",
                "UMKM",
                "Jasa",
              ]}
            />

            <InputField
              label="Nomor Kontak"
              placeholder="Contoh: 0812345678"
              value={form.phone}
              onChange={(val) => handleChange("phone", val)}
            />
          </div>

          <div style={{ marginTop: "18px" }}>
            <label style={labelStyle}>Deskripsi Usaha</label>
            <textarea
              style={textareaStyle}
              placeholder="Jelaskan jenis usaha, produk atau layanan yang dijual, dan kondisi usaha saat ini."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div style={{ marginTop: "18px" }}>
            <label style={labelStyle}>Alamat Usaha</label>
            <textarea
              style={{
                ...textareaStyle,
                minHeight: "100px",
              }}
              placeholder="Contoh: Jl. Soekarno Hatta No. 10, Bandar Lampung"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
        </section>

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <SectionHeading
            title="Kebutuhan Digital UMKM"
            subtitle="Data ini menjadi dasar pencarian solusi dan rekomendasi ReKarya Match."
          />

          <div
            style={{
              marginTop: "20px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px 16px",
            }}
          >
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

            <SelectField
              label="Preferensi Pendampingan"
              value={form.mentoringPreference}
              onChange={(val) => handleChange("mentoringPreference", val)}
              options={[
                "Pilih preferensi pendampingan",
                "Online",
                "Offline",
                "Hybrid",
              ]}
            />

            <InputField
              label="Budget Minimal"
              placeholder="Contoh: 200000"
              type="number"
              value={form.budgetMin}
              onChange={(val) => handleChange("budgetMin", val)}
            />

            <InputField
              label="Budget Maksimal"
              placeholder="Contoh: 250000"
              type="number"
              value={form.budgetMax}
              onChange={(val) => handleChange("budgetMax", val)}
            />

            <SelectField
              label="Target Durasi Pelatihan"
              value={form.targetDuration}
              onChange={(val) => handleChange("targetDuration", val)}
              options={["Pilih target durasi", "7", "10", "14"]}
              suffix=" Hari"
            />
          </div>

          <div style={{ marginTop: "18px" }}>
            <label style={labelStyle}>Kebutuhan Spesifik</label>
            <textarea
              style={textareaStyle}
              placeholder="Contoh: Belum memiliki website atau toko digital, belum berjualan di marketplace, tidak memiliki sistem pemesanan online, dan kesulitan mengelola pesanan secara digital."
              value={form.specificNeeds}
              onChange={(e) => handleChange("specificNeeds", e.target.value)}
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
              onClick={handleSaveProfile}
              disabled={isSavingProfile}
              style={{
                padding: "14px 22px",
                borderRadius: "14px",
                border: "none",
                background: isSavingProfile ? "#065f46" : "#10b981",
                color: "#04130f",
                fontSize: "14px",
                fontWeight: 900,
                cursor: isSavingProfile ? "not-allowed" : "pointer",
                boxShadow: "0 10px 24px rgba(16,185,129,0.24)",
              }}
            >
              {isSavingProfile ? "Menyimpan..." : "Simpan Profil UMKM"}
            </button>
          </div>
        </section>

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <SectionHeading title="Akun" subtitle="Ubah password akun UMKM." />

          {passwordMessage && <MessageBox message={passwordMessage} />}

          <div
            style={{
              marginTop: "18px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              padding: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "22px",
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              Ubah Password
            </h3>

            <p
              style={{
                marginTop: "6px",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#94a3b8",
              }}
            >
              Gunakan password yang aman untuk menjaga akun UMKM.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "16px",
                marginTop: "20px",
              }}
            >
              <InputField
                label="Password Lama"
                type="password"
                placeholder="Masukkan password lama"
                value={form.oldPassword}
                onChange={(val) => handleChange("oldPassword", val)}
              />

              <InputField
                label="Password Baru"
                type="password"
                placeholder="Minimal 6 karakter"
                value={form.newPassword}
                onChange={(val) => handleChange("newPassword", val)}
              />

              <InputField
                label="Ulangi Password Baru"
                type="password"
                placeholder="Ulangi password baru"
                value={form.confirmNewPassword}
                onChange={(val) => handleChange("confirmNewPassword", val)}
              />
            </div>

            <div
              style={{
                marginTop: "22px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                onClick={handleSavePassword}
                disabled={isSavingPassword}
                style={{
                  padding: "14px 22px",
                  borderRadius: "14px",
                  border: "1px solid rgba(52,211,153,0.24)",
                  background: "rgba(16,185,129,0.12)",
                  color: "#6ee7b7",
                  fontSize: "14px",
                  fontWeight: 900,
                  cursor: isSavingPassword ? "not-allowed" : "pointer",
                }}
              >
                {isSavingPassword ? "Menyimpan..." : "Simpan Password"}
              </button>
            </div>
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
        onChange={(e) => onChange(e.target.value)}
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
        onChange={(e) => onChange(e.target.value)}
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

function MessageBox({ message }: { message: string }) {
  const isSuccess =
    message.toLowerCase().includes("berhasil") ||
    message.toLowerCase().includes("diperbarui") ||
    message.toLowerCase().includes("diubah");

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