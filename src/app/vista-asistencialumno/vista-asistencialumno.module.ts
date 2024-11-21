import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaAsistencialumnoPageRoutingModule } from './vista-asistencialumno-routing.module';

import { VistaAsistencialumnoPage } from './vista-asistencialumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaAsistencialumnoPageRoutingModule
  ],
  declarations: [VistaAsistencialumnoPage]
})
export class VistaAsistencialumnoPageModule {}
