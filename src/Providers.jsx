import * as React from "react";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";

export default function Providers({children}) {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}
