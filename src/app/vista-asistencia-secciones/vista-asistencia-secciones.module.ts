import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaAsistenciaSeccionesPageRoutingModule } from './vista-asistencia-secciones-routing.module';

import { VistaAsistenciaSeccionesPage } from './vista-asistencia-secciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaAsistenciaSeccionesPageRoutingModule
  ],
  declarations: [VistaAsistenciaSeccionesPage]
})
export class VistaAsistenciaSeccionesPageModule {}
