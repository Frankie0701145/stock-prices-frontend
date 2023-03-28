import { TestBed } from '@angular/core/testing';

import { SearchCompaniesService } from './search-companies.service';

describe('SearchCompaniesService', () => {
  let service: SearchCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
