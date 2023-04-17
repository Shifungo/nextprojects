"use client";

import NavBar from "./components/NavBar";
import styles from "@/styles/index.module.css";
import Head from "next/head";

const IndexPage = () => {
  "use client";

  return (
    <div>
      <Head>
        <title>My page title</title>
      </Head>
      <div className={styles.indexWrapper}>
        <h1>welcome to my portfolio </h1>
      </div>
    </div>
  );
};

export default IndexPage;
