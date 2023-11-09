import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateReportPageComponent } from './generate-report-page.component';

describe('GenerateReportPageComponent', () => {
  let component: GenerateReportPageComponent;
  let fixture: ComponentFixture<GenerateReportPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateReportPageComponent]
    });
    fixture = TestBed.createComponent(GenerateReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
