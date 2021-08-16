import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryApicallService {
private createProductCategoryUrl='http://localhost:8080/api/category/create';
private updateProductCategoryUrl='http://localhost:8080/api/category/update';
  constructor(private httpClient:HttpClient) { }
  saveProductCategory(category:Category):Observable<any>{
return this.httpClient.post(this.createProductCategoryUrl,category);
  }
  updateProductCategory(category:Category):Observable<any>{
    return this.httpClient.put(this.updateProductCategoryUrl,category);
      }
}
