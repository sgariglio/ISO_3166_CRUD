export interface IDateFromTo {
  from: Date;
  to: Date;
  providerId: number;
}

export class DateFromTo implements IDateFromTo {
  from: Date;
  to: Date;
  providerId: number = 0;
  ownerId: number = 0;

  constructor(from: Date, to: Date, ownerId: number, providerId?: number) {
    this.ownerId = ownerId;
    this.from = from
    //this.to = new Date(to.setDate(to.getDate() + 1));
    this.to = to;
    this.providerId = providerId!
  }
}
