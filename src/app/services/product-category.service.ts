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

  getProductCategoryById(theCategoryId:number):Observable<GetResponseProductCategoryById>{
    const searchUrl=`${this.categoryUrl}/${theCategoryId}`;
    return this.httpClient.get<GetResponseProductCategoryById>(searchUrl);
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

interface GetResponseProductCategoryById{
  "_embedded": {
    "productCategory": ProductCategory[];
  }
}

