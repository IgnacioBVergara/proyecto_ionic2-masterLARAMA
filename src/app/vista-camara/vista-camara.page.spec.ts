import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaCamaraPage } from './vista-camara.page';

describe('VistaCamaraPage', () => {
  let component: VistaCamaraPage;
  let fixture: ComponentFixture<VistaCamaraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaCamaraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
