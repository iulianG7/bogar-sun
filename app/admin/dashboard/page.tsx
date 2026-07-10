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
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        Dashboard Administrator
      </h1>

      <div className="space-y-5">

      {reports.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
            Nu există rapoarte.
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="flex justify-between items-start">

                <div className="space-y-2">

                  <h2 className="text-2xl font-bold text-yellow-400">
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
                  className="rounded-xl bg-red-600 px-5 py-2 font-bold hover:bg-red-700"
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