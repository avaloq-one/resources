import { Booking } from './booking';
import { summaryFileName } from '@angular/compiler/src/aot/util';


export class BookingsTable {

  private listCredit: Booking[] = [];
  private listDebit:  Booking[] = [];
  private sumCredit: number;
  private sumDebit: number;


  constructor(private bookingArray: Booking[]) {
      // Calculations are taking place here
    this.setLists();
    this.sumCredit = this.sumLists(this.listCredit);
    this.sumDebit = this.sumLists(this.listDebit);
  }

  setLists() {
    this.bookingArray.map((booking: Booking) => {
      if (booking.transaction.type === 'CREDIT') {
        this.listCredit.push(booking); }
      if (booking.transaction.type === 'DEBIT') {
        this.listDebit.push(booking); }
    });
  }

  sumLists(bookingList: Booking[]) {
    let sum = 0;
    bookingList.map( (element: Booking) => {
      sum = element.transaction.amount + sum;
    } );
    return sum;
  }

  getDebitSum() {
    return this.sumDebit;
  }

  getCreditSum() {
    return this.sumCredit * (-1);
  }

}
