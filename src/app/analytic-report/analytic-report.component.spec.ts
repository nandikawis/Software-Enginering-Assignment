import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticReportComponent } from './analytic-report.component';

describe('AnalyticReportComponent', () => {
  let component: AnalyticReportComponent;
  let fixture: ComponentFixture<AnalyticReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticReportComponent]
    });
    fixture = TestBed.createComponent(AnalyticReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
