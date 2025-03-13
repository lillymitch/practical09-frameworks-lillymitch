import "../styles/globals.css";
import { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";

import data from "../../data/seed.json";
import styles from "../styles/Simplepedia.module.css";

function MainApp({ Component, pageProps }) {
  const router = useRouter();
  const { id } = router.query;

  const [collection, setCollection] = useState(data);

  let currentArticle = undefined;

  const setCurrentArticle = (article) => {
    if (article) {
      router.push(`/articles/${article.id}`);
    } else {
      router.push("/articles");
    }
  };

  // var = 3 == 5 ? true : false

  if (id) {
    let result = collection.find((article) => article.id === +id);
    // ternary
    currentArticle = result ? result : undefined;
  }

  const props = {
    ...pageProps,
    collection,
    setCollection,
    currentArticle,
    setCurrentArticle,
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Simplepedia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">Simplepedia</h1>
        <Component {...props} />
      </main>
      <footer>CS 312 Assignment 3</footer>
    </div>
  );
}

export default MainApp;

MainApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
};
