import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

interface StockPrice {
  company_id: number,
  company_name: string, 
  symbol: string, 
  price: string, 
  percent_change: string
}

interface StockPrices{
  data: StockPrice[]
}

@Injectable({
  providedIn: 'root'
})
export class FetchStockPricesService {
  
  constructor(private _http: HttpClient) { }
  baseUrl: string = "http://localhost:3000"
  // url: string = "http://localhost:3000/stock-prices"

  getData(companyId?: number | string): Observable<HttpResponse<any>>{
    let url:  string = `${this.baseUrl}/stock-prices`
    if(companyId){
      url += `/${companyId}`;
    }
    return this._http.get(url, { observe: 'response', responseType: 'json'});
  }
}
