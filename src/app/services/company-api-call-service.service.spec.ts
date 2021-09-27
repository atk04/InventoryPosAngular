import { TestBed } from '@angular/core/testing';

import { CompanyApiCallServiceService } from './company-api-call-service.service';

describe('CompanyApiCallServiceService', () => {
  let service: CompanyApiCallServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyApiCallServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
