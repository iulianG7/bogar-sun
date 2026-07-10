"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { CalendarDays } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  House,
  ClipboardList,
  BarChart3,
  User,
} from "lucide-react";

export default function WorkerDashboard() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("ro-RO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const [workerName, setWorkerName] = useState("");
const [teamName, setTeamName] = useState("");
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) return;

    const { doc, getDoc } = await import("firebase/firestore");

    const snap = await getDoc(doc(db, "workers", user.uid));

if (snap.exists()) {
  const data = snap.data();

  setWorkerName(data.name);
  setTeamName(`Echipa ${data.team}`);
  const q = query(
  collection(db, "reports"),
  where("worker", "==", data.name),
  orderBy("createdAt", "desc"),
  limit(10)
);

const unsubscribeReports = onSnapshot(q, (snapshot) => {
  setReports(
    snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  );
});
}
  });

  return () => unsubscribe();
}, []);

  const [project, setProject] = useState("");
  const [kwp, setKwp] = useState("");
  const [hours, setHours] = useState("");
  const [didWork, setDidWork] = useState(true);
  const [reason, setReason] = useState("");
  const [reports, setReports] = useState<any[]>([]);
  const router = useRouter();
  const logout = async () => {
  await signOut(auth);
  router.push("/login");
};
  const totalKwp = reports.reduce(
  (sum, report) => sum + (Number(report.kwp) || 0),
  0
);

const totalHours = reports.reduce(
  (sum, report) => sum + (Number(report.hours) || 0),
  0
);

const workedDays = reports.filter((report) => report.didWork).length;
  const sendReport = async () => {
  try {
    await addDoc(collection(db, "reports"), {
  worker: workerName,
  project,
  kwp: Number(kwp),
  hours: Number(hours),
  didWork,
  reason,
  createdAt: serverTimestamp(),
});

    alert("✅ Raport trimis cu succes!");

    router.refresh();
    setProject("");
    setKwp("");
    setHours("");
    setDidWork(true);
    setReason("");
}   catch (error: any) {
  console.error(error);
  alert(error.message);
}
};

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white px-6 py-8 pb-40">

  <div className="flex justify-between items-start mb-10">

  <div>
    <h1 className="text-5xl font-extrabold">
      Bun venit, <span className="text-yellow-400">{workerName}</span> 👋
    </h1>

    <p className="mt-2 text-2xl text-zinc-400">
      {teamName}
    </p>
  </div>

  <div className="flex items-center gap-3">
    <div className="rounded-xl bg-yellow-400/10 p-3">
      <CalendarDays className="h-8 w-8 text-yellow-400" />
    </div>

    <div>
      <p className="text-2xl font-bold">
        {today.toLocaleDateString("ro-RO")}
      </p>

      <p className="text-zinc-400 capitalize">
        {today.toLocaleDateString("ro-RO", {
          weekday: "long",
        })}
     </p>
         </div>

      </div>

    </div>

      <div className="mt-10 rounded-[28px] border border-zinc-800 bg-[#121212] p-8 shadow-2xl">

        <h2 className="mb-8 flex items-center gap-3 text-4xl font-bold">

  <span className="text-yellow-400">📋</span>

  Raportul de azi

</h2>

        <div className="grid grid-cols-3 gap-5 mt-6">

  <div>

<div className="grid grid-cols-3 gap-6">

  <div>
    <label className="mb-2 block text-zinc-400">
      🏠 Obiect
    </label>

    <input
      value={project}
      onChange={(e) => setProject(e.target.value)}
      placeholder="Ex: Enerix Krefeld"
      className="w-full rounded-2xl border border-zinc-700 bg-[#0d0d0d] p-4 text-lg focus:border-yellow-400 outline-none"
    />
  </div>

  <div>
    <label className="mb-2 block text-zinc-400">
      ⚡ kWp instalați
    </label>

    <input
      value={kwp}
      onChange={(e) => setKwp(e.target.value)}
      placeholder="Ex: 35.4"
      className="w-full rounded-2xl border border-zinc-700 bg-[#0d0d0d] p-4 text-lg focus:border-yellow-400 outline-none"
    />
  </div>

  <div>
    <label className="mb-2 block text-zinc-400">
      ⏰ Ore lucrate
    </label>

    <input
      value={hours}
      onChange={(e) => setHours(e.target.value)}
      placeholder="Ex: 8"
      className="w-full rounded-2xl border border-zinc-700 bg-[#0d0d0d] p-4 text-lg focus:border-yellow-400 outline-none"
    />
  </div>

</div>

</div>

</div>

        <div className="mt-8">

  <p className="mb-4 text-xl font-semibold">
    Nu am lucrat azi
  </p>

  <div className="flex gap-4">

    <button
      onClick={() => {
        setDidWork(false);
        setReason("Medical");
      }}
      className={`rounded-2xl border px-6 py-4 font-semibold transition ${
        reason === "Medical"
          ? "bg-red-600 border-red-600"
          : "border-zinc-700 bg-zinc-900 hover:border-red-500"
      }`}
    >
      ❤️ Medical
    </button>

    <button
      onClick={() => {
        setDidWork(false);
        setReason("Ploaie");
      }}
      className={`rounded-2xl border px-6 py-4 font-semibold transition ${
        reason === "Ploaie"
          ? "bg-blue-600 border-blue-600"
          : "border-zinc-700 bg-zinc-900 hover:border-blue-500"
      }`}
    >
      🌧️ Ploaie
    </button>

    <button
      onClick={() => {
        setDidWork(false);
        setReason("Nu este obiect");
      }}
      className={`rounded-2xl border px-6 py-4 font-semibold transition ${
        reason === "Nu este obiect"
          ? "bg-yellow-500 text-black border-yellow-500"
          : "border-zinc-700 bg-zinc-900 hover:border-yellow-400"
      }`}
    >
      📍 Nu este obiect
    </button>

  </div>

</div>

        <button
          onClick={sendReport}
          className="mt-8 w-full rounded-2xl bg-yellow-400 text-black font-bold text-2xl py-5 hover:bg-yellow-300 transition"
        >
          📤 Trimite raport
        </button>

      </div>

<h2 className="text-3xl font-bold mt-10 mb-6">
  📊 Statistici rapide
</h2>

<div className="grid grid-cols-3 gap-6 mt-8">

  <div className="rounded-[28px] bg-gradient-to-b from-[#1a1a1a] to-[#101010] border border-zinc-800 shadow-2xl p-7 transition hover:scale-[1.03]">

    <div className="flex items-center justify-between">

      <div className="h-14 w-14 rounded-2xl bg-yellow-400/15 flex items-center justify-center text-3xl">
        ⚡
      </div>

      <p className="text-zinc-500 text-sm">
        Luna aceasta
      </p>

    </div>

    <h1 className="mt-8 text-5xl font-black">
      {totalKwp.toFixed(1)}
    </h1>

    <p className="mt-2 text-zinc-400">
      kWp instalați
    </p>

  </div>

  <div className="rounded-[28px] bg-gradient-to-b from-[#1a1a1a] to-[#101010] border border-zinc-800 shadow-2xl p-7 transition hover:scale-[1.03]">

    <div className="flex items-center justify-between">

      <div className="h-14 w-14 rounded-2xl bg-sky-500/15 flex items-center justify-center text-3xl">
        🕒
      </div>

      <p className="text-zinc-500 text-sm">
        Luna aceasta
      </p>

    </div>

    <h1 className="mt-8 text-5xl font-black">
      {totalHours}
    </h1>

    <p className="mt-2 text-zinc-400">
      Ore lucrate
    </p>

  </div>

  <div className="rounded-[28px] bg-gradient-to-b from-[#1a1a1a] to-[#101010] border border-zinc-800 shadow-2xl p-7 transition hover:scale-[1.03]">

    <div className="flex items-center justify-between">

      <div className="h-14 w-14 rounded-2xl bg-green-500/15 flex items-center justify-center text-3xl">
        📅
      </div>

      <p className="text-zinc-500 text-sm">
        Luna aceasta
      </p>

    </div>

    <h1 className="mt-8 text-5xl font-black">
      {workedDays}
    </h1>

    <p className="mt-2 text-zinc-400">
      Zile lucrate
    </p>

  </div>

</div>

      <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="text-3xl font-bold mt-10 mb-6">
  📋 Ultimele rapoarte
</h2>

<div className="space-y-4">

  {reports.length === 0 ? (

    <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-[#1a1a1a] to-[#101010] p-8 text-center text-zinc-400">
      Nu există încă rapoarte.
    </div>

  ) : (

    reports.map((report: any) => (

      <div
        key={report.id}
        className="flex items-center justify-between rounded-[26px] border border-zinc-800 bg-gradient-to-b from-[#1a1a1a] to-[#101010] p-6 hover:border-yellow-400 transition"
      >

        <div className="flex items-center gap-5">

          <div className="h-14 w-14 rounded-2xl bg-yellow-400/15 flex items-center justify-center text-2xl">
            🏠
          </div>

          <div>

            <h3 className="text-xl font-bold">
              {report.project || "Fără obiect"}
            </h3>

            <p className="text-zinc-400">
              {report.kwp} kWp • {report.hours} ore
            </p>

          </div>

        </div>

        <div className="text-right">

          <p className="text-zinc-400">
            {report.createdAt?.toDate().toLocaleDateString("ro-RO")}
          </p>

          <p className="text-yellow-400 text-2xl">
            →
          </p>

        </div>

      </div>

    ))

  )}

</div>

      </div>

<div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[95%] max-w-md rounded-[30px] border border-zinc-800 bg-[#161616]/95 backdrop-blur-xl shadow-2xl p-3">

  <div className="grid grid-cols-4">

    <Link 
    href="/worker/dashboard"
    className="flex flex-col items-center gap-2 rounded-2xl py-3 text-yellow-400">
      <House size={28} />
      <span className="text-sm font-bold">
        Acasă
      </span>
    </Link>

    <Link 
    href="/worker/history"
    className="flex flex-col items-center gap-2 rounded-2xl py-3 text-zinc-400 hover:text-white">
      <ClipboardList size={28} />
      <span className="text-sm">
        Istoric
      </span>
    </Link>

    <Link 
    href="/worker/statistics"
    className="flex flex-col items-center gap-2 rounded-2xl py-3 text-zinc-400 hover:text-white">
      <BarChart3 size={28} />
      <span className="text-sm">
        Statistici
      </span>
    </Link>

    <Link 
    href="/worker/profile" 
    className="flex flex-col items-center gap-2 rounded-2xl py-3 text-zinc-400 hover:text-white">
      <User size={28} />
      <span className="text-sm">
        Profil
      </span>
    </Link>

  </div>

</div>

    </main>
  );
}