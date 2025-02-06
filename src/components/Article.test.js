import { render, screen, getDefaultNormalizer } from "@testing-library/react";
import { assertPropTypes } from "check-prop-types";
import Article from "./Article";

describe("Article: Article tests", () => {
  let article;

  beforeEach(() => {
    article = {
      id: 42,
      title: "Title of sample article",
      contents: "Body of the sample article",
      edited: new Date("2020-06-10T14:54:40Z").toISOString(),
    };
  });

  test("Article: title is displayed", () => {
    render(<Article currentArticle={article} />);
    expect(screen.getByText(article.title)).toBeInTheDocument();
    expect(screen.getByText(article.title)).toBeVisible();
  });

  test("Article: body is displayed", () => {
    render(<Article currentArticle={article} />);
    expect(screen.getByText(article.contents)).toBeInTheDocument();
    expect(screen.getByText(article.contents)).toBeVisible();
  });

  test("Article: date is displayed", () => {
    render(<Article currentArticle={article} />);
    const expectedDate = new Date(article.edited).toLocaleString();
    expect(
      screen.getByText(expectedDate, {
        normalizer: getDefaultNormalizer({ collapseWhitespace: false }),
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(expectedDate, {
        normalizer: getDefaultNormalizer({ collapseWhitespace: false }),
      }),
    ).toBeVisible();
  });

  test("Article: prop-types detect missing or incorrect props", () => {
    assertPropTypes(
      Article.propTypes,
      { currentArticle: article },
      "prop",
      Article.name,
    );

    expect(() =>
      assertPropTypes(Article.propTypes, {}, "prop", Article.name),
    ).toThrow();
    expect(() => {
      const { id, ...currentArticle } = article;
      assertPropTypes(
        Article.propTypes,
        { currentArticle },
        "prop",
        Article.name,
      );
    }).toThrow();
    expect(() => {
      const { title, ...currentArticle } = article;
      assertPropTypes(
        Article.propTypes,
        { currentArticle },
        "prop",
        Article.name,
      );
    }).toThrow();
    expect(() => {
      const { contents, ...currentArticle } = article;
      assertPropTypes(
        Article.propTypes,
        { currentArticle },
        "prop",
        Article.name,
      );
    }).toThrow();
    expect(() => {
      const { edited, ...currentArticle } = article;
      assertPropTypes(
        Article.propTypes,
        { currentArticle },
        "prop",
        Article.name,
      );
    }).toThrow();
  });
});
