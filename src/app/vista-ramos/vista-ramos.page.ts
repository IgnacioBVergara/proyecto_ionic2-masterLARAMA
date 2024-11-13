import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-vista-ramos',
  templateUrl: './vista-ramos.page.html',
  styleUrls: ['./vista-ramos.page.scss'],
})
export class VistaRamosPage implements OnInit {

  constructor(private navController: NavController, private router: Router) { } // Inyecta NavController y Router

  ngOnInit() {
  }

  volverAtras() {
    this.navController.back(); // Navega a la página anterior
  }

  irAAsistencia() {
    this.router.navigate(['/vista-asistencia']); // Redirige a la vista de asistencia
  }

  irASesiones() {
    this.navController.navigateForward('/sesiones'); // Navega a la vista de sesiones
  }
}
