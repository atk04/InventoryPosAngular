import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  FormGroup,
} from '@angular/forms';
import { ProductList } from 'src/app/common/product-list';
import { ProductService } from 'src/app/services/product.service';
import { Products } from 'src/app/common/products';
import {
  SnotifyPosition,
  SnotifyService,
  SnotifyToastConfig,
} from 'ng-snotify';
@Component({
  selector: 'app-create-order-home',
  templateUrl: './create-order-home.component.html',
  styleUrls: ['./create-order-home.component.scss'],
})
export class CreateOrderHomeComponent implements OnInit {
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
  ProductListId: number;

  CurrentProduct: Products = new Products();
  SelectedProductList: Array<Products> = [];
  ProductList: ProductList[] = [];

  ProductListItem: ProductList[] = [];

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

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private snotifyService: SnotifyService
  ) {
    this.addForm = this.formBuilder.group({
      items: [null, Validators.required],
    });
    this.rows = this.formBuilder.array([]);
  }
  productOrderForm: FormGroup;
  ngOnInit(): void {
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
    //console.log(this.ProductListId)
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
      console.log(this.Subtotal);

      this.CurrentProduct = new Products();
    });
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
      console.log('Subtotal with quantity = ' + this.Subtotal);
    }
  }

  onAddRow() {
    this.ProductListId = 0;
    this.addForm.addControl('rows', this.rows);

    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number) {
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

    console.log('Delete with subtotal ' + this.Subtotal);
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: null,
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
}
