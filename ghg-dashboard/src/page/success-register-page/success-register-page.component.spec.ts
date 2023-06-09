import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessRegisterPageComponent } from './success-register-page.component';

describe('SuccessRegisterPageComponent', () => {
  let component: SuccessRegisterPageComponent;
  let fixture: ComponentFixture<SuccessRegisterPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessRegisterPageComponent]
    });
    fixture = TestBed.createComponent(SuccessRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
