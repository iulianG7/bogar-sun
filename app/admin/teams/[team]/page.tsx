"use client";

import { use } from "react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Zap,
  Clock3,
  ChevronRight,
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
  worker: string;
  kwp: number;
  hours: number;
}

export default function TeamPage({
  params,
}: {
  params: Promise<{ team: string }>;
}) {

  const { team } = use(params);

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {

    const unsubWorkers = onSnapshot(
      collection(db, "workers"),
      (snap) => {

        setWorkers(
          snap.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as any),
          }))
        );

      }
    );

    const unsubReports = onSnapshot(
      collection(db, "reports"),
      (snap) => {

        setReports(
          snap.docs.map((doc) => ({
            ...(doc.data() as any),
          }))
        );

      }
    );

    return () => {

      unsubWorkers();
      unsubReports();

    };

  }, []);

  const teamWorkers = useMemo(() => {

    return workers.filter(
      (w) => String(w.team) === team
    );

  }, [workers, team]);

  return (

    <div className="space-y-8">

      <Link
        href="/admin/teams"
        className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10"
      >

        <ArrowLeft size={20} />

        Înapoi la echipe

      </Link>

      <div>

        <p className="uppercase tracking-[5px] text-yellow-400">

          Bogar Sun

        </p>

        <h1 className="mt-2 text-5xl font-black">

          Echipa {team}

        </h1>

      </div>

      <div className="grid gap-6">
        {teamWorkers.map((worker, index) => {

        const workerName =
          worker.name ||
          `${worker.firstName ?? ""} ${worker.lastName ?? ""}`.trim(
        );

        const workerReports = reports.filter(
          (r) => r.worker === workerName
        );

        const totalKwp = workerReports.reduce(
          (sum, r) => sum + Number(r.kwp || 0),
          0
        );

        const totalHours = workerReports.reduce(
          (sum, r) => sum + Number(r.hours || 0),
          0
        );
        return (
        

          <motion.div
            key={worker.id}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -6,
              scale: 1.01,
            }}
            className="relative overflow-hidden rounded-[34px] border border-white/10 bg-zinc-900/70 p-7 backdrop-blur-xl"
          >

            <div className="absolute right-[-80px] top-[-80px] h-52 w-52 rounded-full bg-yellow-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-center gap-5">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-3xl font-black text-black">

                  <User size={34} />

                </div>

                <div>

                  <h2 className="text-3xl font-black">

                    {workerName}

                  </h2>

                  <div className="mt-3 flex items-center gap-3">

                    <span className="h-3 w-3 rounded-full bg-green-500" />

                    <span className="text-zinc-400">

                      Activ

                    </span>

                  </div>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-5">

                <div className="rounded-2xl bg-black/30 p-5 text-center">

                  <div className="flex items-center justify-center gap-2">

                    <Zap
                      className="text-yellow-400"
                      size={18}
                    />

                    <span className="text-zinc-400">

                      kWp

                    </span>

                  </div>

                  <h3 className="mt-3 text-4xl font-black text-yellow-400">

                    {totalKwp}

                  </h3>

                </div>

                <div className="rounded-2xl bg-black/30 p-5 text-center">

                  <div className="flex items-center justify-center gap-2">

                    <Clock3
                      className="text-green-400"
                      size={18}
                    />

                    <span className="text-zinc-400">

                      Ore

                    </span>

                  </div>

                  <h3 className="mt-3 text-4xl font-black text-green-400">

                    {totalHours}

                  </h3>

                </div>

              </div>

              <Link
                href={`/admin/workers/${worker.uid}`}
                className="flex items-center gap-3 rounded-2xl bg-yellow-400 px-7 py-4 font-bold text-black transition hover:scale-105"
              >

                Vezi profil

                <ChevronRight size={20} />

              </Link>

            </div>

          </motion.div>

        );

      })}

      </div>

    </div>

  );

}