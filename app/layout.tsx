import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

/* Montserrat → titres, navigation, accents (SemiBold/Bold/ExtraBold) */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

/* Inter → corps de texte, UI (Regular/Medium/SemiBold) */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://www.drive-asso.fr";
const TITLE = "DriveAsso, la gestion associative nouvelle génération";
const DESCRIPTION =
  "DriveAsso conçoit pour les associations et clubs sportifs un site internet sur-mesure à leurs couleurs, qui sert aussi de plateforme de gestion complète : inscription en ligne des adhérents, paiements, espace administrateur et mailing intégré.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · DriveAsso",
  },
  description: DESCRIPTION,
  applicationName: "DriveAsso",
  keywords: [
    "logiciel association",
    "gestion club sportif",
    "site internet association",
    "inscription en ligne adhérents",
    "logiciel club sport",
    "logiciel gestion adhérents",
    "site web club sportif",
    "plateforme gestion association",
    "association loi 1901",
    "logiciel association loi 1901",
  ],
  authors: [{ name: "DriveAsso" }],
  creator: "DriveAsso",
  publisher: "DriveAsso",
  alternates: { canonical: "/" },
  // Favicon = icône seule DriveAsso (maillons), carrée et centrée.
  // app/icon.png (512) et app/apple-icon.png (180) sont auto-générés par Next ;
  // on ajoute ici les petites tailles nettes 16/32 pour l'onglet.
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "DriveAsso",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/driveasso-horizontal.png",
        width: 1200,
        height: 630,
        alt: "DriveAsso, la gestion associative nouvelle génération",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/driveasso-horizontal.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

/* Données structurées — JSON-LD Organization */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DriveAsso",
  url: SITE_URL,
  logo: `${SITE_URL}/images/driveasso-horizontal.png`,
  description: DESCRIPTION,
  slogan: "Gérer. Automatiser. Développer.",
  email: "contact@drive-asso.fr",
  areaServed: "FR",
  knowsAbout: [
    "Gestion d'association",
    "Gestion de club sportif",
    "Inscription en ligne des adhérents",
    "Sites internet pour associations",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
