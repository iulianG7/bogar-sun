"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

interface Report {
  worker?: string;
  workerName: string;
  kwp: number;
  hours: number;
}

interface Props {
  reports: Report[];
}

export default function TopWorkers({ reports }: Props) {
  const workers = Object.values(
    reports.reduce((acc: any, report) => {
        const name = report.workerName || report.worker || "Fără nume";
      if (!acc[name]) {
        acc[name] = {
          name,
          kwp: 0,
          hours: 0,
        };
      }

      acc[name].kwp += Number(report.kwp || 0);
      acc[name].hours += Number(report.hours || 0);

      return acc;
    }, {})
  )

    .sort((a: any, b: any) => b.kwp - a.kwp)
    .slice(0, 5);

  const medals = [
    "bg-yellow-400 text-black",
    "bg-zinc-300 text-black",
    "bg-orange-500 text-white",
    "bg-zinc-800 text-white",
    "bg-zinc-800 text-white",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-[32px] border border-white/10 bg-zinc-900/70 backdrop-blur-xl p-8"
    >
      <div className="flex items-center gap-3">

        <Trophy className="text-yellow-400" />

        <h2 className="text-3xl font-black">
          Top Lucrători
        </h2>

      </div>

      <div className="mt-8 space-y-5">

        {workers.map((worker: any, index) => (
          <motion.div
            key={worker.name}
            whileHover={{
              scale: 1.02,
              x: 6,
            }}
            className="flex items-center justify-between rounded-3xl bg-zinc-950 p-5 border border-white/5"
          >

            <div className="flex items-center gap-4">

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full font-black ${medals[index]}`}
              >
                {index === 0 && <Trophy size={24} />}
                {index === 1 && <Medal size={24} />}
                {index === 2 && <Award size={24} />}
                {index > 2 && index + 1}
              </div>

              <div>

                <h3 className="text-xl font-bold">
                  {worker.name}
                </h3>

                <p className="text-zinc-500">
                  {worker.hours} ore lucrate
                </p>

              </div>

            </div>

            <div className="text-right">

              <div className="text-3xl font-black text-yellow-400">
                {worker.kwp.toFixed(2)}
              </div>

              <div className="text-zinc-500">
                kWp
              </div>

            </div>

          </motion.div>
        ))}

      </div>
    </motion.div>
  );
}