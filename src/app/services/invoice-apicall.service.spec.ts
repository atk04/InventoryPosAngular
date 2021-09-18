import { TestBed } from '@angular/core/testing';

import { InvoiceApicallService } from './invoice-apicall.service';

describe('InvoiceApicallService', () => {
  let service: InvoiceApicallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceApicallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
