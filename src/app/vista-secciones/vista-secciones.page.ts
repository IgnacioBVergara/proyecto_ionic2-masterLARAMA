import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-secciones',
  templateUrl: './vista-secciones.page.html',
  styleUrls: ['./vista-secciones.page.scss'],
})
export class VistaSeccionesPage implements OnInit {
  asignaturas: { nombre: string; seccion: string }[] = []; // Array para almacenar las asignaturas

  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() {
    // Recuperamos el array de asignaturas desde localStorage
    const asignaturasGuardadas = JSON.parse(localStorage.getItem('asignaturas') || '[]');
    
    // Asignamos el array recuperado a la variable asignaturas
    this.asignaturas = asignaturasGuardadas;
  }

  volverAtras() {
    this.navController.back(); // Regresa a la página anterior
  }

  irAGenerarQR(asignatura: string) {
    this.router.navigate(['/vista-generarqr'], { queryParams: { asignatura } });
  }

  irASesiones() {
    this.navController.navigateForward('/sesiones'); // Navega a la vista de sesiones
  }
}
