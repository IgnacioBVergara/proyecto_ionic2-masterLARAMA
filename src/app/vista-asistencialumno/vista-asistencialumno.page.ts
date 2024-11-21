import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; // Para obtener el usuario autenticado
import { ClasesService } from '../services/clases.service'; // Para obtener las sesiones QR desde Firestore

@Component({
  selector: 'app-vista-asistencialumno',
  templateUrl: './vista-asistencialumno.page.html',
  styleUrls: ['./vista-asistencialumno.page.scss'],
})
export class VistaAsistencialumnoPage implements OnInit {

  uidAlumno: string = ''; // UID del alumno (obtenido al iniciar sesión)
  sesiones: any[] = []; // Lista de sesiones a mostrar en la vista

  constructor(
    private navController: NavController,  // Para la navegación
    private authService: AuthService,       // Para acceder al servicio de autenticación
    private clasesService: ClasesService    // Para obtener las sesiones QR desde Firestore
  ) { }

  ngOnInit() {
    // Obtiene el UID del usuario autenticado (alumno)
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.uidAlumno = user.uid; // Asigna el UID del alumno autenticado
        this.cargarSesionesQR(); // Carga las sesiones QR del alumno
      } else {
        console.log('No hay usuario autenticado');
      }
    });
  }

  // Método para cargar las sesiones QR
  cargarSesionesQR() {
    this.clasesService.obtenerSesionesQRPorAlumno(this.uidAlumno).subscribe({
      next: (sesiones) => {
        this.sesiones = sesiones; // Asigna las sesiones obtenidas de Firestore
        console.log('Sesiones QR del alumno:', this.sesiones); // Verifica que las sesiones se hayan cargado correctamente
      },
      error: (err) => {
        console.error('Error al obtener sesiones:', err); // Muestra el error en la consola
      }
    });
  }

  volverAtras() {
    this.navController.back(); // Navega a la página anterior
  }

  irASesiones() {
    this.navController.navigateForward('/sesiones'); // Navega a la página de sesiones
  }

  verAsistencia(sesion: any) {
    console.log('Ver asistencia para la sesión:', sesion);
    // Aquí podrías navegar a otra vista con la información de la sesión si es necesario
  }
}
