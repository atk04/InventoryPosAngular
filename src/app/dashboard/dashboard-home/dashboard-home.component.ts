import { Component, OnInit } from '@angular/core';
import { GetInvoiceDetail } from 'src/app/common/get-invoice-detail';
import { InvoiceDetailService } from 'src/app/services/invoice-detail.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  today = new Date();
  currentDate: string = this.today.toISOString().split('T')[0];
  currentMonth = this.today.getMonth() + 1;
  curentdayOfMonthInvoiceCount: number = 0;
  invoiceDetail: GetInvoiceDetail[] = [];
  currentDay = this.today.getDay();
  todayInvoiceCount: number = 0;
  todaySale:number=0;
  monthlySale:number=0;
  constructor(private invoiceDetailService: InvoiceDetailService) {}

  ngOnInit() {
    this.getInvoiceDetail();
  }

  getInvoiceDetail() {
    this.invoiceDetailService.getInvoiceDetail().subscribe((data) => {
      this.invoiceDetail = data;
      for (let i = 0; i < this.invoiceDetail.length; i++) {
        let currentInvoiceDate = new Date(this.invoiceDetail[i].orderDate);
        let currentInvoiceMonth = currentInvoiceDate.getMonth() + 1;



        if (this.currentDay == currentInvoiceDate.getDay()) {
          this.todayInvoiceCount = this.todayInvoiceCount + 1;
          this.todaySale=this.todaySale+(this.invoiceDetail[i].productPrice*this.invoiceDetail[i].productQuantity);
        }

        if (currentInvoiceMonth == this.currentMonth) {
          this.curentdayOfMonthInvoiceCount =
            this.curentdayOfMonthInvoiceCount + 1;
            this.monthlySale=this.monthlySale+(this.invoiceDetail[i].productPrice*this.invoiceDetail[i].productQuantity);
        }
      }
    });
  }
}

function convert(str) {
  var date = new Date(str),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join('-');
}
