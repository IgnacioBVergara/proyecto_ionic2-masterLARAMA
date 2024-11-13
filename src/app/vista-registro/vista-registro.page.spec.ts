import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaRegistroPage } from './vista-registro.page';

describe('VistaRegistroPage', () => {
  let component: VistaRegistroPage;
  let fixture: ComponentFixture<VistaRegistroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
