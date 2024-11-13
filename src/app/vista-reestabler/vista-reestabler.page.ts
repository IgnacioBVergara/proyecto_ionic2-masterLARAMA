import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'; // Importa NavController

@Component({
  selector: 'app-vista-reestabler',
  templateUrl: './vista-reestabler.page.html',
  styleUrls: ['./vista-reestabler.page.scss'],
})
export class VistaReestablerPage implements OnInit {

  constructor(private router: Router, private navController: NavController) { } // Inyecta NavController

  ngOnInit() {
  }

  enviarCorreo() {
    // Aquí podrías agregar lógica para enviar el correo si es necesario
    this.router.navigate(['/vista-cambioclave']); // Redirige a la vista de cambiar clave
  }

  volverAtras() {
    this.navController.back(); // Navega a la página anterior
  }

  irASesiones() {
    // Navega a la vista de sesiones
    this.navController.navigateForward('/sesiones'); // Asegúrate de que esta ruta esté configurada
  }
}
