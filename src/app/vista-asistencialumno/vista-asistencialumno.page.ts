import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ClasesService } from '../services/clases.service';
import { AlumnoData } from '../services/clases.service'; // Asegúrate de importar tu modelo AlumnoData
import { SesionQR } from '../services/clases.service'; // Asegúrate de importar tu modelo SesionQR

@Component({
  selector: 'app-vista-asistencialumno',
  templateUrl: './vista-asistencialumno.page.html',
  styleUrls: ['./vista-asistencialumno.page.scss'],
})
export class VistaAsistencialumnoPage implements OnInit {

  uidAlumno: string = ''; // UID del alumno (obtenido al iniciar sesión)
  alumnoData: AlumnoData | null = null; // Datos del alumno, ahora puede ser null
  sesionesQR: SesionQR[] = []; // Datos de las sesiones QR para el alumno

  constructor(
    private navController: NavController,  // Para la navegación
    private authService: AuthService,       // Para acceder al servicio de autenticación
    private clasesService: ClasesService    // Para obtener los datos de las sesiones QR
  ) { }

  ngOnInit() {
    // Obtiene el UID del usuario autenticado (alumno)
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.uidAlumno = user.uid; // Asigna el UID del alumno autenticado
        this.cargarDatosAlumno();  // Carga los datos del alumno
        this.cargarSesionesQR();  // Carga las sesiones QR del alumno
      } else {
        console.log('No hay usuario autenticado');
      }
    });

    // Cargar los datos de asistencia almacenados en Firestore
    this.cargarDatosAsistencia();
  }

  // Método para cargar los datos de asistencia desde Firestore
  cargarDatosAsistencia() {
    this.clasesService.obtenerDatosDeAsistencia().subscribe({
      next: (datos) => {
        this.alumnoData = datos.length > 0 ? datos[0] : null; // Asigna el primer alumno (o null si no hay datos)
        console.log('Datos de asistencia:', this.alumnoData);
      },
      error: (err) => {
        console.error('Error al obtener datos de asistencia:', err);
      }
    });
  }

  // Método para cargar los datos del alumno
  cargarDatosAlumno() {
    this.clasesService.obtenerDatosAlumno(this.uidAlumno).subscribe({
      next: (alumno) => {
        this.alumnoData = alumno;  // Asigna el dato del alumno directamente (sin necesidad de ponerlo en un arreglo)
        console.log('Datos del alumno:', this.alumnoData);
      },
      error: (err) => {
        console.error('Error al obtener datos del alumno:', err);
      }
    });
  }

  // Método para cargar las sesiones QR del alumno
  cargarSesionesQR() {
    this.clasesService.obtenerSesionesQRPorAlumno(this.uidAlumno).subscribe({
      next: (sesiones) => {
        this.sesionesQR = sesiones; // Asigna los datos de las sesiones QR al array sesionesQR
        console.log('Sesiones del alumno:', this.sesionesQR);
      },
      error: (err) => {
        console.error('Error al obtener sesiones del alumno:', err);
      }
    });
  }

  // Método para volver a la página anterior
  volverAtras() {
    this.navController.back(); 
  }

  // Método para navegar a la vista de sesiones
  irASesiones() {
    this.navController.navigateForward('/sesiones'); 
  }

  // Método para ver la asistencia de la sesión (si es necesario)
  verAsistencia(sesion: SesionQR) {
    // Lógica para ver la asistencia de la sesión (se puede agregar un servicio o lógica adicional aquí)
    console.log('Ver asistencia para la sesión:', sesion);
  }
}
