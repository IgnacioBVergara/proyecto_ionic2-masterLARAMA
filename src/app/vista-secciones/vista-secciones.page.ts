import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController
import { Router } from '@angular/router'; // Importa Router
import { getAuth } from 'firebase/auth'; // Para obtener el UID del profesor

@Component({
  selector: 'app-vista-secciones',
  templateUrl: './vista-secciones.page.html',
  styleUrls: ['./vista-secciones.page.scss'],
})
export class VistaSeccionesPage implements OnInit {

  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() {
    // Puedes añadir lógica inicial aquí si es necesario
  }

  volverAtras() {
    this.navController.back(); // Navega a la página anterior
  }

  // Esta función ahora recibe el nombre de la asignatura como parámetro
  irAGenerarQR(asignatura: string) {
    // Redirige a la página de generar QR con el parámetro 'asignatura'
    this.router.navigate(['/vista-generarqr'], { queryParams: { asignatura } });
  }

  irASesiones() {
    // Navega a la vista de sesiones
    this.navController.navigateForward('/sesiones'); // Asegúrate de que esta ruta esté configurada
  }
}
