"use client";

import { use } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Zap,
  Clock3,
  CalendarDays,
  Trash2,
  Pencil,
} from "lucide-react";

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

export default function ReportPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {

  const { reportId } = use(params);

  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "reports"),
      (snap) => {

        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as any),
        }));

        setReport(
          data.find(r => r.id === reportId) || null
        );

      }
    );

    return () => unsub();

  }, [reportId]);

  const deleteReport = async () => {

    if (!report) return;

    if (!confirm("Ștergi raportul?")) return;

    await deleteDoc(doc(db, "reports", report.id));

    window.history.back();

  };

  if (!report) {

    return (
      <div className="text-white">
        Se încarcă...
      </div>
    );

  }

  return (

    <div className="space-y-8">

      <Link
        href="/admin/reports"
        className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10"
      >

        <ArrowLeft />

        Înapoi la rapoarte

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
        className="rounded-[40px] border border-yellow-500/20 bg-gradient-to-br from-zinc-900 to-yellow-500/10 p-10"
      >

        <div className="flex flex-col gap-8">

          <div>

            <p className="uppercase tracking-[5px] text-yellow-400">

              Raport zilnic

            </p>

            <h1 className="mt-3 text-5xl font-black">

              {report.worker}

            </h1>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div className="rounded-3xl bg-black/30 p-6">

              <MapPin
                className="mb-4 text-yellow-400"
                size={30}
              />

              <p className="text-zinc-400">

                Obiect

              </p>

              <h2 className="mt-2 text-3xl font-black">

                {report.project || "Nu este obiect"}

              </h2>

            </div>

            <div className="rounded-3xl bg-black/30 p-6">

              <CalendarDays
                className="mb-4 text-blue-400"
                size={30}
              />

              <p className="text-zinc-400">

                Data

              </p>

              <h2 className="mt-2 text-3xl font-black">

                {report.createdAt?.toDate
                  ? report.createdAt
                      .toDate()
                      .toLocaleDateString("ro-RO")
                  : "-"}

              </h2>

            </div>

            <div className="rounded-3xl bg-black/30 p-6">

              <Zap
                className="mb-4 text-yellow-400"
                size={30}
              />

              <p className="text-zinc-400">

                Putere instalată

              </p>

              <h2 className="mt-2 text-5xl font-black text-yellow-400">

                {report.kwp}

              </h2>

              <p className="mt-2 text-zinc-500">

                kWp

              </p>

            </div>

            <div className="rounded-3xl bg-black/30 p-6">

              <Clock3
                className="mb-4 text-green-400"
                size={30}
              />

              <p className="text-zinc-400">

                Ore lucrate

              </p>

              <h2 className="mt-2 text-5xl font-black text-green-400">

                {report.hours}

              </h2>

              <p className="mt-2 text-zinc-500">

                ore

              </p>

            </div>

          </div>

          {!report.didWork && (

            <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6">

              <h3 className="text-2xl font-black text-red-400">

                Motivul absenței

              </h3>

              <p className="mt-3 text-lg text-zinc-300">

                {report.reason}

              </p>

            </div>

          )}

          <div className="flex flex-col gap-4 md:flex-row">

            <Link
              href={`/admin/reports/edit/${report.id}`}
              className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-6 py-4 font-bold text-black transition hover:scale-[1.02]"
            >

              <Pencil size={20} />

              Editează raportul

            </Link>

            <button
              onClick={deleteReport}
              className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-red-600 px-6 py-4 font-bold transition hover:bg-red-700"
            >

              <Trash2 size={20} />

              Șterge raportul

            </button>

          </div>

        </div>

      </motion.div>
      </div>

  );

}