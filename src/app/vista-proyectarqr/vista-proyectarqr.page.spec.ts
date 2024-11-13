import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaProyectarqrPage } from './vista-proyectarqr.page';

describe('VistaProyectarqrPage', () => {
  let component: VistaProyectarqrPage;
  let fixture: ComponentFixture<VistaProyectarqrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaProyectarqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
