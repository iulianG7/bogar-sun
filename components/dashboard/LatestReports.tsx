"use client";

import { motion } from "framer-motion";
import { Clock3, MapPin, Zap } from "lucide-react";

interface Report {
  id: string;
  workerName: string;
  project: string;
  kwp: number;
  hours: number;
  didWork: boolean;
  reason?: string;
}

interface Props {
  reports: Report[];
}

export default function LatestReports({ reports }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-[32px] border border-white/10 bg-zinc-900/70 backdrop-blur-xl p-8"
    >
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black">
            Ultimele rapoarte
          </h2>

          <p className="mt-2 text-zinc-400">
            Ultimele 5 rapoarte trimise
          </p>

        </div>

      </div>

      <div className="mt-8 space-y-4">

        {reports.slice(0,5).map((report) => (

          <motion.div
            key={report.id}
            whileHover={{
              scale:1.01
            }}
            className="rounded-3xl border border-white/10 bg-zinc-950 p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-xl font-bold text-yellow-400">
                  {report.workerName}
                </h3>

                <div className="mt-3 flex flex-wrap gap-4 text-zinc-400">

                  <div className="flex items-center gap-2">

                    <MapPin size={16}/>

                    {report.project}

                  </div>

                  <div className="flex items-center gap-2">

                    <Zap size={16}/>

                    {report.kwp} kWp

                  </div>

                  <div className="flex items-center gap-2">

                    <Clock3 size={16}/>

                    {report.hours} ore

                  </div>

                </div>

                {!report.didWork && (

                  <div className="mt-3 text-red-400">

                    Motiv: {report.reason}

                  </div>

                )}

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.div>
  );
}