import { UserProvider } from "@/contexts/UserContext";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <Component {...pageProps} />
      </MantineProvider>
    </UserProvider>
  );
}
