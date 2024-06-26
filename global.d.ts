export interface IChampionship {
  id: number;
  area: IArea;
  name: string;
  code: string;
  type: string;
  emblem: string;
  plan: string;
  currentSeason: ICurrentSeason;
  numberOfAvailableSeasons: number;
  lastUpdated: string;
}

export interface IArea {
  id: number;
  name: string;
  code: string;
  flag: any;
}

export interface ICurrentSeason {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: any;
}

export interface IChampionshipIndex {
  [x: string]: IChampionship;
}

export interface ISearchParams {
  [x: string]: string;
}

export interface ITeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
}

export interface ITeamIndex {
  [x: string]: ITeam;
}

export interface IMatch {
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  group: any;
  lastUpdated: string;
  homeTeam: IHomeTeam;
  awayTeam: IAwayTeam;
  score: IScore;
}

export interface IHomeTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface IAwayTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface IScore {
  winner: string;
  duration: string;
  fullTime: IFullTime;
}

export interface IFullTime {
  home: number;
  away: number;
}

export interface IMatchday {
  id: number;
  name: string;
}
