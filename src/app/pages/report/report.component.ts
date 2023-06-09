import { Component } from '@angular/core';
import * as moment from 'moment';
import { BookingReport } from 'src/app/model/booking-report';
import { Tenant } from 'src/app/model/tenant';
import { User } from 'src/app/model/user';
import { AccountsService } from 'src/app/service/accounts.service';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  bookings: BookingReport[] = []
  currentPeriod = "DAILY"
  startDate!: Date
  endDate!: Date
  tenant! : Tenant | undefined

  constructor(private bookingService: BookingService, private accountsService: AccountsService) { }

  ngOnInit(){
    const user = this.accountsService.userValue as User
    if (user) {
      this.tenant = user.tenant
      this.loadReport()
    }
  }
  setCurrentPeriod(period: string) {
    this.currentPeriod = period
    switch (period) {
      case "DAILY":
        this.startDate = moment().startOf('day').toDate();
        this.endDate = moment().endOf('day').toDate();
        break;
      case "WEEKLY":
        this.startDate = moment().startOf('week').toDate();
        this.endDate = moment().endOf('week').toDate();
        break;
      case "MONTHLY":
        this.startDate = moment().startOf('month').toDate();
        this.endDate = moment().endOf('month').toDate();
        break;
    }
    this.loadReport()
  }

  loadReport(){
    const startDate = moment(this.startDate).format()
    const endDate = moment(this.endDate).add(1, 'days').format()

    // @ts-ignore
    this.bookingService.getTenantBookingReport(this.tenant.id, startDate, endDate)
      .subscribe(bookings => this.bookings = bookings)
  }
}
