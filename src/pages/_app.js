import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import theme from "../material/theme";
import data from "../../data/seed.json";
import { styled } from "@mui/material/styles";

// We need an alternate name for theme since it is used above
const Footer = styled("footer")(({ theme: styledTheme }) => ({
  borderTop: "1px solid #eaeaea",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: styledTheme.spacing(5),
  paddingTop: styledTheme.spacing(2),
}));

export default function MainApp(appProps) {
  const { Component, pageProps } = appProps;
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

  if (id) {
    let result = collection.find((article) => article.id === +id);
    currentArticle = result ? result : undefined;
  }

  // console.log("Current Article in _app.js:", currentArticle);
  // console.log("Router ID:", id);
  // console.log("Current Article:", currentArticle);

  const props = {
    ...pageProps,
    collection,
    setCollection,
    currentArticle,
    setCurrentArticle,
  };

  return (
    <AppCacheProvider {...appProps}>
      <Head>
        <title>Simplepedia</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <main>
          <Container>
            <Typography variant="h2" align="center">
              Simplepedia
            </Typography>
            <Component {...props} />
          </Container>
        </main>

        <Footer>CS 312 Practical: CSS Frameworks</Footer>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
