"use client";

import { Bell, Search, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-8 backdrop-blur-xl">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Bun venit, Iulian 👋
        </h1>

        <p className="text-sm text-zinc-400">
          Bogar Sun Management
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition">
          <Search size={20} className="text-white" />
        </button>

        <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition">
          <Bell size={20} className="text-white" />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-yellow-400"></span>
        </button>

        <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition">
          <Settings size={20} className="text-white" />
        </button>

        <div className="ml-2 flex items-center gap-3 rounded-2xl bg-zinc-900 px-3 py-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 font-bold text-black">
            I
          </div>

          <div>
            <p className="font-semibold text-white">Iulian</p>
            <p className="text-xs text-zinc-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}