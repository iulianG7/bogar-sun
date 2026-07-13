"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sun, ArrowRight } from "lucide-react";

export default function HeroBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5 }}
      className="relative overflow-hidden rounded-[36px] border border-white/10"
    >
      {/* Background */}

      <Image
  src="/images/solar-hero.png"
  alt="Solar Hero"
  fill
  priority
  className="object-cover"
/>

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-yellow-500/20" />

      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-yellow-500/30 blur-[140px]" />

      <div className="relative z-10 flex min-h-[340px] flex-col justify-center px-10 py-12">

        <div className="flex items-center gap-3">

          <div className="rounded-2xl bg-yellow-400 p-3">

            <Sun
              className="text-black"
              size={30}
            />

          </div>

          <span className="tracking-[5px] uppercase text-yellow-400 font-bold">

            Bogar Sun Management

          </span>

        </div>

        <h1 className="mt-8 text-6xl font-black leading-tight">

          Bun venit,
          <br />
          Administrator 👋

        </h1>

        <p className="mt-6 max-w-2xl text-xl text-zinc-300">

          Monitorizează toate echipele, lucrătorii,
          obiectele și productivitatea într-un singur loc.

        </p>

        <div className="mt-10 flex gap-5">

          <button className="rounded-2xl bg-yellow-400 px-8 py-4 font-bold text-black transition hover:scale-105">

            Dashboard

          </button>

          <button className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 backdrop-blur-xl transition hover:bg-white/20">

            Vezi rapoarte

            <ArrowRight size={20} />

          </button>

        </div>

      </div>

    </motion.section>
  );
}