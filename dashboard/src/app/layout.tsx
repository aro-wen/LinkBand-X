import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkBand-X Dashboard",
  description: "Operational dashboard for the LinkBand-X mesh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b0d12] text-slate-100 antialiased">
        <main className="container mx-auto px-4 py-5">
          <h1 className="text-2xl font-semibold mb-3">LinkBand-X Dashboard</h1>
          {children}
        </main>
      </body>
    </html>
  );
}
