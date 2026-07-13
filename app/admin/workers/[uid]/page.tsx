"use client";

import { use } from "react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Zap,
  Clock3,
  Trophy,
  Calendar,
} from "lucide-react";

interface Worker {
  id: string;
  uid: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  team: string;
}

interface Report {
  id: string;
  worker: string;
  kwp: number;
  hours: number;
  project: string;
  createdAt?: any;
}

const months = [
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

export default function WorkerPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {

  const { uid } = use(params);

  const [worker, setWorker] = useState<Worker | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {

    const unsubWorkers = onSnapshot(
      collection(db, "workers"),
      (snap) => {

        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as any),
        }));

        setWorker(
          data.find(w => w.uid === uid) || null
        );

      }
    );

    const unsubReports = onSnapshot(
      collection(db, "reports"),
      (snap) => {

        setReports(
          snap.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as any),
          }))
        );

      }
    );

    return () => {

      unsubWorkers();
      unsubReports();

    };

  }, [uid]);

  if (!worker) {

    return (
      <div className="text-white">
        Se încarcă...
      </div>
    );

  }

  const workerName =
    worker.name ||
    `${worker.firstName ?? ""} ${worker.lastName ?? ""}`.trim();

  const workerReports = reports.filter(
    r => r.worker === workerName
  );

  const totalKwp = workerReports.reduce(
    (s, r) => s + Number(r.kwp || 0),
    0
  );

  const totalHours = workerReports.reduce(
    (s, r) => s + Number(r.hours || 0),
    0
  );

  return (

    <div className="space-y-8">
        <Link
        href={`/admin/teams/${worker.team}`}
        className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 transition hover:bg-white/10"
      >

        <ArrowLeft size={20} />

        Înapoi la echipă

      </Link>

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative overflow-hidden rounded-[40px] border border-yellow-500/20 bg-gradient-to-br from-zinc-900 to-yellow-500/10 p-10"
      >

        <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          <div className="flex items-center gap-8">

            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_60px_rgba(250,204,21,.35)]">

              <User
                size={60}
                className="text-black"
              />

            </div>

            <div>

              <p className="uppercase tracking-[5px] text-yellow-400">

                Echipa {worker.team}

              </p>

              <h1 className="mt-3 text-5xl font-black">

                {workerName}

              </h1>

              <p className="mt-4 text-zinc-400">

                Profil lucrător Bogar Sun

              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-3xl bg-black/30 p-6 text-center">

              <Zap
                className="mx-auto text-yellow-400"
                size={28}
              />

              <h2 className="mt-4 text-5xl font-black text-yellow-400">

                {totalKwp}

              </h2>

              <p className="mt-2 text-zinc-500">

                Total kWp

              </p>

            </div>

            <div className="rounded-3xl bg-black/30 p-6 text-center">

              <Clock3
                className="mx-auto text-green-400"
                size={28}
              />

              <h2 className="mt-4 text-5xl font-black text-green-400">

                {totalHours}

              </h2>

              <p className="mt-2 text-zinc-500">

                Total ore

              </p>

            </div>

            <div className="rounded-3xl bg-black/30 p-6 text-center">

              <Trophy
                className="mx-auto text-orange-400"
                size={28}
              />

              <h2 className="mt-4 text-5xl font-black text-orange-400">

                #1

              </h2>

              <p className="mt-2 text-zinc-500">

                Clasament

              </p>

            </div>

            <div className="rounded-3xl bg-black/30 p-6 text-center">

              <Calendar
                className="mx-auto text-blue-400"
                size={28}
              />

              <h2 className="mt-4 text-5xl font-black text-blue-400">

                12

              </h2>

              <p className="mt-2 text-zinc-500">

                Luni

              </p>

            </div>

          </div>

        </div>

      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {months.map((month, index) => {

        const monthReports = workerReports.filter((report) => {

          if (!report.createdAt?.toDate) return false;

          return (
            report.createdAt
              .toDate()
              .getMonth() === index
          );

        });

        const monthKwp = monthReports.reduce(
          (sum, report) =>
            sum + Number(report.kwp || 0),
          0
        );

        const monthHours = monthReports.reduce(
          (sum, report) =>
            sum + Number(report.hours || 0),
          0
        );

        return (

          <Link
            key={month}
            href={`/admin/workers/${uid}/${index + 1}`}
          >

            <motion.div
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900/70 p-7 backdrop-blur-xl transition-all"
            >

              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-yellow-500/10 blur-3xl transition group-hover:scale-150" />

              <div className="relative z-10">

                <Calendar
                  className="text-yellow-400"
                  size={30}
                />

                <h2 className="mt-5 text-3xl font-black">

                  {month}

                </h2>

                <div className="mt-6 space-y-3">

                  <div className="flex justify-between">

                    <span className="text-zinc-400">

                      kWp

                    </span>

                    <span className="font-bold text-yellow-400">

                      {monthKwp}

                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-zinc-400">

                      Ore

                    </span>

                    <span className="font-bold text-green-400">

                      {monthHours}

                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-zinc-400">

                      Rapoarte

                    </span>

                    <span className="font-bold">

                      {monthReports.length}

                    </span>

                  </div>

                </div>

              </div>

            </motion.div>

          </Link>

        );

      })}

      </div>

    </div>

  );

}