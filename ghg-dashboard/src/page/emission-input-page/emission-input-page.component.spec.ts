import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionInputPageComponent } from './emission-input-page.component';

describe('EmissionInputPageComponent', () => {
  let component: EmissionInputPageComponent;
  let fixture: ComponentFixture<EmissionInputPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmissionInputPageComponent]
    });
    fixture = TestBed.createComponent(EmissionInputPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
