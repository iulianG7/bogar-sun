"use client";

import {
  Moon,
  Sun,
  Bell,
  Languages,
  Shield,
  Info,
} from "lucide-react";

export default function SettingsPage() {

  return (

    <div className="space-y-8">

      <div>

        <p className="uppercase tracking-[5px] text-yellow-400">

          Bogar Sun

        </p>

        <h1 className="mt-3 text-5xl font-black">

          Setări

        </h1>

      </div>

      <div className="grid gap-6">
        <div className="rounded-[32px] border border-white/10 bg-zinc-900/70 p-7">

        <div className="flex items-center gap-4">

          <Moon className="text-yellow-400" size={30} />

          <div>

            <h2 className="text-2xl font-black">

              Aspect

            </h2>

            <p className="text-zinc-400">

              Schimbă tema aplicației

            </p>

          </div>

        </div>

        <div className="mt-6 flex gap-4">

          <button className="rounded-2xl bg-yellow-400 px-6 py-3 font-bold text-black">

            🌙 Dark

          </button>

          <button className="rounded-2xl bg-zinc-800 px-6 py-3">

            ☀️ Light

          </button>

        </div>

      </div>

      <div className="rounded-[32px] border border-white/10 bg-zinc-900/70 p-7">

        <div className="flex items-center gap-4">

          <Bell className="text-yellow-400" size={30} />

          <div>

            <h2 className="text-2xl font-black">

              Notificări

            </h2>

            <p className="text-zinc-400">

              Configurează alertele aplicației

            </p>

          </div>

        </div>

        <div className="mt-6 space-y-3">

          <label className="flex items-center justify-between rounded-2xl bg-black/20 p-4">

            <span>Raport nou</span>

            <input type="checkbox" defaultChecked />

          </label>

          <label className="flex items-center justify-between rounded-2xl bg-black/20 p-4">

            <span>Raport lipsă după ora 20:00</span>

            <input type="checkbox" defaultChecked />

          </label>

          <label className="flex items-center justify-between rounded-2xl bg-black/20 p-4">

            <span>Lucrător nou</span>

            <input type="checkbox" defaultChecked />

          </label>

        </div>

      </div>

      <div className="rounded-[32px] border border-white/10 bg-zinc-900/70 p-7">

        <div className="flex items-center gap-4">

          <Languages className="text-yellow-400" size={30} />

          <div>

            <h2 className="text-2xl font-black">

              Limbă

            </h2>

            <p className="text-zinc-400">

              Alege limba aplicației

            </p>

          </div>

        </div>

        <div className="mt-6 flex flex-wrap gap-3">

          <button className="rounded-2xl bg-yellow-400 px-5 py-3 font-bold text-black">

            🇷🇴 Română

          </button>

          <button className="rounded-2xl bg-zinc-800 px-5 py-3">

            🇩🇪 Germană

          </button>

          <button className="rounded-2xl bg-zinc-800 px-5 py-3">

            🇷🇺 Русский

          </button>

        </div>

      </div>

      <div className="rounded-[32px] border border-white/10 bg-zinc-900/70 p-7">

        <div className="flex items-center gap-4">

          <Info className="text-yellow-400" size={30} />

          <div>

            <h2 className="text-2xl font-black">

              Despre aplicație

            </h2>

            <p className="text-zinc-400">

              Bogar Sun Management

            </p>

          </div>

        </div>

        <div className="mt-6 space-y-2 text-zinc-300">

          <p>

            Versiune: <strong>2.0.0</strong>

          </p>

          <p>

            Dezvoltat pentru administrarea echipelor Bogar Sun.

          </p>

        </div>
        </div>
        </div>
    </div>

  );

}
