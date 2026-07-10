"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";

export default function WorkerPage() {
  const { id } = useParams();

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [worker, setWorker] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const saveWorker = async () => {
  await updateDoc(doc(db, "workers", id as string), {
    name: worker.name,
    phone: worker.phone,
    email: worker.email,
    team: worker.team,
  });

  alert("✅ Lucrătorul a fost actualizat!");
};

  const filteredReports = reports.filter((report) => {
  if (report.worker !== worker?.name) return false;

  const reportDate = report.createdAt?.toDate
    ? report.createdAt.toDate()
    : new Date(report.createdAt);

  const monthNames = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
  ];

  return monthNames[reportDate.getMonth()] === selectedMonth;
});

  const totalKwp = filteredReports.reduce(
  (sum, report) => sum + Number(report.kwp || 0),
  0
);

const totalHours = filteredReports.reduce(
  (sum, report) => sum + Number(report.hours || 0),
  0
);

  useEffect(() => {
    const loadWorker = async () => {
      const snap = await getDoc(doc(db, "workers", id as string));

      if (snap.exists()) {
        setWorker(snap.data());
      }
      const reportsSnap = await getDocs(collection(db, "reports"));

      setReports(
        reportsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    loadWorker();
  }, [id]);

  if (!worker)
    return (
      <main className="text-white p-8">
        Se încarcă...
      </main>
    );

  return (
    <main className="text-white">

      <div className="mb-8">
  <h1 className="text-4xl font-bold text-yellow-400 mb-8">
  👷 {worker.name}
</h1>
</div>

      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">

        <p>📞 {worker.phone}</p>
        <p>📧 {worker.email}</p>
        <div className="mt-3">
  <p>👥 Echipa {worker.team}</p>
</div>

      </div>

<div className="mt-10">

  {[2026].map((year) => (

    <div
      key={year}
      className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden"
    >

      <button
        onClick={() =>
          setSelectedYear(selectedYear === year ? null : year)
        }
        className="flex w-full items-center justify-between p-6 text-left"
      >

        <span className="text-2xl font-bold">
          📅 {year}
        </span>

        <span className="text-3xl">
          {selectedYear === year ? "▼" : "▶"}
        </span>

      </button>

      {selectedYear === year && (

        <div className="grid grid-cols-3 gap-3 border-t border-zinc-800 p-5">

          {[
            "Ianuarie",
            "Februarie",
            "Martie",
            "Aprilie",
            "Mai",
            "Iunie",
            "Iulie",
            "August",
            "Septembrie",
            "Octombrie",
            "Noiembrie",
            "Decembrie",
          ].map((month) => (

<div key={month}>

  <button
    onClick={() =>
      setSelectedMonth(
        selectedMonth === month ? null : month
      )
    }
    className="w-full rounded-xl bg-zinc-800 p-4 text-left hover:bg-yellow-400 hover:text-black transition"
  >
    {selectedMonth === month ? "▼ " : "▶ "}
    {month}
  </button>

{selectedMonth === month && (

  <div className="mt-3 rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-4">

    {filteredReports.length === 0 ? (

      <p className="text-zinc-500">
        Nu există rapoarte.
      </p>

    ) : (

      filteredReports.map((report) => (

        <div
          key={report.id}
          className="rounded-xl bg-zinc-900 border border-zinc-800 p-4"
        >
          <p className="text-yellow-400 font-semibold">
  {(() => {
    if (!report.createdAt?.toDate) return null;

    const date = report.createdAt.toDate();

    const weekday = date
      .toLocaleDateString("ro-RO", {
        weekday: "long",
      });

    const day = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    return (
      <>
        📅 {day} •{" "}
        {date.toLocaleDateString("ro-RO")}
      </>
    );
  })()}
</p>
          <p>📍 {report.project || "-"}</p>
          <p>⚡ {report.kwp} kWp</p>
          <p>🕒 {report.hours} ore</p>

          {!report.didWork && (
            <p className="text-red-400">
              Motiv: {report.reason}
            </p>
          )}

        </div>

      ))

    )}

    <div className="border-t border-zinc-700 pt-4 mt-6">

  <h3 className="text-2xl font-bold text-yellow-400">
    📊 Total {selectedMonth}
  </h3>

  <p className="mt-3 text-xl">
    ⚡ {totalKwp.toFixed(1)} kWp
  </p>

  <p className="text-xl">
    🕒 {totalHours} ore
  </p>

</div>

  </div>

)}

</div>

          ))}

        </div>

      )}

    </div>

  ))}

</div>

    </main>
  );
}