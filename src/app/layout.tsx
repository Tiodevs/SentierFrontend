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
        {/* Metadados comuns a todas as páginas */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Código do Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=G-QZR093WP8F`}></script>
        <script dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-QZR093WP8F');
    `}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
