"use client";

import { LucideIcon } from "lucide-react";
import GlassCard from "./GlassCard";

interface StatCardProps {
  title: string;
  value: string | number;
  color?: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  color = "text-yellow-400",
  icon: Icon,
}: StatCardProps) {
  return (
    <GlassCard className="p-6 transition-all duration-300 hover:scale-[1.02]">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-400">

            {title}

          </p>

          <h2 className={`mt-3 text-4xl font-black ${color}`}>

            {value}

          </h2>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10">

          <Icon
            size={28}
            className={color}
          />

        </div>

      </div>

    </GlassCard>
  );
}