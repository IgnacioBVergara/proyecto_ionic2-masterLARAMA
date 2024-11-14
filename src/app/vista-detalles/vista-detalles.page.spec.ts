import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaDetallesPage } from './vista-detalles.page';

describe('VistaDetallesPage', () => {
  let component: VistaDetallesPage;
  let fixture: ComponentFixture<VistaDetallesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
