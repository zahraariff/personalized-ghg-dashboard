import { TestBed } from '@angular/core/testing';

import { IotRegistrationService } from './iot-registration.service';

describe('IotRegistrationService', () => {
  let service: IotRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IotRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
