import { TestBed } from '@angular/core/testing';

import { IotSensorListService } from './iot-sensor-list.service';

describe('IotSensorListService', () => {
  let service: IotSensorListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IotSensorListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
