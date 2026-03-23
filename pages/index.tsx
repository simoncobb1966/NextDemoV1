import Head from "next/head";
import React from "react";
import Navbar from "~/components/Navbar/Navbar";

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Bunnyfied Labs</title>
      </Head>
      <main>
        <Navbar />
        <h1>Home</h1>
      </main>
    </>
  );
};

export default Home;
