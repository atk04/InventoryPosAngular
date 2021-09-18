import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../common/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceApicallService {
private createInvoiceUrl='http://localhost:8080/api/order/createInvoice';
  constructor(private httpClient: HttpClient) { }
  saveInvoice(invoice:Invoice):Observable<any>{
    return this.httpClient.post(this.createInvoiceUrl, invoice);
  }
}
