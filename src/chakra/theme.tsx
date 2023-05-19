// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";

// 2. Extend the theme to include custom colors, fonts, etc
// const colors = {
//   brand: {
//     100: "#FF3c00",
//   },
// };

// const fonts = {
//   body: "Open Sans, sans-serif",
// };

// export const theme = extendTheme({ colors, fonts });

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#ff3c00",
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
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});
