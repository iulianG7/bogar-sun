"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

export default function WorkersPage() {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);

  const [workers, setWorkers] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);

useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "workers"),
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setWorkers(data);
    }
  );

  const unsubscribeReports = onSnapshot(
    collection(db, "reports"),
    (snapshot) => {
      const reportsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReports(reportsData);
    }
  );

  return () => {
    unsubscribe();
    unsubscribeReports();
  };
}, []);

  const router = useRouter();

  const filtered = workers.filter(
    (worker) => worker.team === selectedTeam
  );

  const getWorkerTotal = (name: string) => {
  return reports
    .filter((report) => report.worker === name && report.didWork)
    .reduce((sum, report) => sum + Number(report.kwp || 0), 0);
};

  return (
    <main className="text-white">

      <div className="mb-8 flex items-center justify-between">

  <h1 className="text-4xl font-bold text-yellow-400">
    👷 Lucrători
  </h1>

  <div className="mb-8 flex flex-wrap gap-4">
  <button
    onClick={() => router.push("/admin/workers/add")}
    className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black hover:bg-yellow-300 transition"
  >
    ➕ Adaugă lucrător
  </button>

  <button
    onClick={() => router.push("/admin/workers/edit")}
    className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-500 transition"
  >
    ✏️ Editează lucrător
  </button>

  <button
    onClick={() => router.push("/admin/workers/delete")}
    className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-500 transition"
  >
    🗑️ Șterge lucrător
  </button>
</div>

</div>

      {selectedTeam === null && (

        <div className="space-y-6">

          <button
            onClick={() => setSelectedTeam(1)}
            className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-8 text-left hover:border-yellow-400 transition"
          >

            <h2 className="text-3xl font-bold">
              👷 Echipa 1
            </h2>

            <p className="text-zinc-400 mt-2">
              {workers.filter((w) => w.team === 1).length} lucrători
            </p>

          </button>

          <button
            onClick={() => setSelectedTeam(2)}
            className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-8 text-left hover:border-yellow-400 transition"
          >

            <h2 className="text-3xl font-bold">
              👷 Echipa 2
            </h2>

            <p className="text-zinc-400 mt-2">
              {workers.filter((w) => w.team === 2).length} lucrători
            </p>

          </button>

        </div>

      )}
      {selectedTeam !== null && (

        <div>

          <button
            onClick={() => setSelectedTeam(null)}
            className="mb-6 rounded-xl bg-zinc-800 px-5 py-3 hover:bg-zinc-700"
          >
            ← Înapoi
          </button>

          <div className="space-y-5">

            {filtered.map((worker) => (

              <button
              key={worker.id}
              onClick={() => router.push(`/admin/workers/${worker.id}`)}
              className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 text-left hover:border-yellow-400 transition"
            >

                <div className="flex justify-between items-center">

                  <div>

                <h2 className="text-2xl font-bold">
                  👤 {worker.name}
                </h2>

                <p className="text-zinc-400 mt-2">
                  👥 Echipa {worker.team}
                </p>

                <p className="text-zinc-400">
                  📱 {worker.phone}
                </p>

                  </div>

                  <div className="text-right">
  <p className="text-yellow-400 text-3xl font-bold">
    ⚡ {getWorkerTotal(worker.name).toFixed(1)}
  </p>
  <p className="text-zinc-500 text-sm">
    kWp total
  </p>
</div>

                </div>

              </button>

            ))}

          </div>

        </div>

      )}

    </main>
  );
}