import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importa Router si lo necesitas

@Component({
  selector: 'app-vista-asistencia-secciones',
  templateUrl: './vista-asistencia-secciones.page.html',
  styleUrls: ['./vista-asistencia-secciones.page.scss'],
})
export class VistaAsistenciaSeccionesPage implements OnInit {

  constructor(private navController: NavController, private router: Router) { } // Inyecta Router si lo necesitas

  ngOnInit() {
  }

  irAAsistencia(seccion: string) {
    // Navegar a la vista de asistencia de la sección correspondiente
    this.router.navigate([`/vista-asistencia`], { queryParams: { seccion } }); // Cambia la ruta si es necesario
  }

  volverAtras() {
    this.navController.back();
  }

  irASesiones() {
    this.navController.navigateForward('/sesiones');
  }
}
