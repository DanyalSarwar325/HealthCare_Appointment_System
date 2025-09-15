import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import {FooterPage} from "@/app/components/footer"




import AuthProvider from "@/context/AuthProvider";
import { Navbar } from "./components/Navbar";

export const metadata: Metadata = {
  title: "MediConnect",
  description: "Your health is our first priority",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      
    
        
      <body className="{nunito.classname}">
  <AuthProvider>
        <Navbar />
        {children}
        <FooterPage/>
      
   
      </AuthProvider>
         </body>
    </html>
  );
}
