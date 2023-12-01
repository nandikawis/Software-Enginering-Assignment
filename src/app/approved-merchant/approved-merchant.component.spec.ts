import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedMerchantComponent } from './approved-merchant.component';

describe('ApprovedMerchantComponent', () => {
  let component: ApprovedMerchantComponent;
  let fixture: ComponentFixture<ApprovedMerchantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedMerchantComponent]
    });
    fixture = TestBed.createComponent(ApprovedMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
