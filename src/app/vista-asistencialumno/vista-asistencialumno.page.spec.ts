import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaAsistencialumnoPage } from './vista-asistencialumno.page';

describe('VistaAsistencialumnoPage', () => {
  let component: VistaAsistencialumnoPage;
  let fixture: ComponentFixture<VistaAsistencialumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaAsistencialumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
