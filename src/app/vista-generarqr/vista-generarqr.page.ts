import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';  // Importamos ActivatedRoute
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

  constructor(
    private navController: NavController,
    private router: Router,
    private route: ActivatedRoute,  // Para obtener parámetros de la URL
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    // Obtener el parámetro 'asignatura' de la URL
    this.route.queryParams.subscribe(params => {
      if (params['asignatura']) {
        this.asignatura = params['asignatura'];  // Guardamos la asignatura seleccionada
        console.log('Asignatura seleccionada:', this.asignatura);
      }
    });

    // Obtener el UID del usuario autenticado
    const auth = getAuth();
    const user = auth.currentUser;
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

  // Método para volver a la vista anterior
  volverAtras() {
    this.navController.back();
  }

  // Método para generar el QR
  generarQR() {
    const auth = getAuth();
    const user = auth.currentUser;  // Obtener el usuario autenticado

    if (user && this.asignatura) {
      // Generar un enlace con el UID del usuario y la asignatura seleccionada
      this.qrData = `https://example.com/escaneo/${user.uid}/${this.asignatura}`;

      // Ahora guardamos la sesión en Firestore con el nombre de la asignatura
      this.firebaseService.guardarSesionQR(user.uid, this.asignatura, this.qrData);  // Guardamos la sesión QR

    } else {
      // Si no hay usuario autenticado o asignatura seleccionada, manejar el error
      console.error('No se ha seleccionado una asignatura o no hay usuario autenticado');
      alert('Por favor, selecciona una asignatura y asegúrate de estar autenticado');
    }
  }
}
