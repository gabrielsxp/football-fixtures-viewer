import ChampionshipSelect from "@/components/ChampionshipSelect";
import { Loading as DropdownLoading } from "@/components/Dropdown/loading";
import Matches from "@/components/Matches";
import { Loading as MatchesLoading } from "@/components/Matches/loading";
import TeamSelect from "@/components/TeamSelect";
import { BASE_URL } from "@/constants";
import { Heading } from "@radix-ui/themes";
import { Suspense } from "react";
import { IChampionship, IChampionshipIndex, ISearchParams } from "../../global";

async function getChampionships(): Promise<IChampionshipIndex> {
  const res = await fetch(`${BASE_URL}/competitions`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message);
  }

  const { competitions } = (await res.json()) as {
    competitions: IChampionship[];
  };

  return competitions.reduce((acc: IChampionshipIndex, championship) => {
    acc[championship.id] = championship;
    return acc;
  }, {});
}

export default async function Home({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const championships = await getChampionships();

  const championship = searchParams?.championship;
  const team = searchParams?.team;
  const matchday = searchParams?.matchday;

  const matchesKey = `${championship}-${team}-${matchday}`;

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12">
      <Heading as="h1" size="6">
        Tabela do Campeonato
      </Heading>
      <div className="w-full max-w-7xl flex flex-col gap-4">
        <Suspense fallback={<DropdownLoading />}>
          <ChampionshipSelect
            championship={championship}
            data={championships}
          />
        </Suspense>
        {searchParams?.championship && (
          <>
            <Suspense
              key={searchParams?.championship}
              fallback={<DropdownLoading />}
            >
              <TeamSelect championship={championship} team={team} />
            </Suspense>
            <Suspense key={matchesKey} fallback={<MatchesLoading />}>
              <Matches
                championship={championship}
                team={team}
                matchday={matchday}
              />
            </Suspense>
          </>
        )}
      </div>
    </main>
  );
}
