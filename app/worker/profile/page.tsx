"use client";

import WorkerBottomNav from "@/components/WorkerBottomNav";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white p-8">

      <h1 className="text-5xl font-bold mb-10">
        👤 Profil
      </h1>

      <div className="rounded-[30px] border border-zinc-800 bg-[#161616] p-8">

        <div className="flex items-center gap-6">

          <div className="h-24 w-24 rounded-full bg-yellow-400 flex items-center justify-center text-5xl">
            👤
          </div>

          <div>

            <h2 className="text-3xl font-bold">
              {auth.currentUser?.displayName || "Lucrător"}
            </h2>

            <p className="text-zinc-400 mt-2">
              {auth.currentUser?.email}
            </p>

          </div>

        </div>

        <button
          onClick={logout}
          className="mt-10 w-full rounded-2xl bg-red-600 py-4 text-xl font-bold hover:bg-red-500"
        >
          🚪 Deconectare
        </button>

      </div>

<WorkerBottomNav />
    </main>
  );
}