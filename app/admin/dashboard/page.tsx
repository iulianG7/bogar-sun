"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AdminDashboard() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "reports"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReports(data);
    });

    return () => unsubscribe();
  }, []);

  const deleteReport = async (id: string) => {
    if (!confirm("Ștergi raportul?")) return;

    await deleteDoc(doc(db, "reports", id));
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white px-4 md:px-8 py-6 pb-32">

      <h1 className="mb-8 text-3xl md:text-5xl font-black text-yellow-400">
        Dashboard Administrator
      </h1>

      <div className="space-y-5">

      {reports.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-[#1a1a1a] to-[#101010] p-5 shadow-2xl">
            Nu există rapoarte.
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">

                <div className="space-y-3 text-lg">

                  <h2 className="text-2xl md:text-3xl font-black text-yellow-400">
                    {report.worker}
                  </h2>

                  <p>📍 Obiect: {report.project}</p>
                  <p>⚡ kWp: {report.kwp}</p>
                  <p>🕒 Ore: {report.hours}</p>

                  {!report.didWork && (
                    <p className="text-red-400">
                      Motiv: {report.reason}
                    </p>
                  )}

                </div>

                <button
                  onClick={() => deleteReport(report.id)}
                  className="w-full md:w-auto rounded-2xl bg-red-600 py-4 px-8 text-lg font-bold transition hover:bg-red-700"
                >
                  Șterge
                </button>

              </div>
            </div>
          ))
        )}

      </div>

    </main>
  );
}