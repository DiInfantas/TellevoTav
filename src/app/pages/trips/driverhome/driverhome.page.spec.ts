import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverhomePage } from './driverhome.page';

describe('DriverhomePage', () => {
  let component: DriverhomePage;
  let fixture: ComponentFixture<DriverhomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DriverhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
