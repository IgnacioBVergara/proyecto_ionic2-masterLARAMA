import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaAlumnoPage } from './vista-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: VistaAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaAlumnoPageRoutingModule {}
