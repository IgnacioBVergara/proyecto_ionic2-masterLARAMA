import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaAsistencialumnoPage } from './vista-asistencialumno.page';

const routes: Routes = [
  {
    path: '',
    component: VistaAsistencialumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaAsistencialumnoPageRoutingModule {}
