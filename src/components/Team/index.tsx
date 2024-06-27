import { Flex, Text, Tooltip } from "@radix-ui/themes";
import Image from "next/image";
import { IAwayTeam, IHomeTeam } from "../../../global";

export interface ITeamComponent {
  data: IHomeTeam | IAwayTeam;
  isWinner?: boolean;
}

const Team = ({ data, isWinner }: ITeamComponent) => {
  return (
    <Flex direction="column" justify="center" align="center" gap="2" p="2">
      <Image
        width={48}
        height={48}
        alt={`${data.name}'s crest`}
        src={data.crest}
        style={{ height: "auto" }}
      />
      <Flex maxWidth="70px">
        <Tooltip delayDuration={200} content={data.name}>
          <Text
            style={{ cursor: "help" }}
            truncate
            color={isWinner ? "green" : "gray"}
          >
            {data.tla}
          </Text>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Team;
