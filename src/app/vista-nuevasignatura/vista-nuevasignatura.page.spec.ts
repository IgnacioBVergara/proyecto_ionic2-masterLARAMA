import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaNuevasignaturaPage } from './vista-nuevasignatura.page';

describe('VistaNuevasignaturaPage', () => {
  let component: VistaNuevasignaturaPage;
  let fixture: ComponentFixture<VistaNuevasignaturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaNuevasignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
