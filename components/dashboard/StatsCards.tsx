"use client";

import { motion } from "framer-motion";
import { Zap, Users, Clock3, TrendingUp } from "lucide-react";

interface Props {
  totalKwp: number;
  totalHours: number;
  totalWorkers: number;
}

const cards = (
  totalKwp: number,
  totalHours: number,
  totalWorkers: number
) => [
  {
    title: "Total kWp",
    value: totalKwp,
    icon: Zap,
    color: "text-yellow-400",
    border: "border-yellow-500/20",
  },
  {
    title: "Lucrători",
    value: totalWorkers,
    icon: Users,
    color: "text-blue-400",
    border: "border-blue-500/20",
  },
  {
    title: "Ore",
    value: totalHours,
    icon: Clock3,
    color: "text-green-400",
    border: "border-green-500/20",
  },
  {
    title: "Productivitate",
    value: "98%",
    icon: TrendingUp,
    color: "text-purple-400",
    border: "border-purple-500/20",
  },
];

export default function StatsCards({
  totalKwp,
  totalHours,
  totalWorkers,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards(totalKwp, totalHours, totalWorkers).map(
        (card, index) => {

          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * .08,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className={`group relative overflow-hidden rounded-[30px] border ${card.border} bg-zinc-900/70 p-7 backdrop-blur-xl`}
            >

              <div className="absolute right-[-50px] top-[-50px] h-36 w-36 rounded-full bg-white/5 blur-3xl transition group-hover:scale-150" />

              <div className="flex items-center justify-between">

                <span className="text-zinc-400">

                  {card.title}

                </span>

                <Icon
                  size={28}
                  className={card.color}
                />

              </div>

              <h2
                className={`mt-8 text-5xl font-black ${card.color}`}
              >

                {card.value}

              </h2>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-800">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "80%",
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="h-full rounded-full bg-yellow-400"
                />

              </div>

            </motion.div>
          );
        }
      )}

    </div>
  );
}