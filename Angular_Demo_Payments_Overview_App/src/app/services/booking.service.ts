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
  sandboxHost = 'https://api-k9aff.emea.sandbox.avaloq.com';

  // Token: to be set by you;)
  // tslint:disable-next-line:max-line-length
  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJhdWQiOiJzYW5kYm94Iiwic3ViIjoieHBobWFtIiwiand0IjoiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKU1V6VXhNaUo5LmV5SmhkV1FpT2lKQlZrRk1UMUVpTENKemRXSWlPaUpEU1UwaUxDSmhkbkZmY205c1pYTWlPbHNpY205c1pWOWhkM05mZFhObGNpSmRMQ0pwYzNNaU9pSktWMVJRY205MmFXUmxjaUlzSW1WNGNDSTZNVFUxTXpjME1qSTJNQ3dpYVdGMElqb3hOVFV6TnpJM09EWXdMQ0poZG1Gc2IzRmZZblZmYVdRaU9pSTVJaXdpYW5ScElqb2laemhLUlVOSlExcFZPSGRPV2tSbU1tOUhRMGQxZHlJc0ltRjJjVjlpZFNJNklrRkJRU0o5LlpuODA2QUhEcGdwbnhyZUlCVzJlLUZicERKTWZjUkFBZTNYdzZvLUY2ajIyeDVtWHpLZ1ZvOGUzOWtSSE5OZFZwY0h3MkZMN0l4emdxRURnQlFpOUtXRVZRcGtsYnN6NVoxWGlHRmpLUFhJVTA3dFB5bm93U3RIZlpWMG9ra3lGQ3BYTXp5NnYyaWYwWkNBOUppWE55WnRGUC1qSVhiTVQtZWY2eDJZNWNjYS1KNktCT0h6Y2g1LW5FVFU5TlZrSGtQNjZ2LVFSSXVic0JZM1I1TmFRTGR2bURnOEJUT1EtMzhWVExmY1p6SXI1S0MzQ05UTzVrYWNEeXBScy1WS1dHRGx4eTdHMGdDTzhuaENLTkNONHJ3TE0tOEMwd2lIa09HREFsX1cxSzNyNE1iV3BSbUlPZVlHbUE0VmwzaHhPV0FzS2dvVkoyamM2Z1FiVWN2TEx3USIsImlzcyI6IkpXVFByb3ZpZGVyIiwic2ItaWQiOiJrOWFmZiIsImV4cCI6MTU1Mzc0MjI2MCwiaWF0IjoxNTUzNzI3ODYwLCJqdGkiOiI3bDNtbG9YZ3pVaE9xXzBobEdoTkhRIn0.B-cdahtMtzJtOkrm2AMPasPvBmmOcn5GEUu1c7rrCZUqnQNFtvnZNum545jesL51qSp6LvLG4GyasjOQfSUE2Vc2WXyrXYhv0H4Z0qtERnNPBSvUg4unyIBTRuwmZPeow2mq0otrW3ZzOTXqQMGewBpUzc2n44TbnWLDjAdVBbgKyMUSwwKyR7d8BH-G0ykCKlt-wn7z9qeg1o9TqoeAf6pRPCBm4jt2bbrJKL7KtpNlFHXqZsF8wugFv6aaXOY0tZ3dxQc92poIkRVQUMkL7hx1sP1ned7h2lFBB-j1ed_Yg83M0SfpT6QEPeUKs548jmeqAGLuOIeI7rpNDzK7SA';

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
