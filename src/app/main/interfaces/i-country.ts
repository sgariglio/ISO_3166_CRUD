import { ISubdivision } from "./i-subdivision";

export interface ICountry {
  id: number;
  name: string;
  alpha2Code: string;
  numericCode: string;

  subdivisions: ISubdivision[]
}
