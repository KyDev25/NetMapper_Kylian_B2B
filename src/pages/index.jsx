import Head from "next/head"
import NmapForm from "./components/NmapForm"
import Links from "./components/Links"

export default function Home() {
  return (
    <>
      <Head>
        <title>NetMapper</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Links link="home" />
        <NmapForm />
      </main>
    </>
  )
}
