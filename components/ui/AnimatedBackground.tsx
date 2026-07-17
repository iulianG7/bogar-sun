"use client";

export default function AnimatedBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-50 bg-[#080808]" />

      <div className="fixed left-[-180px] top-[-180px] -z-40 h-[420px] w-[420px] rounded-full bg-yellow-400/20 blur-[160px]" />

      <div className="fixed right-[-200px] bottom-[-200px] -z-40 h-[450px] w-[450px] rounded-full bg-yellow-500/10 blur-[180px]" />

      <div className="fixed left-1/2 top-1/2 -z-40 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />
    </>
  );
}