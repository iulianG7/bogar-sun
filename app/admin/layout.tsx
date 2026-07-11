"use client";

import { useState } from "react";
import Link from "next/link";
import Protected from "@/app/protected";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Protected>

      <div className="flex min-h-screen bg-[#0b0b0b]">

        {/* Buton telefon */}

        <button
          onClick={() => setMenuOpen(true)}
          className="fixed top-5 left-5 z-50 rounded-xl bg-yellow-400 p-3 text-black shadow-xl md:hidden"
        >
          <Menu size={28} />
        </button>

        {/* Fundal telefon */}

        {menuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/70 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Sidebar */}

        <aside
          className={`
          fixed md:static
          top-0 left-0
          z-50
          h-screen
          w-72
          bg-zinc-950
          border-r
          border-zinc-800
          p-6
          transition-transform
          duration-300
          ${
            menuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          md:translate-x-0
        `}
        >

          <div className="mb-8 flex justify-between items-center">

            <Image
              src="/logo.png"
              alt="Bogar Sun"
              width={120}
              height={120}
              className="w-24 h-auto"
              priority
            />

            <button
              onClick={() => setMenuOpen(false)}
              className="md:hidden"
            >
              <X size={30} />
            </button>

          </div>

          <nav className="space-y-3">
            <Link href="/admin/dashboard">
              <div className="rounded-xl p-4 hover:bg-zinc-800 cursor-pointer">
                📊 Dashboard
              </div>
            </Link>

            <Link href="/admin/workers">
              <div className="rounded-xl p-4 hover:bg-zinc-800 cursor-pointer">
                👷 Lucrători
              </div>
            </Link>

            <Link href="/admin/reports">
              <div className="rounded-xl p-4 hover:bg-zinc-800 cursor-pointer">
                📋 Rapoarte
              </div>
            </Link>

            <Link href="/admin/salaries">
              <div className="rounded-xl p-4 hover:bg-zinc-800 cursor-pointer">
                💰 Salarii
              </div>
            </Link>

            <Link href="/admin/settings">
              <div className="rounded-xl p-4 hover:bg-zinc-800 cursor-pointer">
                ⚙️ Setări
              </div>
            </Link>

          </nav>

        </aside>

        <main className="flex-1 p-5 pt-20 md:p-8 md:pt-8">
          {children}
        </main>

      </div>

    </Protected>
  );
}