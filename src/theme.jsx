import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bgGradient: "linear(to-b, blue.400, aqua.600)",
        backgroundAttachment: "fixed",
        minHeight: "100dvh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      "::-webkit-scrollbar": {
        width: "8px",
        height: "8px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "4px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    },
  },
  colors: {
    common: {
      50: "#f6f6f6",
      100: "#e7e7e7",
      200: "#d1d1d1",
      300: "#b0b0b0",
      400: "#888888",
      500: "#6d6d6d",
      600: "#464646",
      700: "#353535",
      800: "#252525",
      900: "#121212",
      950: "#050505",
    },

    cyan: {
      50: "#ebfffe",
      100: "#cdfeff",
      200: "#a1faff",
      300: "#52f3ff",
      400: "#1ae3f6",
      500: "#00c6dc",
      600: "#019eb9",
      700: "#097e95",
      800: "#116579",
      900: "#135366",
      950: "#063746",
    },
    aqua: {
      50: "#edfffb",
      100: "#c0fff6",
      200: "#81ffee",
      300: "#3affe5",
      400: "#00ffd5",
      500: "#00e2be",
      600: "#00b79e",
      700: "#00917e",
      800: "#007266",
      900: "#045d54",
      950: "#003a37",
    },
    "picton-blue": {
      50: "#effaff",
      100: "#def4ff",
      200: "#b6ebff",
      300: "#75deff",
      400: "#2ccfff",
      500: "#00b4f0",
      600: "#0095d4",
      700: "#0076ab",
      800: "#00648d",
      900: "#065374",
      950: "#04344d",
    },
  },
});
