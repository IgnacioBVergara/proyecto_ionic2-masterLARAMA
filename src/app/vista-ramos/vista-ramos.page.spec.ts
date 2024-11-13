import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaRamosPage } from './vista-ramos.page';

describe('VistaRamosPage', () => {
  let component: VistaRamosPage;
  let fixture: ComponentFixture<VistaRamosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaRamosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
