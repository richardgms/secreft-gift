import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-romantic",
  subsets: ["latin"],
  display: "swap",
});



export const generateViewport = () => ({
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#e94560",
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Museu Flutuante 💕 | Para Mayanne",
  description: "Um museu pessoal do nosso amor - Uma experiência digital única e romântica criada especialmente para você, Mayanne.",
  keywords: ["presente", "amor", "relacionamento", "memórias", "romântico", "museu", "digital"],
  authors: [{ name: "Nathan" }],
  creator: "Nathan",
  publisher: "Nathan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  icons: {
    icon: "/images/icon/baleia.png",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <meta name="color-scheme" content="dark light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${playfairDisplay.variable} ${dancingScript.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
