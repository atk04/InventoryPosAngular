import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Invoice } from 'src/app/common/invoice';
import { SaveInvoice } from 'src/app/common/save-invoice';
import { InvoiceApicallService } from 'src/app/services/invoice-apicall.service';

@Component({
  selector: 'app-order-list-home',
  templateUrl: './order-list-home.component.html',
  styleUrls: ['./order-list-home.component.scss'],
})
export class OrderListHomeComponent implements OnInit {
  // MatPaginator Output
  pageEvent: PageEvent;

  // MatPaginator Inputs
  thePageNumber: number = 1;
  length: number = 0;
  pageSize: number = 3;
  pageSizeOptions: number[] = [3, 6, 9, 12];

  onPaginate(pageEvent: PageEvent) {
    this.pageSize = +pageEvent.pageSize;
    this.thePageNumber = +pageEvent.pageIndex + 1;
    this.OrderListByIdDesc();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  constructor(private invoiceApiCallService: InvoiceApicallService) {}

  //orderList for display
  orderList: SaveInvoice[] = [];
  ngOnInit(): void {
    this.OrderListByIdDesc();
  }
  OrderListByIdDesc() {
    this.invoiceApiCallService
      .getInvoiceOrderByIdDescPaginate(this.thePageNumber - 1, this.pageSize)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data) => {
      this.orderList = data.content;
      for (let i = 0; i < this.orderList.length; i++) {
        this.orderList[i].orderDate = convert(this.orderList[i].orderDate);
      }
      this.thePageNumber = data.number;
      this.pageSize = data.size;
      this.length = data.totalElements;
    };
  }
}

function convert(str) {
  var date = new Date(str),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join('-');
}
