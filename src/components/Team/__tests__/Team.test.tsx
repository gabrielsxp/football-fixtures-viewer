import { Theme } from "@radix-ui/themes";
import { render, screen } from "@testing-library/react";
import Team, { ITeamComponent } from "..";

const TeamComponent = (props: ITeamComponent) => {
  return (
    <Theme>
      <Team {...props} />
    </Theme>
  );
};

describe("Team Component", () => {
  const props: ITeamComponent = {
    data: {
      id: 3988,
      name: "AC Goianiense",
      shortName: "AC Goianiense",
      tla: "ACG",
      crest: "https://crests.football-data.org/3988.png",
    },
    isWinner: false,
  };
  it("Should render the team correctly", () => {
    const { data, isWinner } = props;
    render(<TeamComponent data={data} isWinner={isWinner} />);

    expect(screen.getByRole("img")).toBeDefined();
    expect(screen.getByText(props.data.tla)).toBeDefined();
    expect(
      screen.getByText(props.data.tla).getAttribute("data-accent-color")
    ).toBe("gray");
  });
  it("Should render the team correctly if is winner", () => {
    const { data } = props;
    render(<TeamComponent data={data} isWinner />);

    expect(screen.getByRole("img")).toBeDefined();
    expect(screen.getByText(props.data.tla)).toBeDefined();
    expect(
      screen.getByText(props.data.tla).getAttribute("data-accent-color")
    ).toBe("green");
  });
});
