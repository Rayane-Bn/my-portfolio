"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-3 font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-muted)] uppercase"
      >
        05 — Contact
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl"
      >
        Let&apos;s talk
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
        className="mt-10 flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm text-[var(--color-muted)]">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="rounded-lg border border-[var(--color-line)] bg-transparent px-4 py-3 text-sm transition-colors focus:border-[var(--color-accent)] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm text-[var(--color-muted)]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-lg border border-[var(--color-line)] bg-transparent px-4 py-3 text-sm transition-colors focus:border-[var(--color-accent)] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm text-[var(--color-muted)]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="rounded-lg border border-[var(--color-line)] bg-transparent px-4 py-3 text-sm transition-colors focus:border-[var(--color-accent)] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        {status === "sent" && (
          <p className="text-sm text-[var(--color-accent)]">
            Sent — thanks, I&apos;ll reply soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-[var(--color-muted)]">{errorMessage}</p>
        )}
      </motion.form>
    </section>
  );
}
