// /app/layout.tsx
import React from "react";

export const metadata = {
  title: "Mata Kuliah Selector",
  description: "Pilih matkul untuk semester ini",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body style={{ fontFamily: "sans-serif", padding: "2rem" }}>
        {children}
      </body>
    </html>
  );
}
