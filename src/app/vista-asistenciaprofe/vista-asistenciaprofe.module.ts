import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaAsistenciaprofePageRoutingModule } from './vista-asistenciaprofe-routing.module';

import { VistaAsistenciaprofePage } from './vista-asistenciaprofe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaAsistenciaprofePageRoutingModule
  ],
  declarations: [VistaAsistenciaprofePage]
})
export class VistaAsistenciaprofePageModule {}
