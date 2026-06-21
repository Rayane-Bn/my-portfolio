import { NextResponse } from "next/server";
import { Resend } from "resend";

// Free-tier email send: Resend's free plan covers 100 emails/day / 3,000/month,
// no card required. Needs RESEND_API_KEY in the environment — see .env.example.

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are all required." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    return NextResponse.json(
      { error: "Contact form isn't configured yet. Set RESEND_API_KEY and CONTACT_TO_EMAIL." },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      // resend.dev sender works without owning/verifying a domain — fine to
      // start with, swap for a verified domain address later if you want.
      from: "Portfolio contact form <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Try again shortly." },
      { status: 500 },
    );
  }
}
