"use server";
import { BASE_URL } from "@/constants";
import { ITeam, ITeamIndex } from "../../../global";
import Dropdown from "../Dropdown";

interface ITeamSelect {
  championship?: string;
  team?: string;
}

async function getTeams(championship?: string): Promise<ITeamIndex> {
  if (!!championship && new RegExp(/\d+/g).test(championship)) {
    const res = await fetch(`${BASE_URL}/competitions/${championship}/teams`, {
      headers: {
        "X-AUTH-TOKEN": process.env.X_AUTH_TOKEN as string,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.message);
    }

    const { teams } = await res.json();

    return teams.reduce((acc: ITeamIndex, team: ITeam) => {
      acc[team.id] = team;
      return acc;
    }, {});
  } else {
    throw new Error("Parâmetros inválidos");
  }
}

async function TeamSelect({ championship, team }: ITeamSelect) {
  const data = await getTeams(championship);

  return (
    <Dropdown
      data={data}
      iconAttribute="crest"
      queryAttribute="team"
      defaultValue={team}
      placeholder="Selecione a equipe"
    />
  );
}

export default TeamSelect;
