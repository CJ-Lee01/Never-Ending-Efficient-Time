// 1. Import the extendTheme function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  colors: {
    navbarColor: {
      light: "#F7FAFC",
      dark: "#2D3748",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        //bg: "gray.200",
      },
    }),
  },
  config,
  components: {
    Text: {
      variants: {
        timeText: {
          fontSize: { base: "7xl", md: "9xl" },
        },
      },
    },
  },
});
