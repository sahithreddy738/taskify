import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { siteConfig } from "@/config/site";

const poppinsFont = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets:["latin"]
});



export const metadata: Metadata = {
  title: {
    default:siteConfig.name,
    template:`%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons:[
    {
      url:'/logo.svg',
      href:'/logo.svg',
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppinsFont.className}
      >
        {children}
      </body>
    </html>
  );
}
