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
  url: string = "http://localhost:3000/stock-prices"

  getData(): Observable<HttpResponse<any>>{
    return this._http.get(this.url, { observe: 'response', responseType: 'json'});
  }
}
