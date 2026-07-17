"use client";

import { use } from "react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CalendarDays, ArrowLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface Report {
  id: string;
  worker?: string;
  workerId?: string;
  workerName?: string;
  project: string;
  kwp: number;
  hours: number;
  didWork: boolean;
  reason?: string;
  createdAt: any;
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

export default function WorkerMonthPage({
  params,
}: {
  params: Promise<{
    uid: string;
    month: string;
  }>;
}) {

  const { uid, month } = use(params);

  const [reports, setReports] = useState<Report[]>([]);
  const [workerName, setWorkerName] = useState("");

  useEffect(() => {

    const unsubWorkers = onSnapshot(
      collection(db, "workers"),
      (snap) => {

        const worker = snap.docs
          .map(doc => doc.data() as any)
          .find(w => w.uid === uid);

        if (worker) {

          setWorkerName(
            worker.name ||
            `${worker.firstName ?? ""} ${worker.lastName ?? ""}`.trim()
          );

        }

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

  const monthReports = useMemo(() => {

  return reports.filter((report) => {

    if (!report.createdAt?.toDate) return false;

    return (
      report.workerName === workerName &&
      report.createdAt.toDate().getMonth() + 1 === Number(month)
    );

  });

}, [reports, workerName, month]);

  return (

    <div className="space-y-8">

      <Link
        href={`/admin/workers/${uid}`}
        className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10"
      >

        <ArrowLeft />

        Înapoi la luni

      </Link>

      <div>

        <p className="uppercase tracking-[4px] text-yellow-400">

          {workerName}

        </p>

        <h1 className="mt-3 text-5xl font-black">

          {months[Number(month) - 1]}

        </h1>

      </div>

      <div className="space-y-5">
        {monthReports.length === 0 ? (

        <div className="rounded-[30px] border border-white/10 bg-zinc-900/70 p-10 text-center">

          <CalendarDays
            size={60}
            className="mx-auto text-yellow-400"
          />

          <h2 className="mt-6 text-3xl font-black">

            Nu există rapoarte

          </h2>

          <p className="mt-3 text-zinc-400">

            Pentru această lună nu există încă rapoarte.

          </p>

        </div>

      ) : (

        monthReports
          .sort(
            (a, b) =>
              b.createdAt.toDate().getTime() -
              a.createdAt.toDate().getTime()
          )
          .map((report, index) => (

            <Link
              key={report.id}
              href={`/admin/reports/${report.id}`}
            >

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                }}
                className="group rounded-[30px] border border-white/10 bg-zinc-900/70 p-7 transition hover:border-yellow-400/30"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-3xl font-black">

                      {report.createdAt
                        .toDate()
                        .toLocaleDateString("ro-RO")}

                    </h2>

                    <p className="mt-2 text-zinc-400">

                      {report.project || "Fără obiect"}

                    </p>

                  </div>

                  <ChevronRight
                    size={28}
                    className="text-zinc-500 transition group-hover:text-yellow-400"
                  />

                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">

                  <div className="rounded-2xl bg-black/30 p-4 text-center">

                    <p className="text-sm text-zinc-500">

                      kWp

                    </p>

                    <h3 className="mt-2 text-2xl font-black text-yellow-400">

                      {report.kwp}

                    </h3>

                  </div>

                  <div className="rounded-2xl bg-black/30 p-4 text-center">

                    <p className="text-sm text-zinc-500">

                      Ore

                    </p>

                    <h3 className="mt-2 text-2xl font-black text-green-400">

                      {report.hours}

                    </h3>

                  </div>

                  <div className="rounded-2xl bg-black/30 p-4 text-center">

                    <p className="text-sm text-zinc-500">

                      Status

                    </p>

                    <h3
                      className={`mt-2 text-lg font-black ${
                        report.didWork
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {report.didWork ? "Lucrat" : "Absent"}
                    </h3>

                  </div>

                </div>

              </motion.div>

            </Link>

          ))

      )}

      </div>

    </div>

  );

}