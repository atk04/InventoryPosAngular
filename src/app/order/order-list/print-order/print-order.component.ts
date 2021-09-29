import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Companies } from 'src/app/common/companies';
import { InvoiceProduct } from 'src/app/common/invoice-product';
import { InvoiceTotal } from 'src/app/common/invoice-total';
import { OrderList } from 'src/app/common/order-list';
import { InvoiceDetailApiCallService } from 'src/app/services/invoice-detail-api-call.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.scss'],
})
export class PrintOrderComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private invoiceDetailApiCallService: InvoiceDetailApiCallService,
    private invoiceService: InvoiceService
  ) {}
  invoiceId: number;
  private routeSub: Subscription;
  //Order list for invoice view
  orderList: OrderList[] = [];
  customerName: String;
  invoiceNo: number;
  orderDate: String;
  productItem: InvoiceProduct = new InvoiceProduct();
  productList: InvoiceProduct[] = [];
  invoiceItem:InvoiceTotal=new InvoiceTotal();

  selectCompany: Companies = new Companies();

  companyName: String;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.invoiceId = +params['id'];
      this.invoiceDetailApiCallService
        .getInvoiceDetailById(this.invoiceId)
        .subscribe((data) => {
          this.orderList = data;

          this.customerName = this.orderList[0].invoice.customerName;
          this.invoiceNo = this.orderList[0].invoice.id;
          this.orderDate = this.orderList[0].orderDate;
          for (let i = 0; i < this.orderList.length; i++) {
            this.productItem.productName = this.orderList[i].productName;
            this.productItem.productQuantity =
              this.orderList[i].productQuantity;
            this.productItem.productPrice = this.orderList[i].productPrice;
            this.productItem.total =
              this.productItem.productQuantity * this.productItem.productPrice;
            this.productList.push(this.productItem);
            this.productItem=new InvoiceProduct();
          }

          this.invoiceItem.subTotal=this.orderList[0].invoice.subTotal;
          this.invoiceItem.tax=this.orderList[0].invoice.tax;
          this.invoiceItem.discount=this.orderList[0].invoice.discount;
          this.invoiceItem.total=this.orderList[0].invoice.total;
          this.invoiceItem.paid=this.orderList[0].invoice.paid;
          this.invoiceItem.due=this.orderList[0].invoice.due;
          this.invoiceItem.paymentType=this.orderList[0].invoice.paymentType;

        });
    });

    this.invoiceService
      .getCompanyByInvoiceId(this.invoiceId)
      .subscribe((data) => {
        this.selectCompany.name = data.name;
        this.selectCompany.address = data.address;
        this.selectCompany.emailAddress = data.emailAddress;
        this.selectCompany.phoneNumber = data.phoneNumber;
        this.selectCompany.websiteAddress = data.websiteAddress;
      });
  }
}
