import { BASE_URL } from "@/constants";
import { Card, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { Dictionary, first, groupBy, isEmpty, last, orderBy } from "lodash";
import Image from "next/image";
import { Suspense } from "react";
import { IChampionship, IMatch } from "../../../global";
import { Loading } from "../Dropdown/loading";
import Match from "../Match";
import MatchdaySelect from "../MatchdaySelect";

interface IGetMatches {
  championship?: string;
  team?: string;
  matchday?: string;
}

interface IMatches extends IGetMatches {}

async function getMatches({
  championship,
  matchday,
  team,
}: IGetMatches): Promise<{
  matches: Dictionary<IMatch[]>;
  championship: IChampionship;
  lastMatchday: number | undefined;
}> {
  const urlParams = new URLSearchParams();
  if (!!matchday) {
    urlParams.set("matchday", matchday);
  }
  if (!!team && championship) {
    urlParams.set("competitions", championship);
  }
  let endpoint = team
    ? `${BASE_URL}/teams/${team}/matches`
    : `${BASE_URL}/competitions/${championship}/matches`;

  endpoint += `?${urlParams.toString()}`;

  const res = await fetch(endpoint, {
    headers: {
      "X-AUTH-TOKEN": process.env.X_AUTH_TOKEN as string,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message);
  }

  let { matches, competition: currentChampionship } = await res.json();
  if (!currentChampionship && !isEmpty(matches)) {
    const matchFromTeam = first(matches) as { competition: IChampionship };
    currentChampionship = matchFromTeam?.competition;
  }

  const allMatches = matches as IMatch[];
  const lastMatchday = last(allMatches)?.matchday;

  if (!!team && !!matchday) {
    matches = [...allMatches].filter(
      (match) => Number(matchday) === match?.matchday
    );
  }

  return {
    matches: groupBy(
      orderBy(matches, ["matchday"], ["asc"]),
      (o) => o?.matchday
    ),
    championship: currentChampionship,
    lastMatchday,
  };
}

async function Matches(params: IMatches) {
  const { matches, championship, lastMatchday } = await getMatches(params);

  if (isEmpty(matches)) {
    return (
      <Text my="4" size="4" align="center" weight="bold">
        Esse filtro não retornou <u>nenhum</u> resultado!
      </Text>
    );
  }

  return (
    <Section pt="0">
      <Suspense key={params.matchday} fallback={<Loading />}>
        <MatchdaySelect
          lastMatchday={lastMatchday}
          matchday={params.matchday}
        />
      </Suspense>
      <Flex direction="column" align="center" gap="4" width="100%" mt="8">
        <Flex direction="column" align="center" gap="4">
          <Flex gap="4" align="center" wrap="wrap">
            {championship?.name && (
              <Heading as="h2" size={{ initial: "4", md: "5" }}>
                {championship?.name}
              </Heading>
            )}
            {championship?.emblem && (
              <Image
                width={48}
                height={48}
                alt={`${championship?.name} ícone`}
                src={championship?.emblem}
              />
            )}
          </Flex>
          {Object.entries(matches).map(([group, matches]) => {
            const groupName = group !== "null" ? `${group}ª rodada` : "Final";
            return (
              <Card key="group">
                <Text>{groupName}</Text>
                {matches.map((match) => (
                  <Match data={match} key={match.id} />
                ))}
              </Card>
            );
          })}
        </Flex>
      </Flex>
    </Section>
  );
}

export default Matches;
