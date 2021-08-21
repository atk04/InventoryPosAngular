import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private addProductUrl='http://localhost:8080/api/product/create';

  constructor(private httpClient: HttpClient) {}
}
