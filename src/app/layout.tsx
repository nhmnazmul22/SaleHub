import React from "react";
import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/Layouts/AppSidebar/AppSidebar";
import {SidebarProvider} from "@/components/ui/sidebar";
import Navbar from "@/components/Layouts/Navbar/Navbar";
import {ThemeProvider} from "@/providers/ThemeProvider";

const PoppinsFont = Poppins({
    variable: "--font-poppins",
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets:["latin"]
})

export const metadata: Metadata = {
  title: "SaleHub | A POS application",
  description: "Salehub a POS application to mange the business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${PoppinsFont.className} antialiased`}
      >
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          <SidebarProvider>
              <AppSidebar/>
              <main className="w-full">
                  <Navbar/>
                  <div className="p-5">
                      {children}
                  </div>
              </main>
          </SidebarProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
