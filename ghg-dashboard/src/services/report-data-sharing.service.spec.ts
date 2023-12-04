import { TestBed } from '@angular/core/testing';

import { ReportDataSharingService } from './report-data-sharing.service';

describe('ReportDataSharingService', () => {
  let service: ReportDataSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportDataSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
