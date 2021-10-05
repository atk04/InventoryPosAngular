import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetInvoiceDetail } from '../common/get-invoice-detail';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailService {
private invoiceDetailUrl='http://localhost:8080/api/invoice-detail';
  constructor(private httpClient:HttpClient) { }
  getInvoiceDetail():Observable<GetInvoiceDetail[]>{
    return this.httpClient.get<getResponseInvoiceDetail>(this.invoiceDetailUrl).pipe(
      map(response=>response._embedded.invoiceDetail)
    )
  }
}

interface getResponseInvoiceDetail{
  "_embedded": {
    "invoiceDetail": GetInvoiceDetail[];
  }
}
