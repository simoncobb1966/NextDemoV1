import Head from "next/head";
import Form from "../components/Form";
import Navbar from "~/components/Navbar/Navbar";

export default function form() {
  return (
    <>
      <Head>
        <title>Bunnyfied Labs</title>
      </Head>
      <Navbar />
      <Form />
    </>
  );
}
