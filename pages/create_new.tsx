import Head from "next/head";
import Form from "../components/Form";
import Navbar from "~/components/Navbar/Navbar";

export default function create_new() {
  return (
    <>
      <Head>
        <title>Create New</title>
      </Head>
      <Navbar />
      <Form />
    </>
  );
}
