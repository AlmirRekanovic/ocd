import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ocdmma.ba"),
  title: {
    default: "OCD Fighters — MMA & Grappling klub Sarajevo",
    template: "%s · OCD Fighters",
  },
  description:
    "OCD Fighters — MMA i grappling klub u Sarajevu (Nedžarići 7). Treninzi grapplinga, MMA i BJJ za sve nivoe, program za žene, raspored i članski portal. Glavni trener Namik Alibašić (crni pojas BJJ).",
  keywords: [
    "OCD Fighters",
    "MMA Sarajevo",
    "grappling Sarajevo",
    "BJJ Sarajevo",
    "brazilska jiu-jitsa Sarajevo",
    "MMA klub Sarajevo",
    "borilački klub Sarajevo",
    "Nedžarići",
    "Namik Alibašić",
    "treninzi za žene Sarajevo",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    type: "website",
    locale: "bs_BA",
    url: "https://ocdmma.ba",
    siteName: "OCD Fighters",
    title: "OCD Fighters — MMA & Grappling klub Sarajevo",
    description:
      "MMA i grappling klub u Sarajevu — treninzi za sve nivoe, program za žene, raspored i članski portal.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
  verification: { google: "4jGLEN-Wygs0rqH-qwXwk9INFWYDRZhldR_0eLAQKlY" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bs">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
