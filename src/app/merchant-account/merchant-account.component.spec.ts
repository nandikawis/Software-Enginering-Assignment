import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAccountComponent } from './merchant-account.component';

describe('MerchantAccountComponent', () => {
  let component: MerchantAccountComponent;
  let fixture: ComponentFixture<MerchantAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantAccountComponent]
    });
    fixture = TestBed.createComponent(MerchantAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
