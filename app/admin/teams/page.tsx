"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Users, Zap, Clock3, ArrowRight } from "lucide-react";

interface Worker {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  team: string;
}

interface Report {
  worker?: string;
  workerName?: string;
  team?: string;
  kwp: number;
  hours: number;
}

export default function TeamsPage() {

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

  const team1Workers = workers.filter(
    (w) => String(w.team) === "1"
  );

  const team2Workers = workers.filter(
    (w) => String(w.team) === "2"
  );

  const team1Kwp = useMemo(() => {

    return reports
      .filter((r) => String(r.team) === "1")
      .reduce((s, r) => s + Number(r.kwp || 0), 0);

  }, [reports]);

  const team2Kwp = useMemo(() => {

    return reports
      .filter((r) => String(r.team) === "2")
      .reduce((s, r) => s + Number(r.kwp || 0), 0);

  }, [reports]);
  const team1Hours = useMemo(() => {

    return reports
      .filter((r) => String(r.team) === "1")
      .reduce((s, r) => s + Number(r.hours || 0), 0);

  }, [reports]);

  const team2Hours = useMemo(() => {

    return reports
      .filter((r) => String(r.team) === "2")
      .reduce((s, r) => s + Number(r.hours || 0), 0);

  }, [reports]);

  return (

    <div className="space-y-8">

      <div>

        <p className="uppercase tracking-[5px] text-yellow-400">
          Bogar Sun
        </p>

        <h1 className="mt-2 text-5xl font-black">
          Echipe
        </h1>

      </div>

      <div className="grid gap-8 xl:grid-cols-2">

        {/* Echipa 1 */}

        <motion.div
          whileHover={{
            y: -8,
            scale: 1.02,
          }}
          className="relative overflow-hidden rounded-[36px] border border-yellow-500/20 bg-gradient-to-br from-zinc-900 to-yellow-500/10 p-8"
        >

          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-yellow-500/10 blur-3xl" />

          <div className="relative z-10">

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <Users
                    className="text-yellow-400"
                    size={30}
                  />

                  <h2 className="text-3xl font-black">

                    Echipa 1

                  </h2>

                </div>

                <p className="mt-3 text-zinc-400">

                  {team1Workers.length} lucrători

                </p>

              </div>

              <div className="rounded-2xl bg-yellow-400 px-5 py-3 font-black text-black">

                #1

              </div>

            </div>

            <div className="mt-10 grid grid-cols-2 gap-5">

              <div className="rounded-3xl bg-black/30 p-5">

                <div className="flex items-center gap-2">

                  <Zap
                    className="text-yellow-400"
                    size={18}
                  />

                  <span className="text-zinc-400">

                    kWp

                  </span>

                </div>

                <h3 className="mt-3 text-4xl font-black text-yellow-400">

                  {team1Kwp.toFixed(2)}

                </h3>

              </div>

              <div className="rounded-3xl bg-black/30 p-5">

                <div className="flex items-center gap-2">

                  <Clock3
                    className="text-green-400"
                    size={18}
                  />

                  <span className="text-zinc-400">

                    Ore

                  </span>

                </div>

                <h3 className="mt-3 text-4xl font-black text-green-400">

                  {team1Hours}

                </h3>

              </div>

            </div>

            <Link
              href="/admin/teams/1"
              className="mt-10 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >

              <span className="font-bold">

                Deschide echipa

              </span>

              <ArrowRight />

            </Link>

          </div>

        </motion.div>
        {/* Echipa 2 */}

        <motion.div
          whileHover={{
            y: -8,
            scale: 1.02,
          }}
          className="relative overflow-hidden rounded-[36px] border border-blue-500/20 bg-gradient-to-br from-zinc-900 to-blue-500/10 p-8"
        >

          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10">

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <Users
                    className="text-blue-400"
                    size={30}
                  />

                  <h2 className="text-3xl font-black">

                    Echipa 2

                  </h2>

                </div>

                <p className="mt-3 text-zinc-400">

                  {team2Workers.length} lucrători

                </p>

              </div>

              <div className="rounded-2xl bg-blue-500 px-5 py-3 font-black text-white">

                #2

              </div>

            </div>

            <div className="mt-10 grid grid-cols-2 gap-5">

              <div className="rounded-3xl bg-black/30 p-5">

                <div className="flex items-center gap-2">

                  <Zap
                    className="text-blue-400"
                    size={18}
                  />

                  <span className="text-zinc-400">

                    kWp

                  </span>

                </div>

                <h3 className="mt-3 text-4xl font-black text-blue-400">

                  {team2Kwp.toFixed(2)}

                </h3>

              </div>

              <div className="rounded-3xl bg-black/30 p-5">

                <div className="flex items-center gap-2">

                  <Clock3
                    className="text-green-400"
                    size={18}
                  />

                  <span className="text-zinc-400">

                    Ore

                  </span>

                </div>

                <h3 className="mt-3 text-4xl font-black text-green-400">

                  {team2Hours}

                </h3>

              </div>

            </div>

            <Link
              href="/admin/teams/2"
              className="mt-10 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >

              <span className="font-bold">

                Deschide echipa

              </span>

              <ArrowRight />

            </Link>

          </div>

        </motion.div>

      </div>

    </div>

  );

}