import { Component, OnInit, Input  } from '@angular/core';
import {FormControl} from '@angular/forms';
import {SearchCompaniesService} from '../services/search-companies.service';

interface CompanyNames {
  company_name: string,
  company_id: number
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {

  constructor(private _searchCompaniesService: SearchCompaniesService){}

  @Input()
  fetchStockPrice!: (companyId?: number | string) => void;

  @Input()
  label!: string;

  @Input()
  searchBy!: "companyName" | "symbol" ;

  mySearchControl = new FormControl();


  filteredCompanies: CompanyNames[] = [];

  ngOnInit(){
    let searchTimeout: ReturnType<typeof setTimeout>;
    
    this.mySearchControl.valueChanges.subscribe((value)=> {

      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(()=>{
        if(value?.trim() === ""){
          this.fetchStockPrice();
          this.filteredCompanies= [];
        }else{
                  // retrieve companies
          let queryOption: {companyName: string| null, symbol: string | null } = { companyName: null, symbol: null}
          queryOption[this.searchBy] = value; 
          this._searchCompaniesService.getData(queryOption).subscribe((response)=>{
            const companies = response.body.data;
            this.filteredCompanies = companies;
          });
        }

      }, 2000);
    });
  }

  getStockPrice(companyId: string){
    console.log("**********companyId**********", companyId)
    this.fetchStockPrice(companyId);
  }
}
