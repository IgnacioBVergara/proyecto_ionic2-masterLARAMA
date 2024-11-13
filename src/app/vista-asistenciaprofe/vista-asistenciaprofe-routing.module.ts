import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaAsistenciaprofePage } from './vista-asistenciaprofe.page';

const routes: Routes = [
  {
    path: '',
    component: VistaAsistenciaprofePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaAsistenciaprofePageRoutingModule {}
