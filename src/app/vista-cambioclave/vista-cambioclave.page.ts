import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController

@Component({
  selector: 'app-vista-cambioclave',
  templateUrl: './vista-cambioclave.page.html',
  styleUrls: ['./vista-cambioclave.page.scss'],
})
export class VistaCambioclavePage implements OnInit {

  constructor(private navController: NavController) { } // Inyecta NavController

  ngOnInit() {
  }

  volverAtras() {
    this.navController.back(); // Navega a la página anterior
  }

  irASesiones() {
    // Navega a la vista de sesiones
    this.navController.navigateForward('/sesiones'); // Asegúrate de que esta ruta esté configurada
  }
}
