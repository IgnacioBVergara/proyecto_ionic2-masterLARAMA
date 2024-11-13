import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaLoginPageRoutingModule } from './vista-login-routing.module';

import { VistaLoginPage } from './vista-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaLoginPageRoutingModule
  ],
  declarations: [VistaLoginPage]
})
export class VistaLoginPageModule {}
