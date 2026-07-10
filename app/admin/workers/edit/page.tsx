"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function EditWorkersPage() {
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
const router = useRouter();
  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold text-yellow-400 mb-10">
        ✏️ Editează lucrător
      </h1>

      <p className="text-zinc-400 mb-8">
        Alege echipa
      </p>

      <div className="space-y-5">

        {selectedTeam === null ? (

  <div className="space-y-5">

    <button
      onClick={() => setSelectedTeam(1)}
      className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left hover:border-yellow-400 transition"
    >
      <h2 className="text-2xl font-bold">
        👷 Echipa 1
      </h2>
    </button>

    <button
      onClick={() => setSelectedTeam(2)}
      className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left hover:border-yellow-400 transition"
    >
      <h2 className="text-2xl font-bold">
        👷 Echipa 2
      </h2>
    </button>

  </div>

) : (

  <div className="space-y-4">

    <button
      onClick={() => setSelectedTeam(null)}
      className="rounded-xl bg-zinc-800 px-5 py-2"
    >
      ← Înapoi
    </button>

    {filteredWorkers.map((worker) => (

      <div
  key={worker.id}
  onClick={() => router.push(`/admin/workers/edit/${worker.id}`)}
  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 cursor-pointer hover:border-yellow-400 transition"
>
        <h2 className="text-2xl font-bold text-yellow-400">
          👤 {worker.name}
        </h2>

        <p className="text-zinc-400 mt-2">
          Echipa {worker.team}
        </p>

      </div>

    ))}

  </div>

)}

      </div>

    </main>
  );
}