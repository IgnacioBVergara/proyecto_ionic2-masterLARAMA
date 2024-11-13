import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-vista-secciones',
  templateUrl: './vista-secciones.page.html',
  styleUrls: ['./vista-secciones.page.scss'],
})
export class VistaSeccionesPage implements OnInit {

  constructor(private navController: NavController, private router: Router) { } // Inyecta NavController y Router

  ngOnInit() {
    // Puedes añadir lógica inicial aquí si es necesario
  }

  volverAtras() {
    this.navController.back(); // Navega a la página anterior
  }

  irAGenerarQR() {
    this.router.navigate(['/vista-generarqr']); // Redirige a la vista-generarqr
  }

  irASesiones() {
    // Navega a la vista de sesiones
    this.navController.navigateForward('/sesiones'); // Asegúrate de que esta ruta esté configurada
  }
}
