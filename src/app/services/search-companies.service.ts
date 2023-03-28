import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

interface QueryOption {
  companyName:string | null,
  symbol: string | null
}

@Injectable({
  providedIn: 'root'
})
export class SearchCompaniesService {

  constructor(private _http: HttpClient) { }
  url: string = "http://localhost:3000/search-companies"

  getData(queryOption: QueryOption): Observable<HttpResponse<any>> {
    const { companyName, symbol } = queryOption;
    if(companyName){
      this.url += `?companyName=${companyName}`;
    }else if(symbol){
      this.url += `?symbol=${symbol}`;
    }
    return this._http.get(this.url, { observe: 'response', responseType: 'json'})
  }
}
