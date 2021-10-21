import { Component, OnInit } from '@angular/core';
import { GetInvoiceDetail } from 'src/app/common/get-invoice-detail';
import { InvoiceDetailApiCallService } from 'src/app/services/invoice-detail-api-call.service';
import { InvoiceDetailService } from 'src/app/services/invoice-detail.service';
import {Chart}from 'chart.js'
import { SaleApicallService } from 'src/app/services/sale-apicall.service';
import { Sale } from 'src/app/common/sale';
import { OrderInvoiceList } from 'src/app/common/order-invoice-list';
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  today = new Date();
  currentDate: string = this.today.toISOString().split('T')[0];
  currentYear = this.today.getFullYear();
  currentMonth = this.today.getMonth() + 1;
  curentdayOfMonthInvoiceCount: number = 0;
  invoiceDetail: GetInvoiceDetail[] = [];
  currentDay = this.today.getDate();
  todayInvoiceCount: number = 0;
  todaySale: number = 0;
  monthlySale: number = 0;

  //for chart
  saleAmount:Sale[]=[];
  dayofMonth: string[] = [];
  dayofSale: number[] = [];
  LineChart:[];
  myChart:Chart;

  //for recent Buyer
  recentBuyer:OrderInvoiceList[]=[];

  constructor(private invoiceDetailService: InvoiceDetailService,private invoiceDetailApiService:InvoiceDetailApiCallService,private saleApiCallService:SaleApicallService) {}

  ngOnInit() {
    this.getInvoiceDetail();

this.getRecentBuyer();

  }


  getInvoiceDetail() {
    this.invoiceDetailService.getInvoiceDetail().subscribe((data) => {
      this.invoiceDetail = data;

      for (let i = 0; i < this.invoiceDetail.length; i++) {
        let currentInvoiceDate = new Date(this.invoiceDetail[i].orderDate);
        let currentInvoiceMonth = currentInvoiceDate.getMonth() + 1;

        if (this.currentYear == currentInvoiceDate.getFullYear()) {
          if (currentInvoiceMonth == this.currentMonth) {
            // console.log("Stored Date ="+currentInvoiceDate)
            if (this.currentDay == currentInvoiceDate.getDate()) {
              this.todayInvoiceCount = this.todayInvoiceCount + 1;
              this.todaySale =
                this.todaySale +
                this.invoiceDetail[i].productPrice *
                  this.invoiceDetail[i].productQuantity;
            }

            this.curentdayOfMonthInvoiceCount =
              this.curentdayOfMonthInvoiceCount + 1;
            this.monthlySale =
              this.monthlySale +
              this.invoiceDetail[i].productPrice *
                this.invoiceDetail[i].productQuantity;
          }
        }
      }





    });



  this.saleApiCallService.getSaleAmount().subscribe((data)=>{
    this.saleAmount=data;
    for(let i=0;i<this.saleAmount.length;i++){
      let currentInvoiceDate =new Date(this.saleAmount[i].orderDate);
      let currentInvoiceMonth = currentInvoiceDate.getMonth() + 1;
      let monthDay=currentInvoiceDate.getDate()+" "+getMonthName(currentInvoiceMonth);
      this.dayofMonth.push(monthDay);
      this.dayofSale.push(this.saleAmount[i].totalSale);
    }



  this.myChart = new Chart("myChart", {
    type: 'bar',
    data: {
        labels: this.dayofMonth,
        datasets: [{
            label: 'Sale Amount',
            data: this.dayofSale,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(100, 200, 64, 0.2)',
                'rgba(15, 159, 250, 0.2)',
                'rgba(140, 180, 100, 0.2)',
                'rgba(2, 190, 100, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(100, 200, 64, 1)',
                'rgba(15, 159, 250, 1)',
                'rgba(140, 180, 100, 1)',
                'rgba(2, 190, 100, 1)'

            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


})








  }

  getRecentBuyer(){
    this.invoiceDetailApiService.getRecentBuyer().subscribe((data)=>{
      this.recentBuyer=data;
    })
  }






}

function convert(str) {
  var date = new Date(str),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join('-');
}

function getMonthName(month) {
  const d = new Date();
  d.setMonth(month - 1);
  const monthName = d.toLocaleString('default', { month: 'short' });
  return monthName;
}

export function subtractDays(days: number, fromDate: Date = new Date()): Date {
  return new Date(fromDate.getTime() - days * 24 * 60 * 60 * 1000);
}
