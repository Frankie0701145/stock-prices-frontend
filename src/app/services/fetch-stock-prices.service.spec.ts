import { TestBed } from '@angular/core/testing';

import { FetchStockPricesService } from './fetch-stock-prices.service';

describe('FetchStockPricesService', () => {
  let service: FetchStockPricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchStockPricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
