import { TestBed } from '@angular/core/testing';

import { EmissionDataService } from './emission-data.service';

describe('EmissionDataService', () => {
  let service: EmissionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmissionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
