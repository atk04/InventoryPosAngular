import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {
  SnotifyPosition,
  SnotifyService,
  SnotifyToastConfig,
} from 'ng-snotify';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  FormGroup,
  NgForm,
} from '@angular/forms';
import { Invoice } from 'src/app/common/invoice';
import { InvoiceDetail } from 'src/app/common/invoice-detail';
import { InvoiceDetailItem } from 'src/app/common/invoice-detail-item';
import { OrderProduct } from 'src/app/common/order-product';
import { ProductList } from 'src/app/common/product-list';
import { Products } from 'src/app/common/products';
import { InvoiceApicallService } from 'src/app/services/invoice-apicall.service';
import { InvoiceDetailApiCallService } from 'src/app/services/invoice-detail-api-call.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ProductApicallService } from 'src/app/services/product-apicall.service';
import { ProductService } from 'src/app/services/product.service';
import { OrderList } from 'src/app/common/order-list';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.scss'],
})
export class OrderUpdateComponent implements OnInit {
  //Snotify Message
  style = 'material';
  title = 'Alert Message';
  body = 'text';
  timeout = 2000;
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

  addForm: FormGroup;
  rows: FormArray;
  ProductListId: number = 0;

  CurrentProduct: Products = new Products();
  SelectedProductList: Array<Products> = [];
  ProductList: ProductList[] = [];

  ProductListItem: ProductList[] = [];

  //Customer Name
  customerName: String;

  //Subtotal
  Subtotal: number = 0;

  //Tax
  Tax: number = 0;

  //Discount
  Percent: number = 0;

  //Order total
  OrderTotal: number = 0;

  //Paid
  Paid: number = 0;

  //Due
  Due: number = 0;

  //for validation discount percent
  discountRegex = /^[1-9]$|^[1-9][0-9]$|^(100)$/;

  //for validation Number or Digit
  numberOrdecimalRegEx = /^[1-9]\d*(\.\d+)?$/;

  //for orderProduct
  orderProduct: OrderProduct = new OrderProduct();

  //create Invoice
  invoice: Invoice = new Invoice();

  //saved invoice
  //invoiceItem: InvoiceItem=new InvoiceItem();
  invoiceId: number = 0;

  //create InvoiceDetailItem
  invoiceDetailItem: InvoiceDetailItem = new InvoiceDetailItem();

  //create InvoiceProduct
  //productItem: ProductList = new ProductList();
  productId: number = 0;

  //invoiceDetail
  invoiceDetail: InvoiceDetail = new InvoiceDetail();

  //orderDate
  orderDate: NgbDate;

  //payment radio
  payment: String = 'cash';

  //order message
  orderMessage = '';

  //disable text box
  disabledText = false;

  private routeSub: Subscription;

  //Order list for update
  orderList: OrderList[] = [];

  //Stored Remove Product
  removeStock: OrderProduct[] = [];

  filterStock: OrderProduct[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private snotifyService: SnotifyService,
    private productApiCallService: ProductApicallService,
    private invoiceApiCallService: InvoiceApicallService,
    private invoiceDetailApiCallService: InvoiceDetailApiCallService,
    private invoiceService: InvoiceService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.addForm = this.formBuilder.group({
      items: [null, Validators.required],
    });
    this.rows = this.formBuilder.array([]);
  }
  productOrderForm: FormGroup;
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.invoiceId = +params['id'];
      //console.log(this.invoiceId)

      this.invoiceDetailApiCallService
        .getInvoiceDetailById(this.invoiceId)
        .subscribe((data) => {
          this.orderList = data;

          for (let i = 0; i < this.orderList.length; i++) {
            // console.log(this.orderList[i]);
            this.customerName = this.orderList[i].invoice.customerName;
            this.Subtotal = this.orderList[i].invoice.subTotal;
            this.Tax = this.orderList[i].invoice.tax;
            this.Percent = this.orderList[i].invoice.discount;
            this.OrderTotal = this.orderList[i].invoice.total;
            this.Paid = this.orderList[i].invoice.paid;
            this.Due = this.orderList[i].invoice.due;
            this.payment = this.orderList[i].invoice.paymentType;

            this.addForm.addControl('rows', this.rows);

            this.rows.push(this.createItemFormGroup());

            this.ProductListId = this.orderList[i].product.id;
            this.rows.value[i].id = this.orderList[i].product.id;
            this.rows.value[i].name = this.orderList[i].product.name;
            this.rows.value[i].stock = this.orderList[i].product.stock;
            this.rows.value[i].salePrice = this.orderList[i].product.salePrice;
            this.rows.value[i].quantity = this.orderList[i].productQuantity;
            this.rows.value[i].total =
              this.rows.value[i].quantity * this.rows.value[i].salePrice;
          }
        });

    });

    this.addForm.get('items').valueChanges.subscribe((val) => {
      if (val === true) {
        this.addForm.addControl('rows', this.rows);
      }
    });

    this.getProduct();

    this.productOrderForm = this.formBuilder.group({
      discount: new FormControl('', [Validators.pattern(this.discountRegex)]),
      paid: new FormControl('', [
        Validators.required,
        Validators.pattern(this.numberOrdecimalRegEx),
      ]),
    });
    const today = new Date();
    this.orderDate = new NgbDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
  }
  getProduct() {
    this.productService.getProducts().subscribe((data) => {
      this.ProductList = data;

      for (let i = 0; i < this.ProductList.length; i++) {
        this.ProductListItem.push(this.ProductList[i]);
      }
    });
  }

  onSelectedProduct(index: number, id: number) {
    this.ProductListId = +id;
    let currentId = this.ProductListId;
    this.productService.getProductById(currentId).subscribe((data) => {
      this.CurrentProduct.id = +data.id;
      this.CurrentProduct.name = data.name;
      this.CurrentProduct.stock = data.stock;
      this.CurrentProduct.salePrice = data.salePrice;

      let count = 0;
      for (let i = 0; i < this.rows.length; i++) {
        if (this.rows.value[i].id == this.CurrentProduct.id) {
          count++;
        }
        if (count > 1) {
          this.title = 'Create Order';
          this.body =
            'Product: ' + this.CurrentProduct.name + ' is already selected.';
          this.onInfo();
          this.Subtotal =
            this.Subtotal -
            (this.CurrentProduct.salePrice + this.rows.value[index].salePrice);
          this.onRemoveRow(index);

          break;
        } else {
          this.rows.value[index].id = this.ProductListId;
          this.rows.value[index].name = this.CurrentProduct.name;
          this.rows.value[index].stock = this.CurrentProduct.stock;
          this.rows.value[index].salePrice = this.CurrentProduct.salePrice;
          this.rows.value[index].quantity = +1;
          this.rows.value[index].total =
            this.rows.value[index].quantity * this.rows.value[index].salePrice;
        }
      }

      if (count < 2 && this.rows.length > 1) {
        this.Subtotal += this.rows.value[this.rows.length - 1].total;
        this.OrderTotal = this.Subtotal + this.Tax;
        this.OrderTotal = Math.round(this.OrderTotal);
        this.onDiscountChange(this.Percent);
      } else {
        let SubtotalValue = 0;
        for (let i = 0; i < this.rows.length; i++) {
          SubtotalValue += this.rows.value[i].total;
        }
        this.Subtotal = SubtotalValue;
        this.Tax = this.Subtotal * 0.05;

        this.OrderTotal = this.Subtotal + this.Tax;
        this.OrderTotal = Math.round(this.OrderTotal);
        this.onDiscountChange(this.Percent);
      }
      this.Due = this.OrderTotal - this.Paid;
      this.Due = Math.round(this.Due);
      //console.log(this.Subtotal);

      this.CurrentProduct = new Products();
    });

    //for disable textbox
    if (this.rows.length == 0) {
      this.disabledText = true;
    } else {
      this.disabledText = false;
    }
  }

  onClickQuantity(index: number, quantity: number) {
    this.rows.value[index].quantity = +quantity;
    if (this.rows.value[index].quantity == 0) {
      this.rows.value[index].quantity = 1;
      this.rows.value[index].total =
        this.rows.value[index].quantity * this.rows.value[index].salePrice;
      this.onRemoveRow(index);
      this.title = 'Create Order';
      this.body = 'Quantity: Quantity must not equal to zero';
      this.onInfo();
    }
    if (quantity > this.rows.value[index].stock) {
      this.title = 'Create Order';
      if (this.rows.value[index].quantity > 1) {
        this.body = 'Quantity: This much of quantity is not available';
      }
      this.onWarning();
      this.rows.value[index].quantity = +1;
      this.rows.value[index].total =
        this.rows.value[index].quantity * this.rows.value[index].salePrice;

      //recalculate the order
      let SubtotalValue = 0;
      for (let i = 0; i < this.rows.length; i++) {
        SubtotalValue += this.rows.value[i].total;
      }
      this.Subtotal = SubtotalValue;
      this.Tax = this.Subtotal * 0.05;

      this.OrderTotal = this.Subtotal + this.Tax;
      this.OrderTotal = Math.round(this.OrderTotal);
      this.onDiscountChange(this.Percent);
      this.Due = this.OrderTotal - this.Paid;
      this.Due = Math.round(this.Due);
    } else {
      this.rows.value[index].total =
        quantity * this.rows.value[index].salePrice;
      let currentSutotal = 0;
      for (let i = 0; i < this.rows.length; i++) {
        currentSutotal += this.rows.value[i].total;
      }
      this.Subtotal = currentSutotal;
      this.Tax = this.Subtotal * 0.05;

      this.OrderTotal = this.Subtotal + this.Tax;
      this.OrderTotal = Math.round(this.OrderTotal);
      this.Due = this.OrderTotal - this.Paid;
      this.Due = Math.round(this.Due);
      // console.log('Subtotal with quantity = ' + this.Subtotal);
    }
  }

  onAddRow() {
    // if (
    //   this.rows.length == 0 &&
    //   this.rows.value[0].id == null &&
    //   this.orderList.length == 0
    // ) {
    //   this.title = 'Create Order';
    //   this.body = 'Please Add Product First';
    //   this.disabledText = false;
    //   this.onInfo();
    //   return;
    // }
    this.disabledText = false;
    this.ProductListId = 0;
    this.addForm.addControl('rows', this.rows);
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number, productId?: number) {
    //console.log('RowIndex = ' + rowIndex);
    if (this.rows.length == 0) {
      this.disabledText = true;
    }
    this.Subtotal -= this.rows.value[rowIndex].total;
    this.Tax = this.Subtotal * 0.05;
    this.OrderTotal = this.Subtotal + this.Tax;
    this.OrderTotal = Math.round(this.OrderTotal);
    if (this.OrderTotal == 0) {
      this.Due = 0;
      this.Paid = 0;
    } else {
      this.Due = this.OrderTotal - this.Paid;
      this.Due = Math.round(this.Due);
    }

    // console.log('Delete with subtotal ' + this.Subtotal);
    this.rows.removeAt(rowIndex);

    for (let i = 0; i < this.orderList.length; i++) {
      if (this.orderList[i].product.id == productId) {
        let removeProductStock =
          this.orderList[i].product.stock + this.orderList[i].productQuantity;

        let orderProductItem = new OrderProduct();
        orderProductItem.id = productId;
        orderProductItem.stock = removeProductStock;

        this.removeStock.push(orderProductItem);
        orderProductItem = new OrderProduct();
        break;

        //console.log("Remove Product Id = "+removeProductId);
      }
    }
    let uniq = {};
    this.filterStock = this.removeStock.filter(
      (obj) => !uniq[obj.id] && (uniq[obj.id] = true)
    );

    for (let i = 0; i < this.filterStock.length; i++) {
      console.log(this.filterStock[i]);
    }
  }

  createItemFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: null,
      name: null,
      stock: null,
      salePrice: null,
      quantity: null,
      total: null,
    });
  }

  onDiscountChange(percent: number) {
    this.Percent = percent;
    let discountAmount = (this.Percent / 100) * (this.Subtotal + this.Tax);

    this.OrderTotal = this.Subtotal + this.Tax - discountAmount;
    this.OrderTotal = Math.round(this.OrderTotal);
    if (percent == 0) {
      this.OrderTotal = this.Subtotal + this.Tax;
      this.OrderTotal = Math.round(this.OrderTotal);
      this.Due = this.OrderTotal - this.Paid;
      this.Due = Math.round(this.Due);
    }
    if (this.Percent != 0) {
      this.Due = this.OrderTotal - this.Paid;
      this.Due = Math.round(this.Due);
    }
  }

  onPaidChange(paid: number) {
    this.Paid = paid;
    this.Due = this.OrderTotal - paid;
    this.Due = Math.round(this.Due);
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

  onUpdate(orderForm: NgForm) {
    if (orderForm.control.invalid) {
      orderForm.form.markAllAsTouched();
      return;
    }

    let count = 0;
    for (let i = 0; i < this.rows.length; i++) {
      count++;
    }

    if (count == 0) {
      this.title = 'Create Order';
      this.body = 'Please Add Product First';
      this.onInfo();
      return;
    }
    for (let i = 0; i < this.rows.length; i++) {
      if(this.rows.value[i].id==null){
        this.title = 'Create Order';
      this.body = 'Please select Product';
      this.onWarning();
      return;
      }
    }

    let numberPatten = new RegExp(/[1-9]\d*/);

    if (!numberPatten.test(orderForm.value.Paid)) {
      this.title = 'Create Order';
      this.body = 'Please fill your paid amount';
      this.onWarning();
      return;
    }

    let emptyStock = false;
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows.value[i].stock == 0) {
        emptyStock = true;
        break;
      }
    }

    if (emptyStock == true) {
      this.title = 'Create Order';
      this.body = 'Please update your empty product stock first';
      this.onWarning();
      return;
    }
    ///////////---------

    ///start Here
    //first recalculate remaining save product count
    let remainCount = 0;

    for (let i = 0; i < this.rows.length; i++) {
      let currentRowId = this.rows.value[i].id;

      for (let j = 0; j < this.orderList.length; j++) {
        if (currentRowId == this.orderList[j].product.id) {
          if (this.rows.value[i].quantity > this.orderList[j].productQuantity) {
            this.rows.value[i].stock =
              this.rows.value[i].stock -
              (this.rows.value[i].quantity - this.orderList[j].productQuantity);
            this.orderList[j].productQuantity = this.rows.value[i].quantity;
          }
          if (this.rows.value[i].quantity < this.orderList[j].productQuantity) {
            this.rows.value[i].stock =
              this.rows.value[i].stock +
              (this.orderList[j].productQuantity - this.rows.value[i].quantity);
            this.orderList[j].productQuantity = this.rows.value[i].quantity;
          }

          remainCount++;
        }
      }
    }

    for (let i = remainCount; i < this.rows.length; i++) {
      this.rows.value[i].stock =
        this.rows.value[i].stock - this.rows.value[i].quantity;
    }

    this.invoiceDetailApiCallService
      .deleteInvoiceById(this.invoiceId)
      .subscribe();



    //Update stock amount to product table
    for (let i = 0; i < this.rows.length; i++) {
      this.orderProduct.id = this.rows.value[i].id;
      this.orderProduct.stock = this.rows.value[i].stock;
      this.productApiCallService
        .updateProductStock(this.orderProduct)
        .subscribe();

      this.orderProduct = new OrderProduct();
    }


    //Update stock for deleted save product stock
    for (let i = 0; i < this.filterStock.length; i++) {
      this.orderProduct.id = this.filterStock[i].id;
      this.orderProduct.stock = this.filterStock[i].stock;
      this.productApiCallService
        .updateProductStock(this.orderProduct)
        .subscribe();

      this.orderProduct = new OrderProduct();
    }





      //Insert data to invoice and invoice detail table

    this.invoice.customerName = orderForm.value.customerName;

    this.invoice.orderDate = new Date(
      orderForm.value.orderDate.year,
      orderForm.value.orderDate.month - 1,
      orderForm.value.orderDate.day
    );
    this.invoice.subTotal = this.Subtotal;
    this.invoice.tax = this.Tax;
    this.invoice.discount = orderForm.value.Percent;
    this.invoice.total = this.OrderTotal;
    this.invoice.paid = orderForm.value.Paid;
    this.invoice.due = this.Due;
    this.invoice.paymentType = orderForm.value.payment;
    //console.log('Insert order Date =' + this.invoice.orderDate);
    this.invoiceApiCallService.saveInvoice(this.invoice).subscribe((data) => {
      this.invoiceId = +data.id;

      for (let i = 0; i < this.rows.length; i++) {
        this.productService
          .getProductById(this.rows.value[i].id)
          .subscribe((data) => {
            this.productId = +data.id;

            this.invoiceDetailItem.productName = data.name;
            this.invoiceDetailItem.productPrice = data.salePrice;
            this.invoiceDetailItem.productQuantity =
              this.rows.value[i].quantity;
            this.invoiceDetailItem.orderDate = this.invoice.orderDate;

            this.invoiceDetail.invoiceDetailItem = this.invoiceDetailItem;
            this.invoiceDetail.invoiceId = this.invoiceId;
            this.invoiceDetail.productId = this.productId;

            this.invoiceDetailApiCallService
              .createInvoiceDetail(this.invoiceDetail)
              .subscribe();
          });
      }

      //check update success or not
      this.invoiceService
        .getInvoiceByInvoiceId(this.invoiceId)
        .subscribe((data) => {
          let savedInvoiceId = +data.id;
          if (this.invoiceId == savedInvoiceId) {
            this.title = 'Update Order';
            this.body = 'Name: ' + data.customerName;
            this.onSuccess();
          }
          setTimeout(() => {
          this.router.navigate(['/', 'order-list-page']);
          },2500);
        });
    });





   // this.router.navigate(['order-list-page'],{relativeTo:this.activatedRoute});

  }
}

function convert(str) {
  var date = new Date(str),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join('-');
}
