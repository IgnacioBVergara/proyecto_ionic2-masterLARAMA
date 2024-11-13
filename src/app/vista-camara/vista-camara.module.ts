import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaCamaraPageRoutingModule } from './vista-camara-routing.module';

import { VistaCamaraPage } from './vista-camara.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaCamaraPageRoutingModule
  ],
  declarations: [VistaCamaraPage]
})
export class VistaCamaraPageModule {}
