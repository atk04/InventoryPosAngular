import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceDetail } from '../common/invoice-detail';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailApiCallService {
createInvoiceDetailUrl='http://localhost:8080/api/order/createInvoiceDetail';

  constructor(private httpClient: HttpClient) { }

  createInvoiceDetail(invoiceDetail:InvoiceDetail):Observable<any>{
    return this.httpClient.post(this.createInvoiceDetailUrl, invoiceDetail);
  }
}
