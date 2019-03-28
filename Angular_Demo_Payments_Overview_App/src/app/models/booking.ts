export class Booking {
  constructor(
    public id: number,
    public transaction: Transaction,
  ) {}
}

export class Transaction {
  constructor(
    public amount: number,
    public type: string,
    ) {}
}
