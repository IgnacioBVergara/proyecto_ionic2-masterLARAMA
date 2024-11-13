import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaSeccionesPage } from './vista-secciones.page';

const routes: Routes = [
  {
    path: '',
    component: VistaSeccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaSeccionesPageRoutingModule {}
