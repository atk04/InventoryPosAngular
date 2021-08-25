import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { ProductList } from '../common/product-list';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'http://localhost:8080/api/product-list';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<ProductList[]> {
    return this.httpClient
      .get<GetProductsResponse>(this.productUrl)
      .pipe(map(response => response._embedded.productList));
  }
  getCategoryByProductId(ProductId:number):Observable<GetResponseProductCategory>{
    const searchUrl=`${this.productUrl}/${ProductId}/productCategory`;
    return this.httpClient.get<GetResponseProductCategory>(searchUrl);
  }

  getProductsPaginate(thePage:number,thePageSize:number):Observable<GetProductsResponse>{
    const searchUrl=`${this.productUrl}?page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetProductsResponse>(searchUrl);
  }

}

interface GetProductsResponse {
  "_embedded": {
    "productList": ProductList[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory{
  "_embedded": {
    "productCategory": ProductCategory[];
  }
}
