import { ISubdivision } from "../i-subdivision";

export class Subdivision implements ISubdivision {
  id: number;
  countryId: number;
  name: string;
  history: string;
  geography: string;
  other: string;


  constructor(
    id: number,
    countryId: number,
    name: string,
    history: string,
    geography: string,
    other: string
  ) {
    this.id = id
    this.countryId = countryId;
    this.name = name
    this.history = history
    this.geography = geography
    this.other = other
  }

}
