import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
private invoiceUrl='http://localhost:8080/api/invoice';
  constructor(private httpClient: HttpClient) { }
}
