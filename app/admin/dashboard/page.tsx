"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import HeroBanner from "@/components/dashboard/HeroBanner";
import StatsCards from "@/components/dashboard/StatsCards";
import ProductionChart from "@/components/dashboard/ProductionChart";
import TeamsCard from "@/components/dashboard/TeamsCard";
import TopWorkers from "@/components/dashboard/TopWorkers";
import LatestReports from "@/components/dashboard/LatestReports";

interface Report {
  id: string;
  worker: string;
  project: string;
  kwp: number;
  hours: number;
  didWork: boolean;
  reason?: string;
  createdAt: any;
}

interface Worker {
  id: string;
  name: string;
  team: string;
}

export default function DashboardPage() {

  const [reports, setReports] = useState<Report[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);

  useEffect(() => {

    const reportsQuery = query(
      collection(db, "reports"),
      orderBy("createdAt", "desc")
    );

    const workersQuery = query(
      collection(db, "workers")
    );

    const unsubReports = onSnapshot(reportsQuery, (snapshot) => {

      setReports(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as any),
        }))
      );

    });

    const unsubWorkers = onSnapshot(workersQuery, (snapshot) => {

      setWorkers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as any),
        }))
      );

    });

    return () => {

      unsubReports();
      unsubWorkers();

    };

  }, []);

  const totalKwp = useMemo(() => {

    return reports.reduce(
      (sum, report) => sum + Number(report.kwp || 0),
      0
    );

  }, [reports]);

  const totalHours = useMemo(() => {

    return reports.reduce(
      (sum, report) => sum + Number(report.hours || 0),
      0
    );

  }, [reports]);

  return (

    <div className="space-y-8">

      <HeroBanner />

      <StatsCards
        totalKwp={totalKwp}
        totalHours={totalHours}
        totalWorkers={workers.length}
      />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Grafic */}

        <div className="xl:col-span-2">

          <ProductionChart />

        </div>

        {/* Echipe */}

        <TeamsCard
          workers={workers}
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Top lucrători */}

        <TopWorkers
          reports={reports}
        />

        {/* Ultimele rapoarte */}

        <LatestReports
          reports={reports}
        />

      </div>

      {/* Dashboard Summary */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="group relative overflow-hidden rounded-[30px] border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-transparent p-7 backdrop-blur-xl">

          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-yellow-500/10 blur-3xl transition group-hover:scale-150" />

          <p className="text-zinc-400">
            Total rapoarte
          </p>

          <h2 className="mt-5 text-5xl font-black text-yellow-400">
            {reports.length}
          </h2>

        </div>

        <div className="group relative overflow-hidden rounded-[30px] border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent p-7 backdrop-blur-xl">

          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition group-hover:scale-150" />

          <p className="text-zinc-400">
            Echipe
          </p>

          <h2 className="mt-5 text-5xl font-black text-blue-400">
            2
          </h2>

        </div>

        <div className="group relative overflow-hidden rounded-[30px] border border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent p-7 backdrop-blur-xl">

          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-green-500/10 blur-3xl transition group-hover:scale-150" />

          <p className="text-zinc-400">
            Lucrători activi
          </p>

          <h2 className="mt-5 text-5xl font-black text-green-400">
            {workers.length}
          </h2>

        </div>

        <div className="group relative overflow-hidden rounded-[30px] border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent p-7 backdrop-blur-xl">

          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl transition group-hover:scale-150" />

          <p className="text-zinc-400">
            Status
          </p>

          <h2 className="mt-5 text-4xl font-black text-purple-400">
            Online
          </h2>

          <p className="mt-3 text-zinc-500">
            Firebase sincronizat
          </p>

        </div>

      </div>
      {/* Footer Dashboard */}

      <div className="rounded-[32px] border border-white/10 bg-gradient-to-r from-zinc-900/80 via-zinc-900/60 to-yellow-500/10 p-8 backdrop-blur-xl">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-sm uppercase tracking-[4px] text-yellow-400">
              Bogar Sun Management
            </p>

            <h2 className="mt-3 text-4xl font-black">
              Dashboard Premium
            </h2>

            <p className="mt-4 max-w-2xl text-zinc-400">
              Monitorizează echipele, rapoartele și productivitatea în timp real.
              Toate datele sunt sincronizate automat cu Firebase.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-center">

              <div className="text-5xl font-black text-yellow-400">

                {totalKwp}

              </div>

              <div className="mt-2 text-zinc-500">

                kWp instalați

              </div>

            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-center">

              <div className="text-5xl font-black text-green-400">

                {totalHours}

              </div>

              <div className="mt-2 text-zinc-500">

                Ore lucrate

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}