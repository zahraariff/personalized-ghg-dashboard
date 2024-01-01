import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountsPageComponent } from './manage-accounts-page.component';

describe('ManageAccountsPageComponent', () => {
  let component: ManageAccountsPageComponent;
  let fixture: ComponentFixture<ManageAccountsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAccountsPageComponent]
    });
    fixture = TestBed.createComponent(ManageAccountsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
