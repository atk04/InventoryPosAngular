import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProduct } from '../common/add-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl='http://localhost:8080/api/product-list';

  constructor(private httpClient: HttpClient) {}


}
