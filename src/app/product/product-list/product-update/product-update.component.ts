import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductList } from 'src/app/common/product-list';
import { UpdateProduct } from 'src/app/common/update-product';
import { ProductApicallService } from 'src/app/services/product-apicall.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
import { InventoryPos } from 'src/app/validators/inventory-pos';
import {
  SnotifyPosition,
  SnotifyService,
  SnotifyToastConfig,
} from 'ng-snotify';
import { UploadFileValidators } from 'src/app/validators/upload-file-validators';
import { Products } from 'src/app/common/products';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
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

  productFormGroup: FormGroup;
  //for validation Number or Digit
  numberOrdecimalRegEx = /^[1-9]\d*(\.\d+)?$/;

  //for validation Number
  numberRegEx = /^[1-9]\d*$/;

  private routeSub: Subscription;
  private productId: number;

  //for data populate
  Product: ProductList = new ProductList();
  ProductCategory: ProductCategory = new ProductCategory();

  //for display product category on product add form
  productCategories: ProductCategory[] = [];

  //for update product
  ImageFile: ImageData;
  SelectedCategory: ProductCategory = new ProductCategory();
  product: Products = new Products();
  updateProduct: UpdateProduct = new UpdateProduct();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productApiCallService: ProductApicallService,
    private snotifyService: SnotifyService
  ) {}

  //Image Dispaly on Add Product form
  imageURL: String;

  productNameValue: String;
  categoryIdValue: number;
  categoryNameValue: string;
  purchasePriceValue: number;
  salePriceValue: number;
  stockValue: number;
  descriptionValue: String;
  showProductImage: boolean = false;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.productId = +params['id'];
    });

    this.productFormGroup = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
      //      productCategoryId: new FormControl(this.categoryIdValue, [Validators.required]),
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

      // productImage: new FormControl('', [
      //   Validators.required,
      //   UploadFileValidators.requiredFileType('jpg'),
      // ]),
      productImage: new FormControl(''),
    });
    this.listProductCategories();
    this.getProduct();
    this.getCategory();
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

  // get productCategoryId() {
  //   return this.productFormGroup.get('productCategoryId');
  // }
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

  get productImage() {
    return this.productFormGroup.get('productImage');
  }

  onChangeCategoryId(categoryId: number) {
    this.productCategoryService
      .getProductCategoryById(categoryId)
      .subscribe((data) => {
        this.SelectedCategory.id = +data['id'];
        this.SelectedCategory.categoryName = data['categoryName'];
      });
  }

  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.productFormGroup.patchValue({
      productImage: file,
    });
    this.productFormGroup.get('productImage').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  getProduct() {
    this.productService.getProductById(this.productId).subscribe((data) => {
      this.Product = data;
      this.productNameValue = this.Product.name;
      this.purchasePriceValue = this.Product.purchasePrice;
      this.salePriceValue = this.Product.salePrice;
      this.stockValue = this.Product.stock;
      this.descriptionValue = this.Product.description;
    });
  }

  getCategory() {
    this.productService
      .getCategoryByProductId(this.productId)
      .subscribe((data) => {
        this.ProductCategory = data;
        this.categoryIdValue = this.ProductCategory.id;
        this.categoryNameValue = this.ProductCategory.categoryName;
        this.SelectedCategory.id=this.categoryIdValue;
        this.SelectedCategory.categoryName=this.categoryNameValue;
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

  showOrHideProductImage() {
    if (this.showProductImage === false) {
      this.showProductImage = true;
      this.productFormGroup.controls['productImage'].setValidators([
        Validators.required,
        UploadFileValidators.requiredFileType('jpg'),
      ]);

    } else {
      this.showProductImage = false;
      this.productFormGroup.controls['productImage'].clearValidators();

    }
    this.productFormGroup.controls['productImage'].updateValueAndValidity();

  }
  onUpdate() {
    if (this.productFormGroup.invalid) {
      this.productFormGroup.markAllAsTouched();
      return;
    }
    this.product.id = +this.Product.id;
    this.product.name = this.productFormGroup.controls.name.value;
    this.product.purchasePrice =
      +this.productFormGroup.controls.purchasePrice.value;
    this.product.salePrice = +this.productFormGroup.controls.salePrice.value;
    this.product.stock = +this.productFormGroup.controls.stock.value;
    this.product.description = this.productFormGroup.controls.description.value;

    // console.log(this.product.productImage)
    this.ImageFile = this.productFormGroup.controls.productImage.value;
    this.updateProduct.category = this.SelectedCategory;
    this.updateProduct.product = this.product;

    var formData: any = new FormData();
    formData.append('productImage', this.ImageFile);

    formData.append(
      'updateProductRequest',
      new Blob([JSON.stringify(this.updateProduct)], {
        type: 'application/json',
      })
    );


    if(this.showProductImage){
      this.productApiCallService.updateProduct(formData).subscribe({
        next: (response) => {
          this.title = 'Update Success';
          this.body = 'Product: ' + `${response.message}`;
          this.onSuccess();
        },
        error:(err)=>{
          this.title = 'Update Error';
          this.body = 'Product: ' + `${err}`;
          this.onError();
        }
      });
    }else{
this.productApiCallService.updateProductWithoutImage(this.updateProduct).subscribe({
  next: (response) => {
    this.title = 'Update Success';
    this.body = 'Product: ' + `${response.message}`;
    this.onSuccess();
  },
});
    }




  }
}
