import Head from "next/head";

import Header from "~/components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>SETU Visualiser</title>
        <meta name="description" content="Visualiser for Monash SETU data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
          <span className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            SETU<span className="text-[hsl(280,100%,70%)]">.</span>fyi
          </span>
          <p className="text-center text-xl">
            The comprehensive visualiser for unit performance
          </p>
        </div>
      </main>
    </>
  );
}
