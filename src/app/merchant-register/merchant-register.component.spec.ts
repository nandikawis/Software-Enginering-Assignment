import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantRegisterComponent } from './merchant-register.component';

describe('MerchantRegisterComponent', () => {
  let component: MerchantRegisterComponent;
  let fixture: ComponentFixture<MerchantRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantRegisterComponent]
    });
    fixture = TestBed.createComponent(MerchantRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
