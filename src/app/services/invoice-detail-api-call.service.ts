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
  deleteInvoiceByIdUrl = 'http://localhost:8080/api/order/delete';
  constructor(private httpClient: HttpClient) {}

  createInvoiceDetail(invoiceDetail: InvoiceDetail): Observable<any> {
    return this.httpClient.post(this.createInvoiceDetailUrl, invoiceDetail);
  }

  getInvoiceDetailById(id: number): Observable<GetInvoiceDetailResponse[]> {
    const searchUrl = `${this.getInvoiceDetailUrl}?id=${id}`;
    return this.httpClient.get<GetInvoiceDetailResponse[]>(searchUrl);
  }

  deleteInvoiceById(id: number): Observable<any> {
    const deleteUrl = `${this.deleteInvoiceByIdUrl}?id=${id}`;
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
