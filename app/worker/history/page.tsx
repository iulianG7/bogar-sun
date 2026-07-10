"use client";

import WorkerBottomNav from "@/components/WorkerBottomNav";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default function HistoryPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const q = query(
        collection(db, "reports"),
        where("worker", "==", user.displayName),
        orderBy("createdAt", "desc")
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

  const monthReports = reports.filter((report) => {
  if (!report.createdAt) return false;

  const date = report.createdAt.toDate();

  return (
    date.getMonth() === selectedMonth &&
    date.getFullYear() === selectedYear
  );
});

  const totalKwp = monthReports
    .filter((r) => r.didWork)
    .reduce((sum, r) => sum + (Number(r.kwp) || 0), 0);

  const totalHours = monthReports
    .filter((r) => r.didWork)
    .reduce((sum, r) => sum + (Number(r.hours) || 0), 0);

  const workedDays = monthReports.filter((r) => r.didWork).length;

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white p-8 pb-32">

  <h1 className="text-5xl font-bold mb-2">
    📋 Istoric
  </h1>

  <div className="mb-8 flex items-center justify-between rounded-2xl bg-[#161616] border border-zinc-800 p-4">

  <button
    onClick={() => {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    }}
    className="text-3xl font-bold hover:text-yellow-400"
  >
    ◀
  </button>

  <h2 className="text-2xl font-bold capitalize">
    {new Date(selectedYear, selectedMonth).toLocaleDateString("ro-RO", {
      month: "long",
      year: "numeric",
    })}
  </h2>

  <button
    onClick={() => {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }}
    className="text-3xl font-bold hover:text-yellow-400"
  >
    ▶
  </button>

</div>

  <div className="space-y-5">

    {monthReports.length === 0 ? (

      <div className="rounded-[28px] border border-zinc-800 bg-[#161616] p-8 text-center text-zinc-400">
        Nu există rapoarte în această lună.
      </div>

    ) : (

      monthReports.map((report: any) => (

        <div
  key={report.id}
  className="rounded-2xl border border-zinc-800 bg-[#161616] px-5 py-4 mb-3"
>

  <div className="flex justify-between items-center">

    <div>

      <p className="text-yellow-400 font-bold text-lg">
        {report.createdAt?.toDate().toLocaleDateString("ro-RO", {
          day: "numeric",
          month: "long",
        })}
      </p>

      {report.didWork ? (
        <>
          <p className="font-semibold">
            🏠 {report.project}
          </p>

          <p className="text-zinc-400 text-sm">
            ⚡ {report.kwp} kWp • ⏰ {report.hours} ore
          </p>
        </>
      ) : (
        <p className="text-red-400 font-semibold">
          🚫 {report.reason}
        </p>
      )}

    </div>

    <div className="text-right text-zinc-500 text-sm">
      {report.createdAt?.toDate().toLocaleDateString("ro-RO", {
        weekday: "long",
      })}
    </div>

  </div>

</div>

      ))

    )}

  </div>

  <div className="rounded-2xl bg-[#101010] p-5 text-center">

    <h2 className="text-3xl font-bold mb-6">
      Total luna aceasta
    </h2>

    <div className="grid grid-cols-3 gap-4 mt-4">

      <div>

        <p className="text-zinc-400">
          ⚡ kWp
        </p>

        <h3 className="text-4xl font-bold text-yellow-400 mt-2">
          {totalKwp.toFixed(1)}
        </h3>

      </div>

      <div>

        <p className="text-zinc-400">
          ⏰ Ore
        </p>

        <h3 className="text-4xl font-bold text-blue-400 mt-2">
          {totalHours.toFixed(1)}
        </h3>

      </div>

      <div>

        <p className="text-zinc-400">
          📅 Zile
        </p>

        <h3 className="text-4xl font-bold text-green-400 mt-2">
          {workedDays}
        </h3>

      </div>

    </div>

  </div>
<WorkerBottomNav />
</main>
  );
}