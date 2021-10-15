import { ICountry } from "../i-country";
import { ISubdivision } from "../i-subdivision";

export class Country implements ICountry {
  id: number;
  name: string;
  alpha2Code: string;
  numericCode: string;

  divisions: ISubdivision[] = [];

  constructor(
    id: number,
    name: string,
    alpha2Code: string,
    numericCode: string
  ) {
    this.id = id
    this.name = name
    this.alpha2Code = alpha2Code
    this.numericCode = numericCode
  }

}
