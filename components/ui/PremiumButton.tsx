"use client";

import Link from "next/link";

interface PremiumButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function PremiumButton({
  href,
  children,
}: PremiumButtonProps) {
  return (
    <Link
      href={href}
      className="
        flex
        items-center
        justify-center
        rounded-3xl
        bg-gradient-to-r
        from-yellow-300
        to-orange-500
        px-6
        py-4
        font-bold
        text-black
        shadow-[0_0_40px_rgba(250,204,21,.25)]
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-[0_0_60px_rgba(250,204,21,.45)]
      "
    >
      {children}
    </Link>
  );
}