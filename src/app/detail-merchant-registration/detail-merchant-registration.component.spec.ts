import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMerchantRegistrationComponent } from './detail-merchant-registration.component';

describe('DetailMerchantRegistrationComponent', () => {
  let component: DetailMerchantRegistrationComponent;
  let fixture: ComponentFixture<DetailMerchantRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailMerchantRegistrationComponent]
    });
    fixture = TestBed.createComponent(DetailMerchantRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
