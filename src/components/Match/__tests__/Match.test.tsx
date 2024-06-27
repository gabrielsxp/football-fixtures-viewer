import { Theme } from "@radix-ui/themes";
import { render, screen } from "@testing-library/react";
import { format } from "date-fns";
import Match, { IMatchComponent } from "..";

const MatchComponent = (props: IMatchComponent) => {
  return (
    <Theme>
      <Match {...props} />
    </Theme>
  );
};

describe("Match Component", () => {
  const props: IMatchComponent = {
    data: {
      id: 1,
      matchday: 1,
      homeTeam: {
        id: 3988,
        name: "AC Goianiense",
        shortName: "AC Goianiense",
        tla: "ACG",
        crest: "https://crests.football-data.org/3988.png",
      },
      awayTeam: {
        id: 1783,
        name: "CR Flamengo",
        shortName: "Flamengo",
        tla: "FLA",
        crest: "https://crests.football-data.org/1783.png",
      },
      score: {
        winner: "AWAY_TEAM",
        duration: "REGULAR",
        fullTime: {
          home: 1,
          away: 2,
        },
      },
      utcDate: "2024-04-14T19:00:00Z",
    },
  };
  it("Should render a match correctly, respecting the colors of a winner team", () => {
    const { data } = props;
    render(<MatchComponent data={data} />);

    expect(screen.queryAllByRole("img")).toHaveLength(2);
    expect(screen.getByText(props.data.homeTeam.tla)).toBeDefined();
    expect(screen.getByText(props.data.score.fullTime.home)).toBeDefined();
    expect(
      screen
        .getByText(props.data.score.fullTime.home)
        .getAttribute("data-accent-color")
    ).toBe("gray");
    expect(screen.getByText(props.data.awayTeam.tla)).toBeDefined();
    expect(screen.getByText(props.data.score.fullTime.away)).toBeDefined();
    expect(
      screen
        .getByText(props.data.score.fullTime.away)
        .getAttribute("data-accent-color")
    ).toBe("green");
    expect(
      screen.getByText(format(props.data.utcDate, "dd/MM/yyyy HH:ss"))
    ).toBeDefined();
  });
  it("Should render a match correctly, and for a losing team we expect that the score must not be highlighted", () => {
    const { data } = props;
    render(<MatchComponent data={data} />);
    expect(
      screen
        .getByText(props.data.score.fullTime.home)
        .getAttribute("data-accent-color")
    ).not.toBe("green");
  });
});
