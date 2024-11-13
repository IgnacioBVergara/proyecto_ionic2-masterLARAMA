import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.page.html',
  styleUrls: ['./sesiones.page.scss'],
})
export class SesionesPage implements OnInit {

  constructor(private navController: NavController) { } // Inyecta NavController

  ngOnInit() {
  }

  generarQR() {
    // Aquí puedes implementar la lógica para generar el código QR
    console.log('Generando QR...');

    // Navega a la página de inicio
    this.navController.navigateBack('/home'); // Asegúrate de que '/home' sea la ruta correcta
  }

  irAVistaLogin() {
    // Navega a la vista de login
    this.navController.navigateForward('/vista-login'); // Cambia la ruta aquí
  }

  irAVistaAlumno() {
    // Navega a la vista de alumno
    this.navController.navigateForward('/vista-alumno'); // Cambia la ruta aquí
  }
}
