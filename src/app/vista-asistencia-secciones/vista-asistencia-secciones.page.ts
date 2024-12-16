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

  volverAtras() {
    this.navController.back();
  }

  irAGenerarQR(nombre: string) {
    // Lógica para generar el QR o navegar a la vista correspondiente
    console.log('Generar QR para: ' + nombre);
  }

  irASesiones() {
    this.navController.navigateForward('/sesiones');
  }
}
