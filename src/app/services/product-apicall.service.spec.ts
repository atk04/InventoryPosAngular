import { TestBed } from '@angular/core/testing';

import { ProductApicallService } from './product-apicall.service';

describe('ProductApicallService', () => {
  let service: ProductApicallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductApicallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
