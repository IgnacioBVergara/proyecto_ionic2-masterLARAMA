import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaGenerarqrPage } from './vista-generarqr.page';

describe('VistaGenerarqrPage', () => {
  let component: VistaGenerarqrPage;
  let fixture: ComponentFixture<VistaGenerarqrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaGenerarqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
