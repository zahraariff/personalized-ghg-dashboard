import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotRegistrationPageComponent } from './iot-registration-page.component';

describe('IotRegistrationPageComponent', () => {
  let component: IotRegistrationPageComponent;
  let fixture: ComponentFixture<IotRegistrationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IotRegistrationPageComponent]
    });
    fixture = TestBed.createComponent(IotRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
