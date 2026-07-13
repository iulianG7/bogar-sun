"use client";

export default function Glow() {
  return (
    <>
      <div className="fixed left-[-250px] top-[-250px] h-[500px] w-[500px] rounded-full bg-yellow-500/20 blur-[180px] pointer-events-none" />

      <div className="fixed right-[-250px] bottom-[-250px] h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[180px] pointer-events-none" />
    </>
  );
}