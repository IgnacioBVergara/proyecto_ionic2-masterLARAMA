import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaRamosPageRoutingModule } from './vista-ramos-routing.module';

import { VistaRamosPage } from './vista-ramos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaRamosPageRoutingModule
  ],
  declarations: [VistaRamosPage]
})
export class VistaRamosPageModule {}
