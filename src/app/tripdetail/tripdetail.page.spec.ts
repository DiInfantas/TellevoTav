import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripdetailPage } from './tripdetail.page';

describe('TripdetailPage', () => {
  let component: TripdetailPage;
  let fixture: ComponentFixture<TripdetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TripdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
