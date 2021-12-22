import { TestBed } from '@angular/core/testing';

import { GaagServiceService } from './gaag-service.service';

describe('GaagServiceService', () => {
  let service: GaagServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaagServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
