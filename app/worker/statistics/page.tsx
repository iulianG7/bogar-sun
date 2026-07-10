"use client";

import WorkerBottomNav from "@/components/WorkerBottomNav";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export default function StatisticsPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const q = query(
        collection(db, "reports"),
        where("worker", "==", user.displayName)
      );

      const unsub = onSnapshot(q, (snapshot) => {
        setReports(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });

      return () => unsub();
    });

    return () => unsubscribe();
  }, []);

  const now = new Date();

const worked = reports.filter((r) => {
  if (!r.didWork || !r.createdAt) return false;

  const date = r.createdAt.toDate();

  return (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
});

  const totalKwp = worked.reduce((s, r) => s + (r.kwp || 0), 0);
  const totalHours = worked.reduce((s, r) => s + (r.hours || 0), 0);
  const totalDays = worked.length;
  const average = totalDays ? totalKwp / totalDays : 0;

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white p-8">

      <h1 className="text-5xl font-bold mb-10">
        📊 Statistici
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="rounded-3xl bg-[#161616] border border-zinc-800 p-8">
          <p className="text-zinc-400">⚡ kWp instalați</p>
          <h2 className="text-5xl font-bold text-yellow-400 mt-4">
            {totalKwp.toFixed(1)}
          </h2>
        </div>

        <div className="rounded-3xl bg-[#161616] border border-zinc-800 p-8">
          <p className="text-zinc-400">⏰ Ore lucrate</p>
          <h2 className="text-5xl font-bold text-blue-400 mt-4">
            {totalHours.toFixed(1)}
          </h2>
        </div>

        <div className="rounded-3xl bg-[#161616] border border-zinc-800 p-8">
          <p className="text-zinc-400">📅 Zile lucrate</p>
          <h2 className="text-5xl font-bold text-green-400 mt-4">
            {totalDays}
          </h2>
        </div>

        <div className="rounded-3xl bg-[#161616] border border-zinc-800 p-8">
          <p className="text-zinc-400">📈 Media kWp / zi</p>
          <h2 className="text-5xl font-bold text-purple-400 mt-4">
            {average.toFixed(1)}
          </h2>
        </div>

      </div>

<WorkerBottomNav />
    </main>
  );
}