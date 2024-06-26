import { ClockIcon } from "@radix-ui/react-icons";
import { Card, Flex, Grid, Text, TextProps } from "@radix-ui/themes";
import { format } from "date-fns";
import { isNumber } from "lodash";
import { IMatch } from "../../../global";
import Team from "../Team";

interface IMatchComponent {
  data: IMatch;
}

type IColor = TextProps["color"];

const Match = ({ data }: IMatchComponent) => {
  const { homeTeam, awayTeam, score, utcDate } = data;
  const winner = score?.winner;

  const isHomeTeamWinner = winner === "HOME_TEAM";
  const isAwayTeamWinner = winner === "AWAY_TEAM";

  const { homeTeamScoreColor, awayTeamScoreColor } = {
    homeTeamScoreColor: isHomeTeamWinner ? "green" : "gray",
    awayTeamScoreColor: isAwayTeamWinner ? "green" : "gray",
  };

  return (
    <Card my="4">
      <Flex direction="column">
        <Grid
          columns="5"
          gap="2"
          width={{ initial: "auto", md: "600px" }}
          align="center"
        >
          {homeTeam && <Team isWinner={isHomeTeamWinner} data={homeTeam} />}
          <Text
            color={homeTeamScoreColor as IColor}
            weight="bold"
            size="6"
            align="right"
          >
            {isNumber(score?.fullTime?.home) ? score?.fullTime?.home : "X"}
          </Text>
          <Text align="center">-</Text>
          <Text
            color={awayTeamScoreColor as IColor}
            weight="bold"
            size="6"
            align="left"
          >
            {isNumber(score?.fullTime?.away) ? score?.fullTime?.away : "X"}
          </Text>
          {awayTeam && <Team isWinner={isAwayTeamWinner} data={awayTeam} />}
        </Grid>
        <Flex width="100%" justify="center">
          <Flex align="center" gap="2">
            <ClockIcon />
            <Text align="center">
              {utcDate
                ? format(utcDate, "dd/MM/yyyy HH:ss")
                : "Horário não definido"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Match;
