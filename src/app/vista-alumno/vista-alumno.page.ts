import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'; // Asegúrate de importar NavController

@Component({
  selector: 'app-vista-alumno',
  templateUrl: './vista-alumno.page.html',
  styleUrls: ['./vista-alumno.page.scss'],
})
export class VistaAlumnoPage implements OnInit {

  constructor(private router: Router, private navController: NavController) { }

  ngOnInit() {
  }

  escanearQR() {
    this.router.navigate(['/vista-camara']); // Redirige a la vista-camara
  }

  verAsistencia() {
    this.router.navigate(['/vista-ramos']); // Redirige a la vista-ramos
  }

  volverAtras() {
    this.navController.back(); // Navega a la página anterior
  }

  irASesiones() {
    // Navega a la vista de sesiones
    this.navController.navigateForward('/sesiones'); // Asegúrate de que esta ruta esté configurada
  }

  abrirAyuda() {
    window.open('https://www.duoc.cl/contacto/', '_blank'); // Abre el enlace en una nueva pestaña
  }
}
