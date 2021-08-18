import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Category } from 'src/app/common/category';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryApicallService } from 'src/app/services/product-category-apicall.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { InventoryPos } from 'src/app/validators/inventory-pos';
import {
  SnotifyPosition,
  SnotifyService,
  SnotifyToastConfig,
} from 'ng-snotify';
@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.component.html',
  styleUrls: ['./category-home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryHomeComponent implements OnInit {
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

  //Category
  category: Category = new Category();
  // MatPaginator Inputs
  thePageNumber: number = 1;
  length: number = 0;
  pageSize: number = 3;
  pageSizeOptions: number[] = [3, 6, 9, 12];

  onPaginate(pageEvent: PageEvent) {
    this.pageSize = +pageEvent.pageSize;
    this.thePageNumber = +pageEvent.pageIndex + 1;
    this.listProductCategories();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  productCategories: ProductCategory[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private productCategoryApiCallService: ProductCategoryApicallService,
    private snotifyService: SnotifyService
  ) {}

  categoryFormGroup: FormGroup;

  ngOnInit(): void {
    this.categoryFormGroup = this.formBuilder.group({
      categoryName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
    });

    this.listProductCategories();
  }

  //End Snotify Message Config

  //categoryName Getter for validation
  get categoryName() {
    return this.categoryFormGroup.get('categoryName');
  }

  listProductCategories() {
    this.productCategoryService
      .getProductCategoriesPaginate(this.thePageNumber - 1, this.pageSize)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data) => {
      this.productCategories = data._embedded.productCategory;
      this.thePageNumber = data.page.number;
      this.pageSize = data.page.size;
      this.length = data.page.totalElements;
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

  onSubmit() {
    if (this.categoryFormGroup.invalid) {
      this.categoryFormGroup.markAllAsTouched();
      return;
    }
    this.category.categoryName =
      this.categoryFormGroup.controls['categoryName'].value;
    this.productCategoryApiCallService
      .saveProductCategory(this.category)
      .subscribe({
        next: (response) => {
          this.title = 'Add Success';
          this.body = 'Category: ' + `${response.categoryName}`;
          this.onSuccess();

          this.listProductCategories();
        },
        error: (err) => {
          this.title = `Error`;
          this.body = 'Add Fail';
          this.onError();
          this.listProductCategories();
        },
      });
  }
  onDelete(id: number) {
    this.productCategoryApiCallService.deleteProductCategoryById(id).subscribe({
      next: (response) => {
        this.title = 'Delete Success';
        this.body = 'Category: ' + `${response.message}`;
        this.onSuccess();
        this.listProductCategories();
      }
    });
  }
}
