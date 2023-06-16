"use client";

import "@/styles/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "@/chakra/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NEET",
  description: "Manage your Time well",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> Buggy with NextJS*/}
        <ChakraProvider theme={theme}>
          <Navbar />
          {children}
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}

// const RootLayout = ({
//   children,
// }: {
//   children: React.ReactNode
// }) => {
//   return (
//     <html lang="en">
//        <body>
//         <main>
//           {children}
//         </main>
//         </body>
//      </html>

//   )
// }

// export default RootLayout;
