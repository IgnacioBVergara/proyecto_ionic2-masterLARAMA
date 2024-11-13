import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaAsistenciaprofePage } from './vista-asistenciaprofe.page';

describe('VistaAsistenciaprofePage', () => {
  let component: VistaAsistenciaprofePage;
  let fixture: ComponentFixture<VistaAsistenciaprofePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaAsistenciaprofePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
