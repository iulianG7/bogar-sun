"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login() {
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userEmail = userCredential.user.email;

      if (userEmail === "admin@bogarsun.com") {
        router.push("/admin/dashboard");
      } else {
        router.push("/worker/dashboard");
      }
    } catch (error) {
      setError("Email sau parola sunt greșite.");
    }

    setLoading(false);
  }

  return (
    <main
  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-6"
  style={{
    backgroundImage: "url('/temp.png')",
  }}
>
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-black/55 backdrop-blur-xl p-8 shadow-2xl">

        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Bogar Sun"
            width={220}
            height={220}
            priority
          />
        </div>

        <h1 className="text-4xl font-extrabold text-center text-white">
          Bun venit!
        </h1>

        <p className="text-center text-zinc-400 mt-2">
          Autentifică-te pentru a continua
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-8 w-full rounded-xl border border-zinc-600 bg-black/40 p-4 text-white placeholder-zinc-400 focus:border-yellow-400 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Parolă"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full rounded-xl border border-zinc-700 bg-black p-4 text-white"
        />
        {error && (
          <p className="mt-4 text-center text-red-500">
            {error}
          </p>
        )}

        <button
          onClick={login}
          disabled={loading}
          className="mt-8 w-full rounded-2xl bg-yellow-400 py-4 text-xl font-bold text-black transition-all duration-300 hover:bg-yellow-300 hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? "Se autentifică..." : "Intră în cont"}
        </button>

      </div>
    </main>
  );
}