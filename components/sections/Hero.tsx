"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Ticker } from "@/components/ui/Ticker";
import { useState } from "react";

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <section
        id="top"
        className="dot-grid relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-16 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-muted)] uppercase"
        >
          Portfolio — 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-4xl font-[family-name:var(--font-display)] text-5xl leading-[1.02] font-bold tracking-tight md:text-7xl"
        >
          Rayane Benkradidja
          <br />
          is a{" "}
          <span className="text-[var(--color-accent)]">Front-end</span>{" "}
          Developer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
          className="mt-6 max-w-xl text-lg text-[var(--color-muted)]"
        >
          Computer Science student at ESI. Algiers, Algeria.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: -2, y: [0, -12, 0] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.3 },
            scale: { duration: 0.7, delay: 0.3 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative mt-16 w-80 md:w-[32rem]"
          style={{ aspectRatio: "552 / 452" }}
        >
          <motion.div
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src="/images/rayane-cutout.png"
              alt="Portrait of Rayane Benkradidja"
              fill
              priority
              sizes="(min-width: 768px) 512px, 320px"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src="/images/rayane-colored.png"
              alt="Portrait of Rayane Benkradidja - Colored"
              fill
              priority
              sizes="(min-width: 768px) 512px, 320px"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </section>

      <Ticker text="Front-end developer — Algiers, Algeria — Available for work —" />
    </>
  );
}
