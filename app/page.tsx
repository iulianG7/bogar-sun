"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(true);
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) return;

    if (user.email === "admin@bogarsun.com") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/worker/dashboard");
    }
  });

  return () => unsubscribe();
}, [router]);

  async function login() {
    setLoading(true);
    setError("");

    try {

      await setPersistence(
        auth,
        rememberMe
          ? browserLocalPersistence
          : browserSessionPersistence
      );

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const userEmail =
        userCredential.user.email;

      if (
        userEmail ===
        "admin@bogarsun.com"
      ) {
        router.push("/admin/dashboard");
      } else {
        router.push("/worker/dashboard");
      }

    } catch (e) {
      setError(
        "Email sau parola sunt greșite."
      );
    }

    setLoading(false);
  }

  return (

<main

className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-8"

style={{
backgroundImage:"url('/temp.png')",
backgroundSize:"cover",
backgroundPosition:"center",
}}

>

<div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />

<div className="relative w-full max-w-sm rounded-[38px] border border-white/15 bg-black/45 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,.65)] p-8">

<div className="flex justify-center">

<Image

src="/logo.png"

alt="Bogar Sun"

width={170}

height={170}

priority

className="w-36 h-auto"

/>

</div>

<h1 className="mt-2 text-center text-4xl font-black text-white">

Bun venit!

</h1>

<p className="mt-2 text-center text-zinc-300">

Autentifică-te pentru a continua

</p>
<div className="relative mt-8">

  <Mail
    size={22}
    className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400"
  />

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="h-16 w-full rounded-2xl border border-zinc-700 bg-black/30 pl-14 pr-5 text-lg text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none transition"
  />

</div>

<div className="relative mt-5">

  <Lock
    size={22}
    className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400"
  >

    {showPassword ? (
      <EyeOff size={22} />
    ) : (
      <Eye size={22} />
    )}

  </button>

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Parolă"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="h-16 w-full rounded-2xl border border-zinc-700 bg-black/30 pl-14 pr-14 text-lg text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none transition"
  />

</div>

<div className="mt-5 flex items-center justify-between">

  <label className="flex items-center gap-3 text-zinc-300 cursor-pointer">

    <input
      type="checkbox"
      checked={rememberMe}
      onChange={(e) => setRememberMe(e.target.checked)}
      className="h-5 w-5 accent-yellow-400"
    />

    <span>Ține-mă minte</span>

  </label>

</div>

{error && (

<p className="mt-5 text-center text-red-400">

{error}

</p>

)}
<button
  onClick={login}
  disabled={loading}
  className="mt-8 h-16 w-full rounded-2xl bg-yellow-400 text-xl font-black text-black shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:scale-[1.02] hover:bg-yellow-300 disabled:opacity-60"
>
  {loading ? "Se autentifică..." : "Intră în cont"}
</button>

<div className="mt-8 flex items-center">

  <div className="h-px flex-1 bg-zinc-700" />

  <span className="px-4 text-sm text-zinc-500">
    BOGAR SUN
  </span>

  <div className="h-px flex-1 bg-zinc-700" />

</div>

<p className="mt-6 text-center text-sm text-zinc-400">
  Solar Management System
</p>

<p className="mt-2 text-center text-xs text-zinc-500">
  © 2026 Bogar Sun. Toate drepturile rezervate.
</p>

</div>

</main>
  )
}
