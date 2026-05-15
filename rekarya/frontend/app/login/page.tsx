"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { apiRequest, setToken } from "../../lib/api";

type UserRole = "MAHASISWA" | "UMKM" | "ADMIN";

type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      username: string;
      email: string;
      role: UserRole;
      verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
    };
    token: string;
  };
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const redirectByRole = (role: UserRole) => {
    if (role === "MAHASISWA") {
      router.push("/mahasiswa/dashboard");
      return;
    }

    if (role === "UMKM") {
      router.push("/umkm/dashboard");
      return;
    }

    if (role === "ADMIN") {
      router.push("/admin/dashboard");
      return;
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Email wajib diisi.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Password wajib diisi.");
      return;
    }

    setIsLoading(true);
    setLoadingText("Memverifikasi akun...");

    try {
      const result = await apiRequest<LoginResponse>("/auth/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });

      setToken(result.data.token);
      localStorage.setItem("rekarya_user", JSON.stringify(result.data.user));

      setLoadingText("Login berhasil. Menyiapkan dashboard...");
      await sleep(3000);

      redirectByRole(result.data.user.role);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Login gagal. Coba lagi."
      );
      setLoadingText("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        input::placeholder {
          color: #64748b;
          opacity: 1;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #ffffff;
          -webkit-box-shadow: 0 0 0px 1000px rgba(15, 23, 42, 0.96) inset;
          transition: background-color 9999s ease-in-out 0s;
        }

        @keyframes rekarya-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rekarya-pulse {
          0%,
          100% {
            opacity: 0.55;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      <main className="min-h-screen bg-[#060A18] px-6 py-10 text-white">
        {isLoading && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(2,6,23,0.72)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                width: "360px",
                maxWidth: "calc(100vw - 32px)",
                borderRadius: "24px",
                border: "1px solid rgba(52,211,153,0.24)",
                background:
                  "linear-gradient(180deg, rgba(15,23,42,0.98), rgba(6,12,28,0.98))",
                boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
                padding: "28px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  margin: "0 auto",
                  borderRadius: "999px",
                  border: "4px solid rgba(52,211,153,0.18)",
                  borderTopColor: "#34d399",
                  animation: "rekarya-spin 0.9s linear infinite",
                }}
              />

              <h3
                style={{
                  marginTop: "20px",
                  fontSize: "20px",
                  fontWeight: 900,
                  color: "#ffffff",
                }}
              >
                Mohon tunggu
              </h3>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#cbd5e1",
                  animation: "rekarya-pulse 1.4s ease-in-out infinite",
                }}
              >
                {loadingText || "Memproses login..."}
              </p>
            </div>
          </div>
        )}

        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
          <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-emerald-950/30 lg:grid-cols-2">
            <section className="relative hidden bg-emerald-400 p-10 text-slate-950 lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_35%)]" />

              <div className="relative flex h-full flex-col justify-between">
                <Link href="/" className="text-3xl font-black">
                  ReKarya
                </Link>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em]">
                    Login System
                  </p>

                  <h1 className="mt-4 text-5xl font-black leading-tight">
                    Masuk dan lanjutkan proses kolaborasi.
                  </h1>

                  <p className="mt-6 text-base leading-7 text-slate-800">
                    Mahasiswa masuk ke dashboard produk, UMKM masuk ke pencarian
                    solusi, dan admin masuk ke dashboard monitoring.
                  </p>
                </div>

                <p className="text-sm font-semibold">
                  ReKarya Match • Katalog Terverifikasi • UMKM Digital
                </p>
              </div>
            </section>

            <section className="p-8 md:p-12">
              <Link
                href="/"
                className="mb-8 inline-flex text-sm font-semibold text-emerald-300 hover:text-emerald-200"
              >
                ← Kembali ke Home
              </Link>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                  Login
                </p>

                <h2 className="mt-3 text-3xl font-black">Masuk ke Akun</h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Gunakan email dan password yang sudah terdaftar.
                </p>
              </div>

              {errorMessage && (
                <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm font-semibold leading-6 text-red-200">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <div>
                  <label className="text-sm font-semibold text-slate-300">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="contoh: mahasiswa@gmail.com"
                    autoComplete="email"
                    disabled={isLoading}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                    required
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Masukkan email yang dipakai saat registrasi akun ReKarya.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Masukkan password akun"
                    autoComplete="current-password"
                    disabled={isLoading}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                    required
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Gunakan password yang sudah didaftarkan. Umumnya minimal 8
                    karakter.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-400 px-5 py-3 font-black text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading && (
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "999px",
                        border: "3px solid rgba(2,6,23,0.25)",
                        borderTopColor: "#020617",
                        animation: "rekarya-spin 0.8s linear infinite",
                      }}
                    />
                  )}

                  {isLoading ? "Memproses..." : "Login"}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400">
                Belum punya akun?{" "}
                <Link
                  href="/register"
                  className="font-bold text-emerald-300 hover:text-emerald-200"
                >
                  Register di sini
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}