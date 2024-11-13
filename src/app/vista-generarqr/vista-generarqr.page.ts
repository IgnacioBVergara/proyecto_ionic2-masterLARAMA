import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-vista-generarqr',
  templateUrl: './vista-generarqr.page.html',
  styleUrls: ['./vista-generarqr.page.scss'],
})
export class VistaGenerarqrPage implements OnInit {

  constructor(private navController: NavController, private router: Router) { } // Inyecta NavController y Router

  ngOnInit() {
  }

  volverAtras() {
    this.navController.back(); // Navega a la página anterior
  }

  generarQR() {
    this.router.navigate(['/vista-proyectarqr']); // Redirige a la vista-proyectarqr
  }

  verAsistencia() {
    // Lógica para ver asistencia
  }

  irASesiones() {
    // Navega a la vista de sesiones
    this.navController.navigateForward('/sesiones'); // Asegúrate de que esta ruta esté configurada
  }
}
