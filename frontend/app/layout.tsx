import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { RouteGuard } from "@/components/route-guard"
import { ConditionalNavigation, ConditionalLayout } from "@/components/conditional-navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { FontSizeProvider } from "./font-size-provider"
import { AccessibilityProvider } from "./accessibility-provider"
import I18nProvider from "./i18n-provider"
import LanguageSwitcher from "@/components/language-switcher"

export const metadata: Metadata = {
  title: "REACH Hong Kong - Assignment Hub",
  description: "Educational platform for kindergarten English learning",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="bg-gray-50">
        <I18nProvider>
          <AuthProvider>
            <RouteGuard>
              <FontSizeProvider>
                <AccessibilityProvider>
                  <div className="absolute top-3 left-3 z-50">
                    <LanguageSwitcher />
                  </div>
                  <ConditionalLayout>{children}</ConditionalLayout>
                  <ConditionalNavigation />
                </AccessibilityProvider>
              </FontSizeProvider>
            </RouteGuard>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
