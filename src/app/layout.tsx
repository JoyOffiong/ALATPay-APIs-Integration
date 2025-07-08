"use client"

import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en">
      <body
      ><Provider store={store}> 
                <PersistGate loading={null} persistor={persistor}>
 <Header />
       <main>
        

          {children} 
       </main>  
       </PersistGate></Provider>
      </body>
    </html>
  );
}
