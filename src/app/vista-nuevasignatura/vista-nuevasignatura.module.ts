import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaNuevasignaturaPageRoutingModule } from './vista-nuevasignatura-routing.module';

import { VistaNuevasignaturaPage } from './vista-nuevasignatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaNuevasignaturaPageRoutingModule
  ],
  declarations: [VistaNuevasignaturaPage]
})
export class VistaNuevasignaturaPageModule {}
