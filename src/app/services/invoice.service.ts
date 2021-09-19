import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
private invoiceUrl='http://localhost:8080/api/invoice';
  constructor(private httpClient: HttpClient) { }

  getInvoiceByInvoiceId(InvoiceId:number):Observable<any>{
    const searchUrl=`${this.invoiceUrl}/${InvoiceId}`;
    return this.httpClient.get(searchUrl);
  }
}
