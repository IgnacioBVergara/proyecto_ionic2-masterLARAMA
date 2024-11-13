import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaCambioclavePage } from './vista-cambioclave.page';

describe('VistaCambioclavePage', () => {
  let component: VistaCambioclavePage;
  let fixture: ComponentFixture<VistaCambioclavePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaCambioclavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
