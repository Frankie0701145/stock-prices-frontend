import { Component, OnInit, Input  } from '@angular/core';
import {FormControl} from '@angular/forms';
import {SearchCompaniesService} from '../services/search-companies.service';

interface Company {
  company_name: string,
  company_id: number,
  symbol: string
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
  searchBy!: "company_name" | "symbol" ;

  mySearchControl = new FormControl();

  filteredCompanies: Company[] = [];

  ngOnInit(){
    let searchTimeout: ReturnType<typeof setTimeout>;
    
    this.mySearchControl.valueChanges.subscribe((value)=> {

      clearTimeout(searchTimeout);
      if(typeof value === 'string'){
        searchTimeout = setTimeout(()=>{
          if(value?.trim() === ""){
            this.fetchStockPrice();
            this.filteredCompanies= [];
          }else if(value){
                    // retrieve companies
            let queryOption: { company_name: string| null, symbol: string | null } = { company_name: null, symbol: null}
            queryOption[this.searchBy] = value; 
            this._searchCompaniesService.getData(queryOption).subscribe((response)=>{
              console.log(response.body.data);
              this.filteredCompanies = response.body.data;
            });
          }else{
            this.filteredCompanies= [];
          }
        }, 700);
      }
    });
  }

  getStockPrice(companyId: number){
    this.fetchStockPrice(companyId);
  }
  
  getOptionText = (companyId: number)=>{
    let company: Company = this.filteredCompanies.filter((company)=> company.company_id === companyId)[0];
    return company?.[this.searchBy] || "";
  }
}
