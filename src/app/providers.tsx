"use client";

// Not in Use currently

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, Heading, ThemeProvider } from "@chakra-ui/react";
import { theme } from "@/chakra/theme";
import { ColorModeScript } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
