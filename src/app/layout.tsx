import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { siteConfig } from "@/config/site"
import { ThemeProvider } from "@/components/providers/theme"
import { VisualizerProvider } from "@/components/providers/visualizer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...siteConfig,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
    ...siteConfig,
  },
}

export default function RootLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <VisualizerProvider>{children}</VisualizerProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
