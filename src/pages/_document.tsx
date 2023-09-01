import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Where should I eat?</title>
        <meta name="description" content="For when you are hungry and indecisive. Pick a random place near you to go eat at." />
        <meta name="og:title" content="Where should I eat?" />
        <meta name="og:description" content="For when you are hungry and indecisive. Pick a random place near you to go eat at." />
        {/* <meta name="og:image" content="/assets/images/og/logo.png" /> */}
        <meta name="theme-color" content="#60a5fa" />
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
