import { render, screen, fireEvent } from "@testing-library/react";
import { assertPropTypes } from "check-prop-types";
import ButtonBar from "./ButtonBar";

describe("ButtonBar: ButtonBar tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
  });

  test("ButtonBar: only shows the Add button if editing is not set", () => {
    render(<ButtonBar allowEdit={false} handleClick={handler} />);

    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Edit" }),
    ).not.toBeInTheDocument();
  });

  test("ButtonBar: only shows the Add button if editing is not allowed", () => {
    render(<ButtonBar allowEdit={false} handleClick={handler} />);

    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Edit" }),
    ).not.toBeInTheDocument();
  });

  test("ButtonBar: shows all  buttons if editing is allowed", () => {
    render(<ButtonBar allowEdit handleClick={handler} />);

    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });

  test("ButtonBar: add button returns correct action", () => {
    render(<ButtonBar allowEdit handleClick={handler} />);

    fireEvent.click(screen.queryByRole("button", { name: "Add" }));

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith("add");
  });

  test("ButtonBar: edit button returns correct action", () => {
    render(<ButtonBar allowEdit handleClick={handler} />);

    fireEvent.click(screen.queryByRole("button", { name: "Edit" }));

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith("edit");
  });

  describe("ButtonBar: Button visibility tests", () => {
    test("ButtonBar: does not show edit if editing is not allowed", () => {
      render(<ButtonBar allowEdit={false} handleClick={handler} />);

      expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Edit" }),
      ).not.toBeInTheDocument();
    });

    test("ButtonBar: shows all buttons if editing is allowed", () => {
      render(<ButtonBar allowEdit handleClick={handler} />);

      expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    });
  });

  test("ButtonBar: prop-types detects missing props", () => {
    assertPropTypes(
      ButtonBar.propTypes,
      { allowEdit: true, handleClick: handler },
      "prop",
      ButtonBar.name,
    );
    expect(() =>
      assertPropTypes(ButtonBar.propTypes, {}, "prop", ButtonBar.name),
    ).toThrow();
    expect(() =>
      assertPropTypes(
        ButtonBar.propTypes,
        { allowEdit: true },
        "prop",
        ButtonBar.name,
      ),
    ).toThrow();
    expect(() =>
      assertPropTypes(
        ButtonBar.propTypes,
        { handleClick: handler },
        "prop",
        ButtonBar.name,
      ),
    ).toThrow();
  });
});
