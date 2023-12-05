import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerPageComponent } from './officer-page.component';

describe('OfficerPageComponent', () => {
  let component: OfficerPageComponent;
  let fixture: ComponentFixture<OfficerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficerPageComponent]
    });
    fixture = TestBed.createComponent(OfficerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
