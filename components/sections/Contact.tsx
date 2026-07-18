"use client";

import { motion } from "framer-motion";
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandInstagram,
  TbBrandWhatsapp,
  TbMail,
  TbArrowUpRight,
} from "react-icons/tb";

const GMAIL =
  "https://mail.google.com/mail/u/0/?fs=1&to=nr_benkradidja@esi.dz&su=Hello+from+your+portfolio&body=Hello+Rayane,%0AI+came+across+your+portfolio.%0A%0A%5BYour+message+here%5D&tf=cm";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Rayane-Bn",
    icon: TbBrandGithub,
  },
  {
    label: "Email",
    href: GMAIL,
    icon: TbMail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/benkradidja-rayane-93a6132b6/",
    icon: TbBrandLinkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/rayane_dz_05/",
    icon: TbBrandInstagram,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/213657176064",
    icon: TbBrandWhatsapp,
  },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="relative overflow-hidden rounded-3xl px-10 py-16 md:px-16 border border-[var(--color-line)] bg-[var(--color-surface)]"
      >
        {/* Faint dot grid inside the card */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-bg) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-muted)] uppercase">
          05 — Contact
        </p>

        <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight  md:text-5xl">
          Have an awesome project idea?{" "}
          <span className="text-[var(--color-accent)]">Let&apos;s discuss</span>
        </h2>

        <p className="mt-5 max-w-md text-[var(--color-muted)]">
          Ready to bring your vision to life? Reach out and let&apos;s explore
          what we can build together.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          {/* Primary CTA */}
          <a
            href={GMAIL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
          >
            <TbMail className="h-4 w-4" />
            Send Email
            <TbArrowUpRight className="h-4 w-4" />
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <span className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-muted)] uppercase">
              Connect
            </span>
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[var(--color-muted)] transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}