import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';  // Importa NavController
import { Router } from '@angular/router';  // Importa Router

@Component({
  selector: 'app-vista-ramos',
  templateUrl: './vista-ramos.page.html',
  styleUrls: ['./vista-ramos.page.scss'],
})
export class VistaRamosPage implements OnInit {

  constructor(private navController: NavController, private router: Router) { }  // Inyecta NavController y Router

  ngOnInit() {
  }

  volverAtras() {
    this.navController.back(); // Navega a la página anterior
  }

  // Método modificado para redirigir a VistaAsistencialumnoPage con el parámetro asignatura
  irAAsistencia(asignatura: string) {
    this.router.navigate(['/vista-asistencialumno'], {
      queryParams: { asignatura: asignatura }  // Enviamos el nombre de la asignatura como parámetro
    });
  }

  irASesiones() {
    this.navController.navigateForward('/sesiones');  // Navega a la vista de sesiones
  }
}
