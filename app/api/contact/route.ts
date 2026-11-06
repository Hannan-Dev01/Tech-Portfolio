import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; startedAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const record = attempts.get(ip);
  if (!record || now - record.startedAt > WINDOW_MS) {
    attempts.set(ip, { count: 1, startedAt: now });
    return false;
  }
  record.count += 1;
  return record.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) return NextResponse.json({ error: "Please try again later." }, { status: 429 });

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const website = typeof body?.website === "string" ? body.website : "";

  if (website) return NextResponse.json({ ok: true });
  if (!name || !email || !message || name.length > 100 || email.length > 254 || message.length > 4000) {
    return NextResponse.json({ error: "Please complete all fields with a valid message." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_APP_PASSWORD;
  const recipient = process.env.CONTACT_EMAIL ?? user;
  if (!user || !pass || !recipient) {
    console.error("Contact form email environment variables are missing.");
    return NextResponse.json({ error: "The contact form is not configured yet. Please use the email link below." }, { status: 503 });
  }

  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transporter.sendMail({
      from: `Portfolio contact <${user}>`,
      to: recipient,
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `From: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to send portfolio contact email", error);
    return NextResponse.json({ error: "Your message could not be sent. Please email Abdul directly." }, { status: 500 });
  }
}
