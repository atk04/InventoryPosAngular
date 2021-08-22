import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProduct } from '../common/add-product';

@Injectable({
  providedIn: 'root'
})
export class ProductApicallService {
private  createProductUrl='http://localhost:8080/api/product/create';
  constructor(private httpClient: HttpClient) { }
  saveProduct(addProduct:AddProduct):Observable<any>{
   return this.httpClient.post(this.createProductUrl,addProduct);
  }
}
