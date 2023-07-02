import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotSensorPageComponent } from './iot-sensor-page.component';

describe('IotSensorPageComponent', () => {
  let component: IotSensorPageComponent;
  let fixture: ComponentFixture<IotSensorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IotSensorPageComponent]
    });
    fixture = TestBed.createComponent(IotSensorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
