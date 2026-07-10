"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
} from "firebase/firestore";

export default function DeleteWorkerPage() {
  const { id } = useParams();
  const router = useRouter();

  const [worker, setWorker] = useState<any>(null);

  useEffect(() => {
    loadWorker();
  }, [id]);

  async function loadWorker() {
    const snap = await getDoc(doc(db, "workers", id as string));

    if (snap.exists()) {
      setWorker({
        id: snap.id,
        ...snap.data(),
      });
    }
  }

  async function deleteWorker() {
  const response = await fetch("/api/delete-worker", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: worker.uid,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    alert(data.message);
    return;
  }

  alert("✅ Lucrător șters cu succes!");

  router.push("/admin/workers");
}

  if (!worker) return <main className="p-8 text-white">Se încarcă...</main>;

  return (
  <main className="min-h-screen bg-black text-white p-8">

    <h1 className="text-4xl font-bold text-red-500 mb-8">
      🗑️ Șterge lucrător
    </h1>

    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-3">

      <h2 className="text-3xl font-bold text-yellow-400">
        👤 {worker.name}
      </h2>

      <p>📞 {worker.phone}</p>

      <p>📧 {worker.email}</p>

      <p>👥 Echipa {worker.team}</p>

      <div className="border-t border-zinc-700 pt-6 mt-6">

        <p className="text-red-400 mb-5">
          ⚠️ Această acțiune este definitivă și nu poate fi anulată.
        </p>

        <div className="flex gap-4">

          <button
            onClick={deleteWorker}
            className="rounded-xl bg-red-600 px-6 py-3 font-bold hover:bg-red-500"
          >
            🗑️ Șterge definitiv
          </button>

          <button
            onClick={() => router.push("/admin/workers/delete")}
            className="rounded-xl bg-zinc-700 px-6 py-3 font-bold hover:bg-zinc-600"
          >
            ← Anulează
          </button>

        </div>

      </div>

    </div>

  </main>
);
}