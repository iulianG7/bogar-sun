"use client";

import Image from "next/image";

export default function AppSplash() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b0b0b]">

      <Image
        src="/logo.png"
        alt="Bogar Sun"
        width={180}
        height={180}
        priority
        className="animate-pulse"
      />

      <h1 className="mt-6 text-4xl font-black text-white">
        BOGAR SUN
      </h1>

      <p className="mt-2 text-zinc-400">
        Solar Management System
      </p>

    </div>
  );
}