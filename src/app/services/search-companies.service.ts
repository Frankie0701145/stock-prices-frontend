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
  baseUrl: string = "https://stock-prices-api.herokuapp.com"

  getData(queryOption: QueryOption): Observable<HttpResponse<any>> {
    const { companyName, symbol } = queryOption;
    let url:  string = `${this.baseUrl}/search-companies`
    if(companyName){
      url += `?companyName=${companyName}`;
    }else if(symbol){
      url += `?symbol=${symbol}`;
    }
    return this._http.get(url, { observe: 'response', responseType: 'json'})
  }
}
