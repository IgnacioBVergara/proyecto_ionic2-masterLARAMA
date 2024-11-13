import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'vista-login', // Redirige a vista-login al iniciar la aplicación
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'vista-alumno',
    loadChildren: () => import('./vista-alumno/vista-alumno.module').then( m => m.VistaAlumnoPageModule)
  },
  {
    path: 'vista-camara',
    loadChildren: () => import('./vista-camara/vista-camara.module').then( m => m.VistaCamaraPageModule)
  },
  {
    path: 'vista-ramos',
    loadChildren: () => import('./vista-ramos/vista-ramos.module').then( m => m.VistaRamosPageModule)
  },
  {
    path: 'vista-asistencia',
    loadChildren: () => import('./vista-asistencia/vista-asistencia.module').then( m => m.VistaAsistenciaPageModule)
  },
  {
    path: 'vista-profe',
    loadChildren: () => import('./vista-profe/vista-profe.module').then( m => m.VistaProfePageModule)
  },
  {
    path: 'vista-login',
    loadChildren: () => import('./vista-login/vista-login.module').then( m => m.VistaLoginPageModule)
  },
  {
    path: 'vista-reestabler',
    loadChildren: () => import('./vista-reestabler/vista-reestabler.module').then( m => m.VistaReestablerPageModule)
  },
  {
    path: 'vista-cambioclave',
    loadChildren: () => import('./vista-cambioclave/vista-cambioclave.module').then( m => m.VistaCambioclavePageModule)
  },
  {
    path: 'vista-secciones',
    loadChildren: () => import('./vista-secciones/vista-secciones.module').then( m => m.VistaSeccionesPageModule)
  },
  {
    path: 'vista-proyectarqr',
    loadChildren: () => import('./vista-proyectarqr/vista-proyectarqr.module').then( m => m.VistaProyectarqrPageModule)
  },
  {
    path: 'vista-generarqr',
    loadChildren: () => import('./vista-generarqr/vista-generarqr.module').then( m => m.VistaGenerarqrPageModule)
  },
  {
    path: 'crearusuario',
    loadChildren: () => import('./crearusuario/crearusuario.module').then( m => m.CrearusuarioPageModule)
  },
  {
    path: 'control-asistencia',
    loadChildren: () => import('./control-asistencia/control-asistencia.module').then( m => m.ControlAsistenciaPageModule)
  },
  {
    path: 'sesiones',
    loadChildren: () => import('./sesiones/sesiones.module').then( m => m.SesionesPageModule)
  },
  {
    path: 'vista-asistenciaprofe',
    loadChildren: () => import('./vista-asistenciaprofe/vista-asistenciaprofe.module').then( m => m.VistaAsistenciaprofePageModule)
  },
  {
    path: 'vista-asistencia-secciones',
    loadChildren: () => import('./vista-asistencia-secciones/vista-asistencia-secciones.module').then( m => m.VistaAsistenciaSeccionesPageModule)
  },
  {
    path: 'vista-registro',
    loadChildren: () => import('./vista-registro/vista-registro.module').then( m => m.VistaRegistroPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
