import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import {
  SnotifyPosition,
  SnotifyService,
  SnotifyToastConfig,
} from 'ng-snotify';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InventoryPos } from 'src/app/validators/inventory-pos';
import { ProductCategoryApicallService } from 'src/app/services/product-category-apicall.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss'],
})
export class CategoryUpdateComponent implements OnInit {
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

  productCategory: ProductCategory = new ProductCategory();
  private routeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productCategoryService: ProductCategoryService,
    private snotifyService: SnotifyService,
    private formBuilder: FormBuilder,
    private productCategoryApiCallService: ProductCategoryApicallService
  ) {}
  private currentCategoryId: number = 1;

  categoryFormGroup: FormGroup;

  ngOnInit(): void {
    //validate url id is number or not
    this.routeSub = this.route.params.subscribe((params) => {
      this.currentCategoryId = +params['id'];
      if (isNaN(this.currentCategoryId)) {
        this.router.navigate(['/', 'category-page']);
      }
    });

    this.productCategoryService
      .getProductCategoryUpdate(this.currentCategoryId)
      .subscribe({
        next: (response) => {
          // this.productCategory=response._embedded.productCategory;
          // console.log(this.productCategory);
          this.productCategory.id = +response['id'];
          this.productCategory.categoryName = response['categoryName'];
        },
        error: (err) => {
          this.router.navigate(['/', 'category-page']);
        },
      });

    // For validation
    this.categoryFormGroup = this.formBuilder.group({
      categoryName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
    });
  }

  //categoryName Getter for validation
  get categoryName() {
    return this.categoryFormGroup.get('categoryName');
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

  onUpdate() {
    if (this.categoryFormGroup.invalid) {
      this.categoryFormGroup.markAllAsTouched();
      return;
    }

    this.productCategory.categoryName =
      this.categoryFormGroup.controls['categoryName'].value;
    this.productCategoryApiCallService
      .updateProductCategory(this.productCategory)
      .subscribe({
        next: (response) => {
          this.title = 'Update Success';
          this.body = 'Category: ' + `${response.categoryName}`;
          this.onSuccess();
        }
      });

  }
}
