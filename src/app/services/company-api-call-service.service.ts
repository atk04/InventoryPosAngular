import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Companies } from '../common/companies';

@Injectable({
  providedIn: 'root'
})
export class CompanyApiCallServiceService {
  private createCompanyUrl='http://localhost:8080/api/company/create';
  private updateCompanyUrl='http://localhost:8080/api/company/update';
  private deleteCompanyByIdUrl='http://localhost:8080/api/company/delete';
  constructor(private httpClient: HttpClient) {}

  createCompany(company: Companies): Observable<any> {
    return this.httpClient.post(this.createCompanyUrl, company);
  }

  updateCompany(company: Companies): Observable<any> {
    return this.httpClient.put(this.updateCompanyUrl, company);
  }

  deleteCompanyById(id:number):Observable<any>{
    const deleteUrl=`${this.deleteCompanyByIdUrl}?id=${id}`;
    return this.httpClient.delete(deleteUrl);
  }
}
