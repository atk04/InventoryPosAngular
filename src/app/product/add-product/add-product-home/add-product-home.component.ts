import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddProduct } from 'src/app/common/add-product';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductApicallService } from 'src/app/services/product-apicall.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { InventoryPos } from 'src/app/validators/inventory-pos';
import {
  SnotifyPosition,
  SnotifyService,
  SnotifyToastConfig,
} from 'ng-snotify';

@Component({
  selector: 'app-add-product-home',
  templateUrl: './add-product-home.component.html',
  styleUrls: ['./add-product-home.component.scss'],
})
export class AddProductHomeComponent implements OnInit {
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

  //for display product category on product add form
  productCategories: ProductCategory[] = [];

  //for add product
  SelectedCategory: ProductCategory = new ProductCategory();
  product: Product = new Product();
  addProduct: AddProduct = new AddProduct();
  constructor(
    private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private productApiCallService: ProductApicallService,
    private snotifyService: SnotifyService
  ) {}

  productFormGroup: FormGroup;
  //for validation Number or Digit
  numberOrdecimalRegEx = /^[1-9]\d*(\.\d+)?$/;

  //for validation Number
  numberRegEx = /^[1-9]\d*$/;

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
      productCategoryId: new FormControl('', [Validators.required]),
      purchasePrice: new FormControl('', [
        Validators.required,
        Validators.pattern(this.numberOrdecimalRegEx),
      ]),
      salePrice: new FormControl('', [
        Validators.required,
        Validators.pattern(this.numberOrdecimalRegEx),
      ]),
      stock: new FormControl('', [
        Validators.required,
        Validators.pattern(this.numberRegEx),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
    });
    this.listProductCategories();
  }
  listProductCategories() {
    this.productCategoryService.getProductCategories().subscribe((data) => {
      this.productCategories = data;
    });
  }

  // Getters for validation
  get Name() {
    return this.productFormGroup.get('name');
  }

  get productCategoryId() {
    return this.productFormGroup.get('productCategoryId');
  }
  get purchasePrice() {
    return this.productFormGroup.get('purchasePrice');
  }
  get salePrice() {
    return this.productFormGroup.get('salePrice');
  }
  get stock() {
    return this.productFormGroup.get('stock');
  }

  get description() {
    return this.productFormGroup.get('description');
  }
  onChangeCategoryId(categoryId: number) {
    this.productCategoryService
      .getProductCategoryById(categoryId)
      .subscribe((data) => {
        this.SelectedCategory.id = +data['id'];
        this.SelectedCategory.categoryName = data['categoryName'];
      });
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


  onSubmit() {
    if(this.productFormGroup.invalid){
      this.productFormGroup.markAllAsTouched();
      return;
    }

    this.product.name = this.productFormGroup.controls.name.value;
    this.product.purchasePrice =
      +this.productFormGroup.controls.purchasePrice.value;
    this.product.salePrice = +this.productFormGroup.controls.salePrice.value;
    this.product.stock = +this.productFormGroup.controls.stock.value;
    this.product.description = this.productFormGroup.controls.description.value;

    this.addProduct.category = this.SelectedCategory;
    this.addProduct.product = this.product;

    this.productApiCallService.saveProduct(this.addProduct).subscribe({
      next: (response) => {
        this.title = 'Add Success';
        this.body = 'Product: ' + `${response.name}`;
        this.onSuccess();
      },
    });
  }
}
