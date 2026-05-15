"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { apiRequest, setToken } from "../../lib/api";

type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      username: string;
      email: string;
      role: "MAHASISWA" | "UMKM" | "ADMIN";
      verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
    };
    token: string;
  };
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("mahasiswa1@gmail.com");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const redirectByRole = (role: "MAHASISWA" | "UMKM" | "ADMIN") => {
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
    setIsLoading(true);

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

      redirectByRole(result.data.user.role);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Login gagal. Coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060A18] px-6 py-10 text-white">
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
              <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
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
                  placeholder="mahasiswa1@gmail.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-300">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="password123"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-emerald-400 px-5 py-3 font-black text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
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
  );
}