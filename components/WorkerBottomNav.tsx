"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, ClipboardList, BarChart3, User } from "lucide-react";

export default function WorkerBottomNav() {
  const pathname = usePathname();

  const items = [
    {
      href: "/worker/dashboard",
      icon: House,
      label: "Acasă",
    },
    {
      href: "/worker/history",
      icon: ClipboardList,
      label: "Istoric",
    },
    {
      href: "/worker/statistics",
      icon: BarChart3,
      label: "Statistici",
    },
    {
      href: "/worker/profile",
      icon: User,
      label: "Profil",
    },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[95%] max-w-md rounded-[30px] border border-zinc-800 bg-[#161616]/95 backdrop-blur-xl shadow-2xl p-3">

      <div className="grid grid-cols-4">

        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-2 rounded-2xl py-3 transition ${
                active
                  ? "text-yellow-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Icon size={28} />
              <span className="text-sm font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}

      </div>

    </div>
  );
}