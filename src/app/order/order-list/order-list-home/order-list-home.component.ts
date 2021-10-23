import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Invoice } from 'src/app/common/invoice';
import { SaveInvoice } from 'src/app/common/save-invoice';
import { InvoiceApicallService } from 'src/app/services/invoice-apicall.service';
import { InvoiceDetailApiCallService } from 'src/app/services/invoice-detail-api-call.service';
import {
  SnotifyPosition,
  SnotifyService,
  SnotifyToastConfig,
} from 'ng-snotify';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-order-list-home',
  templateUrl: './order-list-home.component.html',
  styleUrls: ['./order-list-home.component.scss'],
})
export class OrderListHomeComponent implements OnInit {

  //Snotify Message
  style = 'material';
  title = 'Alert Message';
  body = 'text';
  timeout = 1500;
  position: SnotifyPosition = SnotifyPosition.rightBottom;
  progressBar = true;
  closeClick = true;
  newTop = true;
  filterDuplicates = false;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 50;
  bodyMaxLength = 80;

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

  constructor(private invoiceApiCallService: InvoiceApicallService,
    private invoiceDetailApiCallService:InvoiceDetailApiCallService,
    private snotifyService: SnotifyService,private route: ActivatedRoute) {}

  //orderList for display
  orderList: SaveInvoice[] = [];
  ngOnInit(): void {
this.route.queryParams.subscribe(params=>{
  if(params.updateSuccess=="true"){
  this.title = 'Update Order';
              this.body = 'Name: ' + params.name;
              setTimeout(() => {
                this.onSuccess();
              }, 1500);

  }
  if(params.updateSuccess=="false"){
    this.title = 'Update Order Fail';
              this.body = 'Name: ' + params.name;
              setTimeout(() => {
                this.onError();
              }, 1500);
  }

  if(params.createSuccess=="true"){
    this.title = 'Create Order';
                this.body = 'Name: ' + params.name;
                setTimeout(() => {
                  this.onSuccess();
                }, 1500);

    }
    if(params.createSuccess=="false"){
      this.title = 'Create Order Fail';
                this.body = 'Name: ' + params.name;
                setTimeout(() => {
                  this.onError();
                }, 1500);
    }
})
    this.OrderListByIdDesc();
  }
  OrderListByIdDesc() {
    this.invoiceApiCallService
      .getInvoiceOrderByIdDescPaginate(this.thePageNumber - 1, this.pageSize)
      .subscribe(this.processResult());
  }

  OrderListByIdDescAfterDelete() {
    this.invoiceApiCallService
      .getInvoiceOrderByIdDescPaginate(this.thePageNumber, this.pageSize)
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


  //Snotify Alert
  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax,
        // @ts-ignore
        filterDuplicates: this.filterDuplicates,
      },
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover,
    };
  }

  //Snotify Alert Methods
  onSuccess() {
    this.snotifyService.success(this.body, this.title, this.getConfig());
  }
  onInfo() {
    this.snotifyService.info(this.body, this.title, this.getConfig());
  }
  onError() {
    this.snotifyService.error(this.body, this.title, this.getConfig());
  }
  onWarning() {
    this.snotifyService.warning(this.body, this.title, this.getConfig());
  }


onDelete(invoiceId:number){


  this.invoiceDetailApiCallService
      .deleteInvoiceById(invoiceId)
      .subscribe({
        next:response=>{
          this.title = 'Delete Success';
          this.body = 'Customer Name: ' + `${response.message}`;
          this.onSuccess();
          this.OrderListByIdDescAfterDelete();
        },
        error:err=>{
          this.title = `Error`;
          this.body = 'Delete Fail';
          this.onError();
          this.OrderListByIdDescAfterDelete();
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
