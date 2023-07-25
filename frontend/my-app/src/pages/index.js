import Head from 'next/head'

import Nav from '@/components/Navbar'
import App from '@/components/App'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // justifyContent: 'space-between',
          minHeight: '100vh',

        }}
      >
        <Nav />
        <App />
        <Footer />
      </main>
    </>
  )
}
