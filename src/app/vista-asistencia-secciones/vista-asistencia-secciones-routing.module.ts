import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaAsistenciaSeccionesPage } from './vista-asistencia-secciones.page';

const routes: Routes = [
  {
    path: '',
    component: VistaAsistenciaSeccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaAsistenciaSeccionesPageRoutingModule {}
