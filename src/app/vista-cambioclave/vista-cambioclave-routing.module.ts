import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaCambioclavePage } from './vista-cambioclave.page';

const routes: Routes = [
  {
    path: '',
    component: VistaCambioclavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaCambioclavePageRoutingModule {}
