import { UserProvider } from "@/contexts/UserContext";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <div className={poppins.variable}>
          <Component {...pageProps} />
        </div>
      </MantineProvider>
    </UserProvider>
  );
}
