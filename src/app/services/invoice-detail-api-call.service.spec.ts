import { TestBed } from '@angular/core/testing';

import { InvoiceDetailApiCallService } from './invoice-detail-api-call.service';

describe('InvoiceDetailApiCallService', () => {
  let service: InvoiceDetailApiCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceDetailApiCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
