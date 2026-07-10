"use client";

import Protected from "@/app/protected";
import Image from "next/image";
import WorkerBottomNav from "@/components/WorkerBottomNav";

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protected>
      <main className="min-h-screen bg-[#0b0b0b] text-white pb-40">
        <div className="absolute top-1 right-50">

  <Image
    src="/logo.png"
    alt="Bogar Sun"
    width={220}
    height={220}
    priority
  />

</div>
        {children}
        <WorkerBottomNav />
      </main>
    </Protected>
  );
}