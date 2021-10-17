import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProduct } from '../common/add-product';
import { OrderProduct } from '../common/order-product';
import { UpdateProduct } from '../common/update-product';

@Injectable({
  providedIn: 'root'
})
export class ProductApicallService {
private  createProductUrl='http://localhost:8080/api/product/create';
private updateProductUrl='http://localhost:8080/api/product/update';
private updateProductWithoutImageUrl='http://localhost:8080/api/product/updateProductWithoutImage';
private updateProductStockUrl='http://localhost:8080/api/product/updateStock';
private deleteProductByIdUrl='http://localhost:8080/api/product/delete';
  constructor(private httpClient: HttpClient) { }
  saveProduct(formData:FormData):Observable<any>{
   return this.httpClient.post(this.createProductUrl,formData);
  }

  updateProduct(formData:FormData):Observable<any>{
    return this.httpClient.put(this.updateProductUrl,formData);
   }

   updateProductWithoutImage(updateProduct:UpdateProduct):Observable<any>{
    return this.httpClient.put(this.updateProductWithoutImageUrl,updateProduct);
   }

   updateProductStock(orderProduct:OrderProduct):Observable<any> {
    return this.httpClient.put(this.updateProductStockUrl, orderProduct);
  }

  deleteProductById(id:number):Observable<any>{
    const deleteUrl=`${this.deleteProductByIdUrl}?id=${id}`;
    return this.httpClient.delete(deleteUrl);
  }
}
