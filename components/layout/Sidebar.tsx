"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Sun,
} from "lucide-react";

const items = [
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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 px-8 py-8">
          <div className="bg-yellow-400 rounded-2xl p-3">
            <Sun className="text-black" size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              Bogar Sun
            </h1>

            <p className="text-zinc-400 text-sm">
              Management
            </p>
          </div>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {items.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                  active
                    ? "bg-yellow-400 text-black"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <Icon size={22} />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-5">
        <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500 py-4 font-semibold text-white transition hover:bg-red-600">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}