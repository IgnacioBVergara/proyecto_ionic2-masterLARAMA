import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaSeccionesPageRoutingModule } from './vista-secciones-routing.module';

import { VistaSeccionesPage } from './vista-secciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaSeccionesPageRoutingModule
  ],
  declarations: [VistaSeccionesPage]
})
export class VistaSeccionesPageModule {}
