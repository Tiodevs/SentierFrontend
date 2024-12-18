import type { Metadata } from "next";
import "./globals.scss";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "Sentier - Soluções digitais",
  description: "Oferecemos soluções digitais diversas, que vão do marketing até a area de programção",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
