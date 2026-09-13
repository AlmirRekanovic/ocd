import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OCD Fighters — MMA Club",
  description:
    "OCD Fighters MMA klub — treninzi, članski portal i raspored. Discipline. Dedication. Fight.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "OCD Fighters — MMA Club",
    description: "OCD Fighters MMA klub — treninzi, članski portal i raspored.",
    images: ["/logo.png"],
  },
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
