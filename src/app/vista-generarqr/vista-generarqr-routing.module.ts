import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaGenerarqrPage } from './vista-generarqr.page';

const routes: Routes = [
  {
    path: '',
    component: VistaGenerarqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaGenerarqrPageRoutingModule {}
