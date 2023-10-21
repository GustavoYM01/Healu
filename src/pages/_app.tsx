import { UserProvider } from "@/contexts/UserContext";
import { sair } from "@/firebase/funcoes";
import { verificarAutenticado } from "@/functions/verificarUsuarioAutenticado";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === "/" || router.pathname === "/entrar") sair();
  }, []);
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
