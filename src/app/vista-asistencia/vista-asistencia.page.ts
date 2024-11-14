import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; 
import { AuthService } from '../services/auth.service'; // Para obtener el usuario autenticado
import { ClasesService } from '../services/clases.service'; // Para obtener las sesiones QR desde Firestore

@Component({
  selector: 'app-vista-asistencia',
  templateUrl: './vista-asistencia.page.html',
  styleUrls: ['./vista-asistencia.page.scss'],
})
export class VistaAsistenciaPage implements OnInit {
  
  uidProfesor: string = ''; // UID del profesor (obtenido al iniciar sesión)
  sesiones: any[] = []; // Lista de sesiones a mostrar en la vista

  constructor(
    private navController: NavController,  // Para la navegación
    private authService: AuthService,       // Para acceder al servicio de autenticación
    private clasesService: ClasesService    // Para obtener las sesiones QR desde Firestore
  ) { }

  ngOnInit() {
    // Obtiene el UID del usuario autenticado (profesor)
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.uidProfesor = user.uid; // Asigna el UID del usuario autenticado
        this.cargarSesionesQR(); // Carga las sesiones QR del profesor
      } else {
        console.log('No hay usuario autenticado');
      }
    });
  }

  // Método para cargar las sesiones QR
  cargarSesionesQR() {
    this.clasesService.obtenerSesionesQR(this.uidProfesor).subscribe(sesiones => {
      this.sesiones = sesiones; // Asigna las sesiones obtenidas de Firestore
      console.log('Sesiones QR del profesor:', this.sesiones); // Verifica que las sesiones se hayan cargado correctamente
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
