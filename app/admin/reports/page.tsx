"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import {
  FileText,
  CalendarDays,
  MapPin,
  Zap,
  Clock3,
  Eye,
  Trash2,
} from "lucide-react";

interface Report {
  id: string;
  worker?: string;
  workerName?: string;
  workerId?: string;
  project: string;
  kwp: number;
  hours: number;
  didWork: boolean;
  reason?: string;
  createdAt: any;
}

export default function ReportsPage() {

  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "reports"),
      (snap) => {

        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as any),
        }));

        setReports(data);

      }
    );

    return () => unsub();

  }, []);

  const sortedReports = useMemo(() => {

    return [...reports].sort((a, b) => {

      if (!a.createdAt?.toDate) return 1;
      if (!b.createdAt?.toDate) return -1;

      return (
        b.createdAt.toDate().getTime() -
        a.createdAt.toDate().getTime()
      );

    });

  }, [reports]);

  const deleteReport = async (id: string) => {

    if (!confirm("Ștergi raportul?")) return;

    await deleteDoc(
      doc(db, "reports", id)
    );

  };

  return (

    <div className="space-y-8">

      <div>

        <p className="uppercase tracking-[5px] text-yellow-400">

          Bogar Sun

        </p>

        <h1 className="mt-3 text-5xl font-black">

          Toate rapoartele

        </h1>

      </div>

      <div className="space-y-6">
        {sortedReports.length === 0 ? (

        <div className="rounded-[32px] border border-white/10 bg-zinc-900/70 p-10 text-center">

          <FileText
            className="mx-auto text-yellow-400"
            size={60}
          />

          <h2 className="mt-6 text-3xl font-black">

            Nu există rapoarte

          </h2>

          <p className="mt-3 text-zinc-400">

            Încă nu a fost trimis niciun raport.

          </p>

        </div>

      ) : (

        sortedReports.map((report, index) => (

          <motion.div
            key={report.id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.04,
            }}
            className="rounded-[32px] border border-white/10 bg-zinc-900/70 p-7 backdrop-blur-xl"
          >

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="space-y-4">

                <h2 className="text-3xl font-black">

                    {report.workerName || report.worker || "Fără nume"}

                </h2>

                <div className="flex flex-wrap gap-5 text-zinc-400">

                  <div className="flex items-center gap-2">

                    <CalendarDays size={18} />

                    {report.createdAt?.toDate
                      ? report.createdAt
                          .toDate()
                          .toLocaleDateString("ro-RO")
                      : "-"}

                  </div>

                  <div className="flex items-center gap-2">

                    <MapPin size={18} />

                    {report.project || "Nu este obiect"}

                  </div>

                </div>

                <div className="flex flex-wrap gap-5">

                  <div className="flex items-center gap-2 rounded-xl bg-yellow-500/10 px-4 py-2">

                    <Zap
                      size={18}
                      className="text-yellow-400"
                    />

                    <span className="font-bold text-yellow-400">

                      {report.kwp} kWp

                    </span>

                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-2">

                    <Clock3
                      size={18}
                      className="text-green-400"
                    />

                    <span className="font-bold text-green-400">

                      {report.hours} ore

                    </span>

                  </div>

                </div>

              </div>

              <div className="flex flex-col gap-3 md:flex-row">

                <Link
                  href={`/admin/reports/${report.id}`}
                  className="flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-6 py-4 font-bold text-black transition hover:scale-105"
                >

                  <Eye size={20} />

                  Vezi

                </Link>

                <button
                  onClick={() => deleteReport(report.id)}
                  className="flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-6 py-4 font-bold transition hover:bg-red-700"
                >

                  <Trash2 size={20} />

                  Șterge

                </button>

              </div>

            </div>

          </motion.div>

        ))

      )}

    </div>

    </div>

  );

}