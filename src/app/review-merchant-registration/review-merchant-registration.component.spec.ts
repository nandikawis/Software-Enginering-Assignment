import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMerchantRegistrationComponent } from './review-merchant-registration.component';

describe('ReviewMerchantRegistrationComponent', () => {
  let component: ReviewMerchantRegistrationComponent;
  let fixture: ComponentFixture<ReviewMerchantRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewMerchantRegistrationComponent]
    });
    fixture = TestBed.createComponent(ReviewMerchantRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
