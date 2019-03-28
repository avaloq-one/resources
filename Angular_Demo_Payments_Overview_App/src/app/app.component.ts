import { DatePipe } from '@angular/common';
import { BookingsTable } from './models/bookings-table';
import { BookingService } from './services/booking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DebCredApp';

  private bookingTable: BookingsTable;

  private startDate: Date;
  private startDate2: Date;
  private endDate: Date;


constructor(private bookingService: BookingService,
            private datepipe: DatePipe) {
}


public barChartOptions = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels = [''];
public barChartType = 'bar';
public barChartLegend = true;
public barChartData = [];


ngOnInit() {
  this.makeCall();
}

makeCall() {
  this.bookingService.getAvqBookings().subscribe( data => {
    this.bookingTable = data;
    console.log(data);
    this.barChartData = [
      {data: [this.bookingTable.getDebitSum()], label: 'Income'},
      {data: [this.bookingTable.getCreditSum()], label: 'Expenditures'}
    ];
  }
  );
}


test() {
  this.bookingService.getAvqBookingsDates(this.startDate, this.endDate);
  this.makeCall();
}




}
