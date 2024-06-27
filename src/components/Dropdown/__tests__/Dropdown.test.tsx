import { Theme } from "@radix-ui/themes";
import { render, screen, waitFor } from "@testing-library/react";
import Dropdown, { IDropdown } from "..";

const DropdownComponent = (props: IDropdown) => {
  return (
    <Theme>
      <form data-testid="select">
        <Dropdown {...props} id="select" />
      </form>
    </Theme>
  );
};

describe("Client side Dropdown", () => {
  const props: {
    data: { [x: string]: { name: string; id: number } };
    queryAttribute: string;
  } = {
    data: {
      A: { name: "A", id: 1 },
      B: { name: "B", id: 2 },
      C: { name: "C", id: 3 },
    },
    queryAttribute: "data",
  };
  it("Should render the dropdown with the options correctly", () => {
    const { data, queryAttribute } = props;
    render(<DropdownComponent data={data} queryAttribute={queryAttribute} />);

    expect(screen.getByTestId("select")).toBeDefined();
  });
  it("Should display all data options correctly", async () => {
    const { data, queryAttribute } = props;
    render(<DropdownComponent data={data} queryAttribute={queryAttribute} />);
    await waitFor(() => {
      Object.values(props.data).forEach(({ name }) =>
        expect(screen.queryByText(name)).toBeDefined()
      );
    });
  });
});
