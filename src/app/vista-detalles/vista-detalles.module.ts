import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaDetallesPageRoutingModule } from './vista-detalles-routing.module';

import { VistaDetallesPage } from './vista-detalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaDetallesPageRoutingModule
  ],
  declarations: [VistaDetallesPage]
})
export class VistaDetallesPageModule {}
