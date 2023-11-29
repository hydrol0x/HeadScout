export interface MatchData {
  [key: string]: any; // Replace 'any' with more specific types as per your data structure
  "Team Number": number; // Example field, adjust according to actual data
  "Match Number": number; // Example field, adjust according to actual data
}

export type SheetsData = MatchData[];

export interface RobotObject {
  [teamNumber: number]: {
    [matchNumber: number]: MatchData;
  };
}