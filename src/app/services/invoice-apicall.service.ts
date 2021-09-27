import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../common/invoice';
import { Order } from '../common/order';
import { SaveInvoice } from '../common/save-invoice';
import { UpdateOrder } from '../common/update-order';

@Injectable({
  providedIn: 'root'
})
export class InvoiceApicallService {
private createInvoiceUrl='http://localhost:8080/api/order/createInvoice';
private updateInvoiceUrl='http://localhost:8080/api/order/updateInvoice';
  constructor(private httpClient: HttpClient) { }
  saveInvoice(order:Order):Observable<any>{
    return this.httpClient.post(this.createInvoiceUrl, order);
  }

  updateInvoice(updateOrder:UpdateOrder):Observable<any>{
    return this.httpClient.put(this.updateInvoiceUrl, updateOrder);
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
