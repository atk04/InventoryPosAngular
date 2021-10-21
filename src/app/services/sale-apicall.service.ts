import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../common/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleApicallService {
saleAmountUrl='http://localhost:8080/api/sale/findTop10ByOrderByOrderDate';
  constructor(private httpClient: HttpClient) {}


  getSaleAmount():Observable<Sale[]>{
    return this.httpClient.get<Sale[]>(this.saleAmountUrl);
  }
}
