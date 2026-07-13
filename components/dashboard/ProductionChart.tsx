"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { day: "L", kwp: 25 },
  { day: "Ma", kwp: 42 },
  { day: "Mi", kwp: 37 },
  { day: "J", kwp: 65 },
  { day: "V", kwp: 58 },
  { day: "S", kwp: 71 },
  { day: "D", kwp: 48 },
];

export default function ProductionChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[32px] border border-white/10 bg-zinc-900/70 backdrop-blur-xl p-8"
    >
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black text-white">
            Producție săptămânală
          </h2>

          <p className="mt-2 text-zinc-400">
            kWp instalați
          </p>

        </div>

        <div className="rounded-2xl bg-yellow-400 px-5 py-3 font-bold text-black">
          Live
        </div>

      </div>

      <div className="mt-10 h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="color"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#FACC15"
                  stopOpacity={0.8}
                />

                <stop
                  offset="100%"
                  stopColor="#FACC15"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#27272a"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
              stroke="#71717a"
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="kwp"
              stroke="#FACC15"
              strokeWidth={4}
              fill="url(#color)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );
}