import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductList } from 'src/app/common/product-list';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  private routeSub: Subscription;
  private productId: number;
  Product: ProductList = new ProductList();
  ProductCategory: ProductCategory=new ProductCategory();

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.productId = +params['id'];
      this.getProduct();
      this.getCategory();

    });
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
}
