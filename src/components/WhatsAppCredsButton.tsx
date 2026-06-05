"use client";

import { credentialsMessage, whatsappLink } from "@/lib/wa";

export default function WhatsAppCredsButton({
  name,
  username,
  password,
  phone,
  countryCode,
  className = "btn-primary btn-sm",
  label = "Pošalji WhatsApp",
}: {
  name: string;
  username: string;
  password: string;
  phone: string;
  countryCode: string;
  className?: string;
  label?: string;
}) {
  const msg = credentialsMessage(name, username, password);
  const href = whatsappLink(phone, msg, countryCode);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  );
}
