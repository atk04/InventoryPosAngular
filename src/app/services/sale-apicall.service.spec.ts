import { TestBed } from '@angular/core/testing';

import { SaleApicallService } from './sale-apicall.service';

describe('SaleApicallService', () => {
  let service: SaleApicallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleApicallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
