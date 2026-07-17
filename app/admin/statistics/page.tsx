"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Zap,
  Clock3,
  Users,
  Trophy,
} from "lucide-react";

interface Report {
  worker: string;
  kwp: number;
  hours: number;
}

interface Worker {
  name?: string;
  firstName?: string;
  lastName?: string;
}

export default function StatisticsPage() {

  const [reports, setReports] = useState<Report[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);

  useEffect(() => {

    const unsubReports = onSnapshot(
      collection(db, "reports"),
      snap => {

        setReports(
          snap.docs.map(doc => doc.data() as Report)
        );

      }
    );

    const unsubWorkers = onSnapshot(
      collection(db, "workers"),
      snap => {

        setWorkers(
          snap.docs.map(doc => doc.data() as Worker)
        );

      }
    );

    return () => {

      unsubReports();
      unsubWorkers();

    };

  }, []);

  const totalKwp = useMemo(() =>
    reports.reduce(
      (s, r) => s + Number(r.kwp || 0),
      0
    ),
    [reports]
  );

  const totalHours = useMemo(() =>
    reports.reduce(
      (s, r) => s + Number(r.hours || 0),
      0
    ),
    [reports]
  );

  return (

    <div className="space-y-8">

      <div>

        <p className="uppercase tracking-[5px] text-yellow-400">

          Bogar Sun

        </p>

        <h1 className="mt-3 text-5xl font-black">

          Statistici

        </h1>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[32px] border border-yellow-500/20 bg-gradient-to-br from-zinc-900 to-yellow-500/10 p-7">

        <Zap
          className="text-yellow-400"
          size={32}
        />

        <p className="mt-5 text-zinc-400">

          Total kWp

        </p>

        <h2 className="mt-3 text-5xl font-black text-yellow-400">

          {totalKwp}

        </h2>

      </div>

      <div className="rounded-[32px] border border-green-500/20 bg-gradient-to-br from-zinc-900 to-green-500/10 p-7">

        <Clock3
          className="text-green-400"
          size={32}
        />

        <p className="mt-5 text-zinc-400">

          Total ore

        </p>

        <h2 className="mt-3 text-5xl font-black text-green-400">

          {totalHours}

        </h2>

      </div>

      <div className="rounded-[32px] border border-blue-500/20 bg-gradient-to-br from-zinc-900 to-blue-500/10 p-7">

        <Users
          className="text-blue-400"
          size={32}
        />

        <p className="mt-5 text-zinc-400">

          Lucrători

        </p>

        <h2 className="mt-3 text-5xl font-black text-blue-400">

          {workers.length}

        </h2>

      </div>

      <div className="rounded-[32px] border border-orange-500/20 bg-gradient-to-br from-zinc-900 to-orange-500/10 p-7">

        <Trophy
          className="text-orange-400"
          size={32}
        />

        <p className="mt-5 text-zinc-400">

          Media kWp / raport

        </p>

        <h2 className="mt-3 text-5xl font-black text-orange-400">

          {reports.length
            ? Math.round(totalKwp / reports.length)
            : 0}

        </h2>

      </div>

      </div>

      <div className="rounded-[36px] border border-white/10 bg-zinc-900/70 p-8">

        <h2 className="text-3xl font-black">

          Rezumat

        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="rounded-3xl bg-black/30 p-6">

            <p className="text-zinc-400">

              Total rapoarte

            </p>

            <h3 className="mt-3 text-4xl font-black">

              {reports.length}

            </h3>

          </div>

          <div className="rounded-3xl bg-black/30 p-6">

            <p className="text-zinc-400">

              Productivitate medie

            </p>

            <h3 className="mt-3 text-4xl font-black text-yellow-400">

              {reports.length
                ? Math.round(totalKwp / reports.length)
                : 0} kWp

            </h3>

          </div>

        </div>

      </div>
      </div>

  );

}