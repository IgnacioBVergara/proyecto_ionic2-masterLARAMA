import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-asistencia-secciones',
  templateUrl: './vista-asistencia-secciones.page.html',
  styleUrls: ['./vista-asistencia-secciones.page.scss'],
})
export class VistaAsistenciaSeccionesPage implements OnInit {
  asignaturas: { nombre: string, seccion: string }[] = [];

  constructor(private navController: NavController, private router: Router) {}

  ngOnInit() {
    // Cargar las asignaturas desde localStorage
    const storedAsignaturas = localStorage.getItem('asignaturas');
    if (storedAsignaturas) {
      this.asignaturas = JSON.parse(storedAsignaturas);
    }
  }

  // Método para ir atrás
  volverAtras() {
    this.navController.back();
  }

  // Método para generar el QR y navegar a la vista de asistencia
  irAGenerarQR(nombre: string) {
    // Aquí navegamos a la vista de asistencia, pasando los parámetros necesarios
    this.router.navigate(['/vista-asistencia'], { queryParams: { nombre } });
    console.log('Generar QR para: ' + nombre);
  }

  // Método para ir a la vista de sesiones
  irASesiones() {
    this.navController.navigateForward('/sesiones');
  }
}
