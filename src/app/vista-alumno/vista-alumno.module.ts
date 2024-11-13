import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaAlumnoPageRoutingModule } from './vista-alumno-routing.module';

import { VistaAlumnoPage } from './vista-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaAlumnoPageRoutingModule
  ],
  declarations: [VistaAlumnoPage]
})
export class VistaAlumnoPageModule {}
