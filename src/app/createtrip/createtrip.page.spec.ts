import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatetripPage } from './createtrip.page';

describe('CreatetripPage', () => {
  let component: CreatetripPage;
  let fixture: ComponentFixture<CreatetripPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreatetripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
