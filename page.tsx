"use client";

import { Loader2, Lock, Mail, Store, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Email dan password wajib diisi.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: name.trim() || undefined },
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Akun berhasil dibuat! Silakan masuk.");
      router.push("/login");
    } catch {
      toast.error("Gagal mendaftar. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#F5F3EE] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-700/25">
            <Store className="size-7" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-900">Buat Akun</h1>
          <p className="mt-1.5 text-sm text-stone-500">Daftar gratis untuk mulai mencatat tokomu</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_-12px_rgba(28,25,23,0.12)] ring-1 ring-stone-200/80 sm:p-8"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-[13px] font-bold text-stone-700">
                Nama (opsional)
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama toko / pemilik"
                  className="h-12 w-full rounded-xl border border-stone-200 bg-stone-50/50 pl-10 pr-4 text-sm font-medium text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-[13px] font-bold text-stone-700">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="h-12 w-full rounded-xl border border-stone-200 bg-stone-50/50 pl-10 pr-4 text-sm font-medium text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-[13px] font-bold text-stone-700">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="h-12 w-full rounded-xl border border-stone-200 bg-stone-50/50 pl-10 pr-4 text-sm font-medium text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  required
                  minLength={6}
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="mt-6 w-full h-12 text-[15px]">
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Memproses…
              </>
            ) : (
              "Daftar"
            )}
          </Button>

          <p className="mt-5 text-center text-sm text-stone-500">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-bold text-emerald-700 hover:underline">
              Masuk
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
