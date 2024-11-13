import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaRegistroPage } from './vista-registro.page';

const routes: Routes = [
  {
    path: '',
    component: VistaRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaRegistroPageRoutingModule {}
