import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaProyectarqrPageRoutingModule } from './vista-proyectarqr-routing.module';

import { VistaProyectarqrPage } from './vista-proyectarqr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaProyectarqrPageRoutingModule
  ],
  declarations: [VistaProyectarqrPage]
})
export class VistaProyectarqrPageModule {}
