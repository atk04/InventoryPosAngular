import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../common/invoice';
import { SaveInvoice } from '../common/save-invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceApicallService {
private createInvoiceUrl='http://localhost:8080/api/order/createInvoice';
  constructor(private httpClient: HttpClient) { }
  saveInvoice(invoice:Invoice):Observable<any>{
    return this.httpClient.post(this.createInvoiceUrl, invoice);
  }

  getInvoiceOrderByIdDescPaginate(thePage:number,thePageSize:number):Observable<GetInvoiceListResponse>{
    const searchUrl=`http://localhost:8080/api/order/orderList?page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetInvoiceListResponse>(searchUrl);
  }
}

interface GetInvoiceListResponse{
  "content":SaveInvoice[],
  "totalPages": number,
    "totalElements": number,
    "size": number,
    "number": number,
}
