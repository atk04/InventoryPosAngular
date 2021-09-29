import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Companies } from 'src/app/common/companies';
import { OrderList } from 'src/app/common/order-list';
import { InvoiceDetailApiCallService } from 'src/app/services/invoice-detail-api-call.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.scss'],
})
export class PrintOrderComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private invoiceDetailApiCallService: InvoiceDetailApiCallService,
    private invoiceService:InvoiceService
    ) {}
  invoiceId: number;
  private routeSub: Subscription;
  //Order list for invoice view
  orderList: OrderList[] = [];
  selectCompany:Companies[]=[];
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.invoiceId = +params['id'];
      this.invoiceDetailApiCallService
        .getInvoiceDetailById(this.invoiceId)
        .subscribe((data) => {
          this.orderList = data;
        })
    });

    this.invoiceService.getCompanyByInvoiceId(this.invoiceId).subscribe(
      (data)=>{
        this.selectCompany=data;
      })


  }
}
