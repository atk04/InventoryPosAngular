import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProduct } from '../common/add-product';

@Injectable({
  providedIn: 'root'
})
export class ProductApicallService {
private  createProductUrl='http://localhost:8080/api/product/create';
private updateProductUrl='http://localhost:8080/api/product/update';
private deleteProductByIdUrl='http://localhost:8080/api/product/delete';
  constructor(private httpClient: HttpClient) { }
  saveProduct(formData:FormData):Observable<any>{
   return this.httpClient.post(this.createProductUrl,formData);
  }

  updateProduct(formData:FormData):Observable<any>{
    return this.httpClient.put(this.updateProductUrl,formData);
   }

  deleteProductById(id:number):Observable<any>{
    const deleteUrl=`${this.deleteProductByIdUrl}?id=${id}`;
    return this.httpClient.delete(deleteUrl);
  }
}
