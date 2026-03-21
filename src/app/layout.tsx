import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NightScroll — 18+ Short Video Platform",
  description: "Premium short-form video platform for adult content creators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
