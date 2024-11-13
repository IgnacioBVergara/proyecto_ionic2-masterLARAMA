import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaSeccionesPage } from './vista-secciones.page';

describe('VistaSeccionesPage', () => {
  let component: VistaSeccionesPage;
  let fixture: ComponentFixture<VistaSeccionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaSeccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
