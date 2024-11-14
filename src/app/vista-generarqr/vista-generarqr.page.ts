import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-vista-generarqr',
  templateUrl: './vista-generarqr.page.html',
  styleUrls: ['./vista-generarqr.page.scss'],
})
export class VistaGenerarqrPage implements OnInit {

  qrData: string = '';  // Contendrá la URL para el código QR
  asignatura: string = '';  // Asignatura seleccionada por el profesor
  nombreProfesor: string = '';  // Nombre del profesor

  constructor(private navController: NavController, private router: Router, private firebaseService: FirebaseService) {}

  ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;  // Obtener el usuario autenticado
    if (user) {
      console.log('UID del usuario autenticado:', user.uid);
      
      // Obtener el nombre del profesor desde Firestore
      this.firebaseService.obtenerNombreProfesor(user.uid).then((nombre) => {
        this.nombreProfesor = nombre;
        console.log('Nombre del profesor:', this.nombreProfesor);
      }).catch((error) => {
        console.error('Error al obtener el nombre del profesor:', error);
      });
    } else {
      console.log('No hay usuario autenticado');
    }
  }

  // Esta función se activa cuando el profesor selecciona la asignatura
  onAsignaturaSeleccionada(event: any) {
    this.asignatura = event.target.value;  // Guardamos la asignatura seleccionada
    console.log('Asignatura seleccionada:', this.asignatura);
  }

  volverAtras() {
    this.navController.back();
  }

  generarQR() {
    const auth = getAuth();
    const user = auth.currentUser;  // Obtener el usuario autenticado

    if (user) {
      // Generar un enlace con el UID del usuario, puede ser algo como:
      this.qrData = `https://example.com/escaneo/${user.uid}`;

      // Ahora guardamos la sesión en Firestore con el nombre de la asignatura
      this.firebaseService.guardarSesionQR(user.uid, this.asignatura, this.qrData);  // Guardamos la sesión QR

    } else {
      // Si no hay usuario autenticado, manejar el error
      this.qrData = '';
    }
  }
}
