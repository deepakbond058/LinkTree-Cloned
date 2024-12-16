
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from '@/components/sessionWrapper'
import localFont from "next/font/local";


const intervariable = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-intervariable",
  weight: "100 900",
});


export const metadata = {
  title: "Link in bio tool: Everything you are, in one simple link | Linktree",
  description: "Your one stop solution to all the links",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${intervariable.variable} antialiased min-h-screen`}>
        <SessionWrapper>
          <Navbar />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
