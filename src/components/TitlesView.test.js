import { screen, fireEvent, render } from "@testing-library/react";
import { assertPropTypes } from "check-prop-types";
import TitlesView from "./TitlesView";

import articles from "../../data/test-data.json";

describe("TitlesView tests", () => {
  test("TitlesView displays all titles", async () => {
    render(
      <TitlesView articles={[...articles]} setCurrentArticle={jest.fn()} />,
    );
    articles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeVisible();
    });
  });

  test("TitlesView displays only the requested articles", () => {
    render(
      <TitlesView articles={[...articles]} setCurrentArticle={jest.fn()} />,
    );
    const items = screen.getAllByTestId("title");
    expect(items).toHaveLength(articles.length);
  });

  test("Clicking on a title selects the article", async () => {
    const handler = jest.fn();
    render(<TitlesView articles={[...articles]} setCurrentArticle={handler} />);

    const elements = await Promise.all(
      articles.map((article) => screen.findByText(article.title)),
    );
    articles.forEach((article, i) => {
      fireEvent.click(elements[i]);
      expect(handler).toHaveBeenCalledWith(article);
    });
  });

  test("Titles are displayed in alphabetical order", () => {
    render(
      <TitlesView articles={[...articles]} setCurrentArticle={jest.fn()} />,
    );

    const sortedTitles = articles.map((article) => article.title);
    sortedTitles.sort((t1, t2) => t1.localeCompare(t2));

    const items = screen.getAllByTestId("title");
    const displayedTitles = items.map((item) => item.innerHTML);

    expect(displayedTitles).toEqual(sortedTitles);
  });

  test("Props are not mutated", () => {
    const inputArticles = [...articles];
    render(
      <TitlesView articles={inputArticles} setCurrentArticle={jest.fn()} />,
    );

    expect(inputArticles).toEqual(articles);
  });

  test("TitlesView: prop-types detect missing or incorrect props", () => {
    const setCurrentArticle = jest.fn();
    assertPropTypes(
      TitlesView.propTypes,
      { articles, setCurrentArticle },
      "prop",
      TitlesView.name,
    );
    expect(() =>
      assertPropTypes(TitlesView.propTypes, {}, "prop", TitlesView.name),
    ).toThrow();
    expect(() =>
      assertPropTypes(
        TitlesView.propTypes,
        { articles },
        "prop",
        TitlesView.name,
      ),
    ).toThrow();
    expect(() =>
      assertPropTypes(
        TitlesView.propTypes,
        { setCurrentArticle },
        "prop",
        TitlesView.name,
      ),
    ).toThrow();
    expect(() =>
      assertPropTypes(
        TitlesView.propTypes,
        { articles: [42], setCurrentArticle },
        "prop",
        TitlesView.name,
      ),
    ).toThrow();
  });
});
