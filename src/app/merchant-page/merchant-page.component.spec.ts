import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPageComponent } from './merchant-page.component';

describe('MerchantPageComponent', () => {
  let component: MerchantPageComponent;
  let fixture: ComponentFixture<MerchantPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantPageComponent]
    });
    fixture = TestBed.createComponent(MerchantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
