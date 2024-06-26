"use client";
import { isNumber } from "lodash";
import { IMatchday } from "../../../global";
import Dropdown from "../Dropdown";

interface IMatchdaySelect {
  lastMatchday: number | undefined;
  matchday?: string | undefined;
}

function MatchdaySelect({ matchday, lastMatchday }: IMatchdaySelect) {
  if (!isNumber(lastMatchday)) {
    return null;
  }

  const data = Array.from({
    length: lastMatchday,
  }).reduce((acc: { [x: string]: IMatchday }, _, index) => {
    acc[`${index + 1}`] = {
      id: index + 1,
      name: `${index + 1}ª rodada`,
    };
    return acc;
  }, {});

  return (
    <Dropdown
      data={data}
      queryAttribute="matchday"
      defaultValue={matchday}
      placeholder="Selecione uma rodada"
      shouldOrderList={false}
    />
  );
}

export default MatchdaySelect;
