import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductList } from 'src/app/common/product-list';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
import { InventoryPos } from 'src/app/validators/inventory-pos';
import { UploadFileValidators } from 'src/app/validators/upload-file-validators';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
  productFormGroup: FormGroup;
  //for validation Number or Digit
  numberOrdecimalRegEx = /^[1-9]\d*(\.\d+)?$/;

  //for validation Number
  numberRegEx = /^[1-9]\d*$/;

  private routeSub: Subscription;
  private productId: number;

  //for data populate
  Product: ProductList = new ProductList();
  ProductCategory: ProductCategory=new ProductCategory();

  //for display product category on product add form
  productCategories: ProductCategory[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
  ) {}

  //Image Dispaly on Add Product form
  imageURL: String;

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
      productImage: new FormControl('', [
        Validators.required,
        UploadFileValidators.requiredFileType('jpg'),
      ]),
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

  get productImage() {
    return this.productFormGroup.get('productImage');
  }

  onChangeCategoryId(categoryId: number) {}

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
    });
  }

  getCategory() {
    this.productService
      .getCategoryByProductId(this.productId)
      .subscribe((data) => {
        this.ProductCategory = data;
      });
  }


  onSubmit() {}
}
