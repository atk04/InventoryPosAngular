import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/common/invoice';
import { SaveInvoice } from 'src/app/common/save-invoice';
import { InvoiceApicallService } from 'src/app/services/invoice-apicall.service';

@Component({
  selector: 'app-order-list-home',
  templateUrl: './order-list-home.component.html',
  styleUrls: ['./order-list-home.component.scss']
})
export class OrderListHomeComponent implements OnInit {

  constructor(private invoiceApiCallService:InvoiceApicallService) { }

  //orderList for display
  orderList:SaveInvoice[]=[];
  ngOnInit(): void {
    this.OrderListByIdDesc();
  }
  OrderListByIdDesc() {
   this.invoiceApiCallService.getInvoiceOrderByIdDesc().subscribe((data)=>{
this.orderList=data;
for(let i=0;i<this.orderList.length;i++){
  this.orderList[i].orderDate=convert(this.orderList[i].orderDate);

}
   });
  }

}


function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}
