import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="shortcut icon" href="/healuico.ico" />
        <meta name="author" content="Dropdata" />
      </Head>
      <body className="relative overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
