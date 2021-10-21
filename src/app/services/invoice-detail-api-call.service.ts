import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceDetail } from '../common/invoice-detail';
import { OrderInvoiceList } from '../common/order-invoice-list';
import { OrderProductList } from '../common/order-product-list';

@Injectable({
  providedIn: 'root',
})
export class InvoiceDetailApiCallService {
  createInvoiceDetailUrl =
    'http://localhost:8080/api/order/createInvoiceDetail';
  getInvoiceDetailUrl = 'http://localhost:8080/api/order/findAllByInvoiceId';
  getRecentBuyerUrl='http://localhost:8080/api/order/getRecentBuyer';
  deleteInvoiceDetailByInvoiceIdUrl = 'http://localhost:8080/api/order/deleteInvoiceDetail';
  deleteInvoiceByIdUrl = 'http://localhost:8080/api/order/delete';
  constructor(private httpClient: HttpClient) {}

  createInvoiceDetail(invoiceDetail: InvoiceDetail): Observable<any> {
    return this.httpClient.post(this.createInvoiceDetailUrl, invoiceDetail);
  }

  deleteInvoiceById(id: number): Observable<any> {
    const deleteUrl = `${this.deleteInvoiceByIdUrl}?id=${id}`;
    return this.httpClient.delete<any>(deleteUrl);
  }

  getInvoiceDetailById(id: number): Observable<GetInvoiceDetailResponse[]> {
    const searchUrl = `${this.getInvoiceDetailUrl}?id=${id}`;
    return this.httpClient.get<GetInvoiceDetailResponse[]>(searchUrl);
  }

  getRecentBuyer():Observable<OrderInvoiceList[]>{
    return this.httpClient.get<OrderInvoiceList[]>(this.getRecentBuyerUrl);
  }

  deleteInvoiceDetailByInvoiceId(id: number): Observable<any> {
    const deleteUrl = `${this.deleteInvoiceDetailByInvoiceIdUrl}?id=${id}`;
    return this.httpClient.delete<any>(deleteUrl);
  }
}

interface GetInvoiceDetailResponse {
  id: number;
  invoice: OrderInvoiceList;
  product: OrderProductList;
  productName: string;
  productQuantity: number;
  productPrice: number;
  orderDate: string;
}
