"use client";

export default function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        rounded-[34px]
        border border-white/10
        bg-white/5
        backdrop-blur-3xl
        shadow-[0_15px_50px_rgba(0,0,0,.35)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}