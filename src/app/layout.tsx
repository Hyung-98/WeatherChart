import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Weather App",
  description: "A beautiful weather application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
