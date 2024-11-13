import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaAsistenciaSeccionesPage } from './vista-asistencia-secciones.page';

describe('VistaAsistenciaSeccionesPage', () => {
  let component: VistaAsistenciaSeccionesPage;
  let fixture: ComponentFixture<VistaAsistenciaSeccionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaAsistenciaSeccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
