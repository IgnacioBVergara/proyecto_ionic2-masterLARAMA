import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaProyectarqrPage } from './vista-proyectarqr.page';

const routes: Routes = [
  {
    path: '',
    component: VistaProyectarqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaProyectarqrPageRoutingModule {}
