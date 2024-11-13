import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaRegistroPageRoutingModule } from './vista-registro-routing.module';

import { VistaRegistroPage } from './vista-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaRegistroPageRoutingModule
  ],
  declarations: [VistaRegistroPage]
})
export class VistaRegistroPageModule {}
