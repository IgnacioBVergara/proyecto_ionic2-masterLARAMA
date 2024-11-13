import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaRamosPage } from './vista-ramos.page';

const routes: Routes = [
  {
    path: '',
    component: VistaRamosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaRamosPageRoutingModule {}
