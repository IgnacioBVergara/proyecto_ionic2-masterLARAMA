import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaCambioclavePageRoutingModule } from './vista-cambioclave-routing.module';

import { VistaCambioclavePage } from './vista-cambioclave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaCambioclavePageRoutingModule
  ],
  declarations: [VistaCambioclavePage]
})
export class VistaCambioclavePageModule {}
