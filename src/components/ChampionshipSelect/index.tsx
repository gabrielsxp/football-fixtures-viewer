"use client";
import { IChampionshipIndex } from "../../../global";
import Dropdown from "../Dropdown";

interface IChampionshipSelect {
  data: IChampionshipIndex;
  championship?: string;
}

const ChampionshipSelect = ({ championship, data }: IChampionshipSelect) => {
  return (
    <Dropdown
      data={data}
      iconAttribute="emblem"
      queryAttribute="championship"
      placeholder="Selecione um campeonato"
      paramsBlacklist={["team", "matchday"]}
      defaultValue={championship}
    />
  );
};

export default ChampionshipSelect;
