"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Protected from "@/app/protected";
import Glow from "@/components/ui/Glow";

import {
  Menu,
  X,
  Bell,
  LayoutDashboard,
  Users,
  UserCircle,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  SunMedium,
  ChevronRight,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Echipe",
    href: "/admin/teams",
    icon: Users,
  },
  {
    title: "Lucrători",
    href: "/admin/workers",
    icon: UserCircle,
  },
  {
    title: "Rapoarte",
    href: "/admin/reports",
    icon: FileText,
  },
  {
    title: "Statistici",
    href: "/admin/statistics",
    icon: BarChart3,
  },
  {
    title: "Setări",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Protected>

      <div className="min-h-screen bg-[#09090B] text-white">

        <Glow />

        {menuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        <div className="flex">

          {/* Sidebar */}

          <aside
            className={`
            fixed md:relative
            left-0
            top-0
            z-50
            h-screen
            w-80
            border-r
            border-white/10
            bg-black/40
            backdrop-blur-3xl
            transition-all
            duration-300
            ${
              menuOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }
          `}
          >

            <div className="flex h-full flex-col p-8">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <Image
                    src="/logo.png"
                    alt="logo"
                    width={60}
                    height={60}
                    priority
                    className="drop-shadow-[0_0_25px_rgba(250,204,21,.6)]"
                  />

                  <div>

                    <h1 className="text-2xl font-black">
                      Bogar Sun
                    </h1>

                    <p className="text-xs uppercase tracking-[4px] text-yellow-400">
                      Management
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="md:hidden"
                >
                  <X />
                </button>

              </div>

              <div className="mt-12 space-y-3">
                {menu.map((item) => {

                  const Icon = item.icon;
                  const active = pathname === item.href;

                  return (

                    <Link
                      key={item.href}
                      href={item.href}
                    >

                      <div
                        className={`
                          group
                          flex
                          items-center
                          justify-between
                          rounded-2xl
                          px-5
                          py-4
                          transition-all
                          duration-300
                          cursor-pointer
                          ${
                            active
                              ? "bg-yellow-400 text-black shadow-[0_0_40px_rgba(250,204,21,.25)]"
                              : "text-zinc-400 hover:bg-white/5 hover:text-white"
                          }
                        `}
                      >

                        <div className="flex items-center gap-4">

                          <Icon size={22} />

                          <span className="font-semibold">

                            {item.title}

                          </span>

                        </div>

                        <ChevronRight
                          size={18}
                          className={`transition ${
                            active
                              ? ""
                              : "opacity-0 group-hover:opacity-100"
                          }`}
                        />

                      </div>

                    </Link>

                  );

                })}

              </div>

              <div className="mt-auto">

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-xl font-black text-black">

                      I

                    </div>

                    <div>

                      <h3 className="font-bold">

                        Iulian

                      </h3>

                      <p className="text-sm text-zinc-400">

                        Administrator

                      </p>

                    </div>

                  </div>

                  <button
                    className="
                      mt-5
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-2xl
                      bg-red-500
                      py-4
                      font-bold
                      transition
                      hover:bg-red-600
                    "
                  >

                    <LogOut size={20} />

                    Logout

                  </button>

                </div>

              </div>

            </div>

          </aside>

          {/* Content */}

          <div className="flex-1 md:ml-0">

            <header className="sticky top-0 z-30 border-b border-white/10 bg-[#09090B]/70 backdrop-blur-3xl">

              <div className="flex h-20 items-center justify-between px-6">

                <button
                  onClick={() => setMenuOpen(true)}
                  className="rounded-2xl bg-yellow-400 p-3 text-black md:hidden"
                >

                  <Menu />

                </button>

                <div>

                  <p className="text-sm uppercase tracking-[4px] text-yellow-400">

                    Administrator

                  </p>

                  <h2 className="mt-1 text-3xl font-black">

                    Bun venit 👋

                  </h2>

                </div>

                <div className="flex items-center gap-4">
                    <button className="relative rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">

                    <Bell size={22} />

                    <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-yellow-400" />

                  </button>

                  <button className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">

                    <SunMedium size={22} />

                  </button>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 font-black text-black">

                      I

                    </div>

                    <div>

                      <p className="font-bold">
                        Iulian
                      </p>

                      <p className="text-xs text-zinc-400">
                        Administrator
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </header>

            <main className="relative overflow-hidden p-8">

              {children}

            </main>

          </div>

        </div>

      </div>

    </Protected>

  );

}