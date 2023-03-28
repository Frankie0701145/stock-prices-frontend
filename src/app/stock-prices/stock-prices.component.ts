import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {FetchStockPricesService } from "../services/fetch-stock-prices.service";
interface StockPrice {
  id: number,
  companyName: string, 
  tickerSymbol: string, 
  currentPrice: number, 
  change: number
}

@Component({
  selector: 'app-stock-prices',
  templateUrl: './stock-prices.component.html',
  styleUrls: ['./stock-prices.component.scss']
})
export class StockPricesComponent {

  stockPrices: StockPrice[] = []
  dataSource!: MatTableDataSource<StockPrice>;

  constructor(private _fetchStockPricesService: FetchStockPricesService, private _liveAnnouncer: LiveAnnouncer){

  }


  displayedColumns: string[] = ['companyName', 'tickerSymbol', 'currentPrice', 'change']

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  ngOnInit(){
    this._fetchStockPricesService.getData().subscribe((response)=>{
      this.stockPrices = response.body.data.map((data: any)=>({
        companyName: data.company_name, id: data.company_id,
        tickerSymbol: data.symbol, currentPrice: data.price,
        change: data.percent_change
      }));
      this.dataSource = new MatTableDataSource(this.stockPrices);
      this.dataSource.sort = this.sort;
    })
  }

}
