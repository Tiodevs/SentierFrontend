import NextHead from 'next/head';

export default function Head({ children }){
  <NextHead>
    {/* Metadados comuns a todas as páginas */}
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {/* Código do Google Analytics */}
    <script async src={`https://www.googletagmanager.com/gtag/js?id=G-QZR093WP8F`}></script>
    <script dangerouslySetInnerHTML={{ __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-QZR093WP8F');
    `}} />

    {children} {/* Outros elementos específicos da página */}
  </NextHead>
} 