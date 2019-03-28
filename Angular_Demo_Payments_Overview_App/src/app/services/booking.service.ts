import { Booking, Transaction } from './../models/booking';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookingsTable } from '../models/bookings-table';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  // URL of the sandbox: to be set by you:
  sandboxHost = '';

  // Token: to be set by you;)
  // tslint:disable-next-line:max-line-length
  token = '';

  // required accountID for the API endpoint to get transanctions at this account
  accountID = 20071316;

  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
  });
  params = new HttpParams()
    .set('from_date', '2017-05-10')
    .set('to_date', '2018-07-28')
    .set('offset', '0')
    .set('limit', '2000');

  constructor(
    private http: HttpClient,
    private datepipe: DatePipe) {
  }

  getAvqBookings() {
    // API endpoint: /account-management/accounts/{accountId}/transactions
    const callUrl = `${this.sandboxHost}/accounts/${this.accountID}/transactions`;
    const response = <Observable<any>> this.http.get(callUrl, {headers: this.header, params: this.params });
    return response.pipe(map(data => {
      console.log(data);
      return new BookingsTable(data.map(item => {
        // console.log(item);
        return new Booking( item.bookingId , new Transaction(Number(item.amount.value), item.amount.sign));
        })
      );
    }));
  }


  getAvqBookingsDates(start: Date, end: Date) {
    this.params = new HttpParams()
    .set('from_date', this.datepipe.transform(start, 'yyyy-MM-dd'))
    .set('to_date', this.datepipe.transform(end, 'yyyy-MM-dd'))
    .set('offset', '0')
    .set('limit', '2000');
  }




}
