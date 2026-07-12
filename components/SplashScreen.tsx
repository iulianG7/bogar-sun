"use client";

import Image from "next/image";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b0b0b]">

      <Image
        src="/logo.png"
        alt="Bogar Sun"
        width={170}
        height={170}
        priority
        className="animate-pulse"
      />

      <h1 className="mt-6 text-4xl font-black text-white">
        BOGAR SUN
      </h1>

      <p className="mt-2 text-zinc-400">
        Solar Management System
      </p>

      <div className="mt-12 h-2 w-56 overflow-hidden rounded-full bg-zinc-800">
        <div className="h-full w-full animate-[loading_1.5s_linear] rounded-full bg-yellow-400" />
      </div>

    </div>
  );
}