import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaGenerarqrPageRoutingModule } from './vista-generarqr-routing.module';

import { VistaGenerarqrPage } from './vista-generarqr.page';

import { QRCodeModule } from 'angularx-qrcode';  // Importa el módulo QRCodeModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaGenerarqrPageRoutingModule,
    QRCodeModule
  ],
  declarations: [VistaGenerarqrPage]
})
export class VistaGenerarqrPageModule {}
