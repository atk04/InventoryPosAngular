import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
private categoryUrl='http://localhost:8080/api/product-category';
  constructor(private httpClient:HttpClient) { }
  getProductCategories():Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response=>response._embedded.productCategory)
    )
  }
  getProductCategoriesPaginate(thePage:number,thePageSize:number):Observable<GetResponseProductCategory>{
    const searchUrl=`${this.categoryUrl}?page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProductCategory>(searchUrl);
  }

  getProductCategoryUpdate(theCategoryId:number):Observable<ProductCategory[]>{
    const searchUrl=`${this.categoryUrl}/${theCategoryId}`;
    return this.httpClient.get<GetResponseProductCategory>(searchUrl).pipe(
      map(response=>response._embedded.productCategory)
    )
  }
}


interface GetResponseProductCategory{
  "_embedded": {
    "productCategory": ProductCategory[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

