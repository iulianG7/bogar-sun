"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Search,
} from "lucide-react";

export default function HistoryPage() {
    const [reports, setReports] = useState<any[]>([]);

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

  return (

    <div className="space-y-6 pb-28">

      <motion.div
        initial={{ opacity:0,y:-20 }}
        animate={{ opacity:1,y:0 }}
      >

        <p className="text-xs uppercase tracking-[5px] text-yellow-400 font-bold">

          Bogar Sun

        </p>

        <h1 className="mt-2 text-4xl font-black">

          Istoric rapoarte

        </h1>

        <p className="mt-2 text-zinc-400">

          Vezi toate rapoartele trimise.

        </p>

      </motion.div>

      <div className="rounded-[30px] border border-white/10 bg-[#151515] p-5">

        <div className="flex h-14 items-center gap-3 rounded-2xl bg-black/30 px-4">

          <Search
            size={20}
            className="text-yellow-400"
          />

          <input
            placeholder="Caută după dată..."
            className="flex-1 bg-transparent outline-none"
          />

        </div>

      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .15 }}
        className="space-y-4"
      >

        {reports.map((report) => (

          <div
            key={report.id}
            className="rounded-[28px] border border-white/10 bg-[#151515] p-5 transition-all hover:border-yellow-400/30"
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10">

                  <CalendarDays
                    size={22}
                    className="text-yellow-400"
                  />

                </div>

                <div>

                  <h3 className="font-bold">

                    {report.createdAt?.toDate().toLocaleDateString("ro-RO")}

                  </h3>

                  <p className="text-sm text-zinc-500">

                    {report.project}

                  </p>

                </div>

              </div>

              <div className="rounded-full bg-green-500/15 px-3 py-1">

                <span className="text-sm font-semibold text-green-400">

                  Trimis

                </span>

              </div>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="rounded-2xl bg-black/30 p-4">

                <p className="text-xs text-zinc-500">

                  kWp

                </p>

                <h4 className="mt-1 text-2xl font-black">

                  {report.kwp}

                </h4>

              </div>

              <div className="rounded-2xl bg-black/30 p-4">

                <p className="text-xs text-zinc-500">

                  Ore

                </p>

                <h4 className="mt-1 text-2xl font-black">

                  {report.hours}

                </h4>

              </div>

            </div>

          </div>

        ))}

      </motion.div>

    </div>

  );

}