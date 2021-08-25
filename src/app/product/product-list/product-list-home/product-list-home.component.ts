import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductList } from 'src/app/common/product-list';
import { Products } from 'src/app/common/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list-home',
  templateUrl: './product-list-home.component.html',
  styleUrls: ['./product-list-home.component.scss'],
})
export class ProductListHomeComponent implements OnInit {
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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productList();
  }
  productList() {
    this.productService.getProductsPaginate(this.thePageNumber - 1, this.pageSize).subscribe(this.processResult());
  }

  processResult() {
    return (data) => {
      this.products = data._embedded.productList;
      this.thePageNumber = data.page.number;
      this.pageSize = data.page.size;
      this.length = data.page.totalElements;
    };
  }

  onDelete(){

  }
}
