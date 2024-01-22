import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverdetailPage } from './driverdetail.page';

describe('DriverdetailPage', () => {
  let component: DriverdetailPage;
  let fixture: ComponentFixture<DriverdetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DriverdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
