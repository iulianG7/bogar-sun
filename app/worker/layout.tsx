"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  ClipboardPlus,
  History,
  User,
} from "lucide-react";

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  const menu = [
    {
      href: "/worker/dashboard",
      icon: House,
      title: "Acasă",
    },
    {
      href: "/worker/report",
      icon: ClipboardPlus,
      title: "Raport",
    },
    {
      href: "/worker/history",
      icon: History,
      title: "Istoric",
    },
    {
      href: "/worker/profile",
      icon: User,
      title: "Profil",
    },
  ];

  return (

    <div className="relative min-h-screen overflow-hidden bg-[#080808] text-white">
        <div className="absolute left-[-150px] top-[-150px] h-96 w-96 rounded-full bg-yellow-400/15 blur-[140px]" />

      <div className="absolute right-[-180px] bottom-[-180px] h-[420px] w-[420px] rounded-full bg-yellow-500/10 blur-[180px]" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pt-6 pb-28">

        {children}

      </main>
      <nav className="fixed bottom-6 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2">

  <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#111111]/90 p-3 backdrop-blur-3xl">

    <div className="absolute left-1/2 top-0 h-20 w-40 -translate-x-1/2 bg-yellow-400/10 blur-3xl" />

    <div className="relative flex items-center justify-around">

      {menu.map((item) => {

        const Icon = item.icon;

        const active = pathname === item.href;

        return (

          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center"
          >

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                active
                  ? "bg-yellow-400 text-black shadow-[0_0_35px_rgba(250,204,21,.35)]"
                  : "text-zinc-500"
              }`}
            >

              <Icon size={24} />

            </div>

            <span
              className={`mt-2 text-[11px] ${
                active
                  ? "text-yellow-400"
                  : "text-zinc-500"
              }`}
            >

              {item.title}

            </span>

          </Link>

        );

      })}

    </div>

  </div>

</nav>
      </div>

  );

}