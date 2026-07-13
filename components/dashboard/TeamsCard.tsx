"use client";

import { motion } from "framer-motion";
import { Users, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Worker {
  team?: string;
}

interface Props {
  workers: Worker[];
}

export default function TeamsCard({ workers }: Props) {
  const team1 = workers.filter((w) => w.team === "1").length;
  const team2 = workers.filter((w) => w.team === "2").length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-[32px] border border-white/10 bg-zinc-900/70 backdrop-blur-xl p-8"
    >
      <div className="flex items-center gap-3">

        <Users className="text-yellow-400" />

        <h2 className="text-3xl font-black">
          Echipe
        </h2>

      </div>

      <div className="mt-8 space-y-5">

        <Link href="/admin/teams/1">

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="cursor-pointer rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-zinc-950 to-yellow-500/10 p-6"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-2xl font-bold">
                  Echipa 1
                </h3>

                <p className="mt-2 text-zinc-400">

                  {team1} lucrători

                </p>

              </div>

              <ChevronRight className="text-yellow-400" />

            </div>

          </motion.div>

        </Link>

        <Link href="/admin/teams/2">

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="cursor-pointer rounded-3xl border border-blue-500/20 bg-gradient-to-r from-zinc-950 to-blue-500/10 p-6"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-2xl font-bold">
                  Echipa 2
                </h3>

                <p className="mt-2 text-zinc-400">

                  {team2} lucrători

                </p>

              </div>

              <ChevronRight className="text-blue-400" />

            </div>

          </motion.div>

        </Link>

      </div>

    </motion.div>
  );
}