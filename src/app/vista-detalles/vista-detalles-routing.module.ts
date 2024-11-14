import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaDetallesPage } from './vista-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: VistaDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaDetallesPageRoutingModule {}
