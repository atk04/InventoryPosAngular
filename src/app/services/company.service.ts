import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Companies } from '../common/companies';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
private companyUrl='http://localhost:8080/api/company';
  constructor(private httpClient:HttpClient) { }
  getCompanies():Observable<Companies[]>{
    return this.httpClient.get<GetResponseCompany>(this.companyUrl).pipe(
      map(response=>response._embedded.company)
    )
  }

  getCompaniesPaginate(thePage:number,thePageSize:number):Observable<GetResponseCompany>{
    const searchUrl=`${this.companyUrl}?page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseCompany>(searchUrl);
  }

  getCompanyById(CompanyId:number):Observable<GetResponseCompanyById>{
    const searchUrl=`${this.companyUrl}/${CompanyId}`;
    return this.httpClient.get<GetResponseCompanyById>(searchUrl);
  }
}

interface GetResponseCompany{
  "_embedded": {
    "company": Companies[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseCompanyById{
  "_embedded": {
    "company": Companies[];
  }
}
