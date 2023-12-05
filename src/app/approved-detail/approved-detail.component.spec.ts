import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedDetailComponent } from './approved-detail.component';

describe('ApprovedDetailComponent', () => {
  let component: ApprovedDetailComponent;
  let fixture: ComponentFixture<ApprovedDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedDetailComponent]
    });
    fixture = TestBed.createComponent(ApprovedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
