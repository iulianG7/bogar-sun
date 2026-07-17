"use client";

import {
  Bell,
  MapPin,
} from "lucide-react";

export default function GlassHeader() {
  return (
    <div className="space-y-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[5px] text-yellow-400">
            Bogar Sun
          </p>

          <h1 className="mt-2 text-4xl font-black leading-tight">
            Salut, Iulian 👋
          </h1>

        </div>

        <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

          <Bell
            size={22}
            className="text-yellow-400"
          />

        </button>

      </div>

      <div className="rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur-3xl">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black">

            <MapPin size={26} />

          </div>

          <div>

            <p className="text-sm text-zinc-500">

              Obiectul de azi

            </p>

            <h2 className="text-xl font-bold">

              Nu este atribuit

            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}