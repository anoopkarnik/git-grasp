
import type { Metadata } from "next";
import "../../../packages/ui/src/styles/shadcn/shadcn-green.css"
import "../../../packages/ui/src/styles/custom/scroll.css"
import "../../../packages/ui/src/styles/custom/heroBackgroundAnimation.css"
import "../../../packages/ui/src/styles/custom/spotlight.css"
import { geistSans, geistMono, cyberdyne } from "@repo/ui/typography/font";
import { navbarSection} from "../lib/constants/landing-page/navbar";
import { heroSection } from "../lib/constants/landing-page/hero";
import { ThemeProvider } from "@repo/ui/providers/theme-provider";
import { Toaster } from "@repo/ui/molecules/home/Toaster/v1";
import { TanstackProvider } from "../providers/tanstack-provider";
import NextTopLoader from "nextjs-toploader";
import { DataProvider } from "../context/DataContext";


export const metadata: Metadata = {
  title: navbarSection.title,
  description: heroSection.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${geistSans.className} ${geistMono.variable} ${cyberdyne.variable} antialiased`} >
          <TanstackProvider>
            <NextTopLoader color="#10b981" showSpinner={false} />
            <ThemeProvider defaultTheme="dark"   >
              <DataProvider>
              {children}
              </DataProvider>
              <Toaster />
            </ThemeProvider>
          </TanstackProvider>
      </body>
    </html>
  );
}
