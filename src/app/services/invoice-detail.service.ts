import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailService {
private invoiceDetailUrl='http://localhost:8080/api/invoice-detail';
  constructor() { }
}
