import { screen, fireEvent, render } from "@testing-library/react";
import { assertPropTypes } from "check-prop-types";
import IndexBar from "./IndexBar";
import articles from "../../data/test-data.json";

const sampleSections = [
  ...new Set(articles.map((article) => article.title.charAt(0).toUpperCase())),
].sort();

describe("IndexBar: IndexBar initialization", () => {
  test("IndexBar: Handles empty array without error", () => {
    const handler = jest.fn();
    render(<IndexBar collection={[]} setCurrentArticle={handler} />);
  });
});

describe("IndexBar: Basic IndexBar functionality", () => {
  const setupIndexBar = () => {
    const selectFunction = jest.fn();
    render(
      <IndexBar collection={articles} setCurrentArticle={selectFunction} />,
    );
    return selectFunction;
  };

  test("IndexBar: Fetches and displays sections", async () => {
    setupIndexBar();
    const items = await screen.findAllByTestId("section");

    expect(items).toHaveLength(sampleSections.length);
    sampleSections.forEach((section) => {
      expect(screen.getByText(section)).toBeVisible();
    });
  });

  test("IndexBar: Clicking on a section displays titles", async () => {
    setupIndexBar();
    const section = await screen.findByText(sampleSections[0]);

    fireEvent.click(section);

    const titles = await screen.findAllByTestId("title");

    const expectedArticles = articles.filter(
      (article) => article.title.charAt(0).toUpperCase() === sampleSections[0],
    );

    expect(titles).toHaveLength(expectedArticles.length);

    expectedArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeVisible();
    });
  });

  test("IndexBar: Changing sections changes the titles", async () => {
    setupIndexBar();
    let section = await screen.findByText(sampleSections[0]);

    fireEvent.click(section);

    section = await screen.findByText(sampleSections[1]);

    fireEvent.click(section);

    const titles = await screen.findAllByTestId("title");
    const expectedArticles = articles.filter(
      (article) => article.title.charAt(0).toUpperCase() === sampleSections[1],
    );
    expect(titles).toHaveLength(expectedArticles.length);

    expectedArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });
  });

  test("IndexBar: Clicking a title selects the article", async () => {
    const selectFunction = setupIndexBar();
    const section = await screen.findByText("D");
    fireEvent.click(section);
    const title = await screen.findByText("Dalek");

    fireEvent.click(title);

    expect(selectFunction).toHaveBeenCalledWith(articles[4]);
  });
});

/* *********** Assignment three tests ********************** */

describe("IndexBar: IndexBar with currentArticle", () => {
  let selectFunction;

  beforeEach(() => {
    selectFunction = jest.fn();
  });

  test("IndexBar: currentArticle sets the current section", () => {
    render(
      <IndexBar
        collection={articles}
        setCurrentArticle={selectFunction}
        currentArticle={articles[1]}
      />,
    );

    expect(screen.getByText(articles[1].title)).toBeInTheDocument();
  });

  test("IndexBar: Changing currentArticle updates section", () => {
    const { rerender } = render(
      <IndexBar
        collection={articles}
        setCurrentArticle={selectFunction}
        currentArticle={articles[1]}
      />,
    );
    expect(screen.getByText(articles[1].title)).toBeInTheDocument();
    expect(screen.queryByText(articles[0].title)).not.toBeInTheDocument();

    rerender(
      <IndexBar
        collection={articles}
        setCurrentArticle={selectFunction}
        currentArticle={articles[0]}
      />,
    );
    expect(screen.queryByText(articles[1].title)).not.toBeInTheDocument();
    expect(screen.getByText(articles[0].title)).toBeInTheDocument();
  });
});

test("IndexBar: prop-types detects missing props", () => {
  const setCurrentArticle = jest.fn();
  assertPropTypes(
    IndexBar.propTypes,
    { collection: [], setCurrentArticle },
    "prop",
    IndexBar.name,
  );
  expect(() =>
    assertPropTypes(
      IndexBar.propTypes,
      { setCurrentArticle },
      "prop",
      IndexBar.name,
    ),
  ).toThrow();
  expect(() =>
    assertPropTypes(
      IndexBar.propTypes,
      { collection: [] },
      "prop",
      IndexBar.name,
    ),
  ).toThrow();
  expect(() =>
    assertPropTypes(
      IndexBar.propTypes,
      { collection: [{ id: 42 }], setCurrentArticle },
      "prop",
      IndexBar.name,
    ),
  ).toThrow();
  expect(() =>
    assertPropTypes(
      IndexBar.propTypes,
      { collection: [], setCurrentArticle: 42 },
      "prop",
      IndexBar.name,
    ),
  ).toThrow();
});
