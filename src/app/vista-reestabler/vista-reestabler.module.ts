import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaReestablerPageRoutingModule } from './vista-reestabler-routing.module';

import { VistaReestablerPage } from './vista-reestabler.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaReestablerPageRoutingModule
  ],
  declarations: [VistaReestablerPage]
})
export class VistaReestablerPageModule {}
