import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'; // Importa NavController

@Component({
  selector: 'app-vista-profe',
  templateUrl: './vista-profe.page.html',
  styleUrls: ['./vista-profe.page.scss'],
})
export class VistaProfePage implements OnInit {

  constructor(private router: Router, private navController: NavController) { } // Inyecta NavController

  ngOnInit() {
  }

  verAsistencia() {
    this.navController.navigateForward('/vista-asistencia-secciones'); // Redirige a la vista-asistencia-secciones
  }

  generarQR() {
    this.router.navigate(['/vista-proyectarqr']); // Redirige a la vista-proyectarqr
  }

  irAGenerarQR() {
    this.router.navigate(['/vista-generarqr']); // Redirige a la vista-generarqr
  }

  irASecciones() {
    // Navegar a la vista de secciones
    this.router.navigate(['/vista-secciones']); // Asegúrate de que esta ruta esté configurada correctamente
  }

  volverAtras() {
    this.navController.back(); // Navega a la página anterior
  }

  irASesiones() {
    this.navController.navigateForward('/sesiones'); // Asegúrate de que esta ruta esté configurada
  }

  abrirAyuda() {
    window.open('https://www.duoc.cl/contacto/', '_blank'); // Abre el enlace en una nueva pestaña
  }
}
