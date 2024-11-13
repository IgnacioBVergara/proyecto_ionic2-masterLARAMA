import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaReestablerPage } from './vista-reestabler.page';

describe('VistaReestablerPage', () => {
  let component: VistaReestablerPage;
  let fixture: ComponentFixture<VistaReestablerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaReestablerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
