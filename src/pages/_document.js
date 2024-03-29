import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <link rel="icon" href="../../appIcon.png"></link>
        <title>MIA Portal</title>
        
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href='../../appIcon.png' width="32px" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
