import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaLoginPage } from './vista-login.page';

const routes: Routes = [
  {
    path: '',
    component: VistaLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaLoginPageRoutingModule {}
