import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { InventoryPos } from 'src/app/validators/inventory-pos';

@Component({
  selector: 'app-add-product-home',
  templateUrl: './add-product-home.component.html',
  styleUrls: ['./add-product-home.component.scss'],
})
export class AddProductHomeComponent implements OnInit {
  productCategories: ProductCategory[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService
  ) {}

  productFormGroup: FormGroup;
//for validation Number or Digit
numberOrdecimalRegEx=/^[1-9]\d*(\.\d+)?$/;

//for validation Number
numberRegEx=/^[1-9]\d*$/;

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
      productCategoryId: new FormControl('',[
        Validators.required
      ]),
      purchasePrice: new FormControl('',[
        Validators.required,
        Validators.pattern(this.numberOrdecimalRegEx),
      ]),
      salePrice: new FormControl('',[
        Validators.required,
        Validators.pattern(this.numberOrdecimalRegEx)
      ]),
      stock: new FormControl('',[
        Validators.required,
        Validators.pattern(this.numberRegEx)
      ]),
      description: new FormControl('',[
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


  onSubmit() {
    console.log(this.productFormGroup.controls['productCategoryId'].value);
  }
}
