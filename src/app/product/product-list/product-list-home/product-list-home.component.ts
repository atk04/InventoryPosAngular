import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductList } from 'src/app/common/product-list';
import { Products } from 'src/app/common/products';
import { ProductService } from 'src/app/services/product.service';
import {
  SnotifyPosition,
  SnotifyService,
  SnotifyToastConfig,
} from 'ng-snotify';
import { ProductApicallService } from 'src/app/services/product-apicall.service';

@Component({
  selector: 'app-product-list-home',
  templateUrl: './product-list-home.component.html',
  styleUrls: ['./product-list-home.component.scss'],
})
export class ProductListHomeComponent implements OnInit {
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

  products: ProductList[] = [];

  // MatPaginator Output
  pageEvent: PageEvent;

  // MatPaginator Inputs
  thePageNumber: number = 1;
  length: number = 0;
  pageSize: number = 3;
  pageSizeOptions: number[] = [3, 6, 9, 12];

  onPaginate(pageEvent: PageEvent) {
    this.pageSize = +pageEvent.pageSize;
    this.thePageNumber = +pageEvent.pageIndex + 1;
    this.productList();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  constructor(
    private productService: ProductService,
    private productApiCallService: ProductApicallService,
    private snotifyService: SnotifyService
  ) {}

  ngOnInit(): void {
    this.productList();
  }
  productList() {
    this.productService
      .getProductsPaginate(this.thePageNumber - 1, this.pageSize)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data) => {
      this.products = data._embedded.productList;
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

  onDelete(id: number) {
    this.productApiCallService.deleteProductById(id).subscribe({
      next: (response) => {
        this.title = 'Delete Success';
        this.body = 'Product: ' + `${response.message}`;
        this.onSuccess();
        this.productList();
      }
    });
  }
}
