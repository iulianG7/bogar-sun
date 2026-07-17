"use client";

import {
  Bell,
  Zap,
  Clock3,
  MapPin,
  History,
  ArrowRight,
  ClipboardPlus,
} from "lucide-react";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { getWeather } from "@/lib/weather";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import {
  collection,
  where,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export default function WorkerDashboard() {

    const [now, setNow] = useState(new Date());
    const [weather, setWeather] = useState<any>(null);
    const [reports, setReports] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);

useEffect(() => {
  const unsub = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsub();
}, []);

useEffect(() => {
  const timer = setInterval(() => {
    setNow(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);

useEffect(() => {

  navigator.geolocation.getCurrentPosition(async (position) => {

    const data = await getWeather(
      position.coords.latitude,
      position.coords.longitude
    );

    setWeather(data);

  });

}, []);

useEffect(() => {
  if (!auth.currentUser) return;

  const q = query(
  collection(db, "reports"),
  where("workerId", "==", auth.currentUser.uid),
  orderBy("createdAt", "desc")
);

  const unsub = onSnapshot(q, (snapshot) => {
    setReports(
      snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });

  return () => unsub();
}, []);

console.log(reports);
const totalKw = reports.reduce(
  (sum, report) => sum + Number(report.kwp || 0),
  0
);

const totalHours = reports.reduce(
  (sum, report) => sum + Number(report.hours || 0),
  0
);

const lastReport = reports[0];

const currentTime = now.toLocaleTimeString("ro-RO", {
  hour: "2-digit",
  minute: "2-digit",
});

const currentDate = now.toLocaleDateString("ro-RO", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

  return (

    <div className="space-y-5 pb-28">

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5 }}
        className="rounded-[34px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl"
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-[5px] text-yellow-400 font-bold">

              Bogar Sun

            </p>

            <h1 className="mt-2 text-3xl font-black">

              Salut, Iulian 👋

            </h1>

            <p className="mt-2 text-zinc-400">

              {currentDate}

                {" • "}

                {currentTime}

            </p>

          </div>

          <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black shadow-[0_0_30px_rgba(250,204,21,.35)]">

            <Bell size={24} />

          </button>

        </div>

      </motion.div>

      {/* HERO CARD */}

      <motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: .15 }}
  className="relative overflow-hidden rounded-[34px] border border-yellow-400/30 bg-[#0d0d0d] p-6 shadow-[0_0_70px_rgba(250,204,21,.15)]"
>

        <div className="absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-yellow-400/15 blur-[110px]" />

        <Image
  src="/images/hero-pattern.png"
  alt="Hero"
  fill
  priority
  className="absolute inset-0 object-cover opacity-80 pointer-events-none"
/>

<div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0dcc] to-transparent z-10" />

<div className="relative z-20 max-w-[230px]">

  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl">

    <ClipboardPlus
      size={28}
      className="text-yellow-400"
    />

  </div>

  <h2 className="mt-6 text-5xl font-black leading-none">

    Trimite
    <br />
    raport

  </h2>

  <p className="mt-4 text-zinc-400 leading-7">

    Completează raportul pentru ziua de astăzi.

  </p>

  <Link
    href="/worker/report"
    className="mt-8 flex h-14 items-center justify-center rounded-2xl bg-yellow-400 text-lg font-bold text-black transition hover:brightness-110"
  >

    Trimite raport

    <ArrowRight
      size={20}
      className="ml-3"
    />

  </Link>

</div>

      </motion.div>
      {/* STATISTICI */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: .25 }}
  className="grid grid-cols-2 gap-4"
>

  <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#151515] p-5">

    <div className="absolute left-0 bottom-0 h-1 w-full bg-gradient-to-r from-yellow-300 to-yellow-500" />

    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10">

      <Zap
        size={28}
        className="text-yellow-400"
      />

    </div>

    <h2 className="mt-5 text-5xl font-black text-white">

      {totalKw}

    </h2>

    <p className="mt-2 text-sm text-zinc-500">

      kWp luna aceasta

    </p>

  </div>

  <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#151515] p-5">

    <div className="absolute left-0 bottom-0 h-1 w-full bg-gradient-to-r from-green-300 to-green-500" />

    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-400/10">

      <Clock3
        size={28}
        className="text-green-400"
      />

    </div>

    <h2 className="mt-5 text-5xl font-black text-white">

      {totalHours}

    </h2>

    <p className="mt-2 text-sm text-zinc-500">

      Ore luna aceasta

    </p>

  </div>

</motion.div>

      {/* OBIECT */}

      {/* TOP INFO */}

{/* WEATHER */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: .30 }}
  className="rounded-[30px] border border-white/10 bg-[#151515] p-6"
>

  <div className="flex items-center justify-between">

    <div>

      <p className="text-xs uppercase tracking-[3px] text-yellow-400">

        Vreme acum

      </p>

      <h2 className="mt-2 text-5xl font-black">

        {weather?.current?.temperature_2m ?? "--"}°

      </h2>

      <p className="mt-2 text-zinc-400">

        Locația ta

      </p>

      <p className="mt-1 text-sm text-zinc-500">

        Parțial însorit

      </p>

    </div>

    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-400/10 text-6xl">

      🌤️

    </div>

  </div>

</motion.div>
      {/* ULTIMUL RAPORT */}

      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: .35 }}
  className="rounded-[30px] border border-white/10 bg-[#151515] p-6"
>

  <div className="flex items-center gap-4">

    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">

      <History
        size={28}
        className="text-zinc-300"
      />

    </div>

    <div>

      <h3 className="text-xl font-bold">

        Ultimul raport

      </h3>

      <p className="text-zinc-500">

        {lastReport ? (
  <>
    <p className="font-bold">
      {lastReport.objectName}
    </p>

    <p className="text-zinc-400">
      {lastReport.kwp} kWp • {lastReport.hours} ore
    </p>
  </>
) : (
  <p className="text-zinc-400">
    Nu există încă rapoarte.
  </p>
)}

      </p>

    </div>

  </div>

  <Link
    href="/worker/report"
    className="mt-6 flex h-12 items-center justify-center rounded-xl bg-yellow-400 font-bold text-black"
  >

    Completează raport

  </Link>

</motion.div>

    </div>

  );

}