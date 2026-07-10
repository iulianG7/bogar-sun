"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

export default function DeleteWorkersPage() {
  const router = useRouter();

  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [workers, setWorkers] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "workers"),
      (snapshot) => {
        setWorkers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredWorkers = workers.filter(
    (worker) => worker.team === selectedTeam
  );
  return (
  <main className="min-h-screen bg-black text-white p-8">

    <h1 className="text-4xl font-bold text-red-500 mb-8">
      🗑️ Șterge lucrător
    </h1>

    {selectedTeam === null ? (
      <div className="space-y-5">

        <button
          onClick={() => setSelectedTeam(1)}
          className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 text-left hover:border-red-500"
        >
          👷 Echipa 1
        </button>

        <button
          onClick={() => setSelectedTeam(2)}
          className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 text-left hover:border-red-500"
        >
          👷 Echipa 2
        </button>

      </div>
    ) : (
      <div className="space-y-4">

        <button
          onClick={() => setSelectedTeam(null)}
          className="rounded-xl bg-zinc-800 px-4 py-2"
        >
          ← Înapoi
        </button>

        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            onClick={() => router.push(`/admin/workers/delete/${worker.id}`)}
            className="cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-5 hover:border-red-500"
          >
            <h2 className="text-2xl font-bold text-red-400">
              {worker.name}
            </h2>

            <p className="text-zinc-400">
              Echipa {worker.team}
            </p>

          </div>
        ))}

      </div>
    )}

  </main>
);
}