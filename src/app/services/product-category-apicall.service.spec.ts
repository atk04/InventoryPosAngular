import { TestBed } from '@angular/core/testing';

import { ProductCategoryApicallService } from './product-category-apicall.service';

describe('ProductCategoryApicallService', () => {
  let service: ProductCategoryApicallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCategoryApicallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
