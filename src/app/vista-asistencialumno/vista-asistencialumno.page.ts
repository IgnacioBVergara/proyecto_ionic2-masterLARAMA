import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ClasesService } from '../services/clases.service';
import { AlumnoData } from '../services/clases.service';
import { SesionQR } from '../services/clases.service';

@Component({
  selector: 'app-vista-asistencialumno',
  templateUrl: './vista-asistencialumno.page.html',
  styleUrls: ['./vista-asistencialumno.page.scss'],
})
export class VistaAsistencialumnoPage implements OnInit {

  uidAlumno: string = '';
  alumnoData: AlumnoData[] | null = null;
  sesionesQR: SesionQR[] = [];
  isLoading: boolean = false;
  isAlumnoDataArray: boolean = false; // Propiedad para verificar si alumnoData es un array válido

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private clasesService: ClasesService
  ) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.uidAlumno = user.uid;
        this.cargarDatosAlumno();
        this.cargarSesionesQR();
      } else {
        console.log('No hay usuario autenticado');
      }
    });
    this.cargarDatosAsistencia();
  }

  cargarDatosAlumno() {
    this.isLoading = true;
    this.clasesService.obtenerDatosAlumno(this.uidAlumno).subscribe({
      next: (alumno) => {
        // Aseguramos que alumnoData siempre sea un array, incluso si es un solo alumno
        this.alumnoData = Array.isArray(alumno) ? alumno : [alumno];
        this.isAlumnoDataArray = Array.isArray(this.alumnoData) && this.alumnoData.length > 0; // Verifica si es un array no vacío
        this.isLoading = false;
        console.log('Datos del alumno:', this.alumnoData);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al obtener datos del alumno:', err);
      }
    });
  }

  cargarDatosAsistencia() {
    this.clasesService.obtenerDatosDeAsistencia().subscribe({
      next: (datos) => {
        // Filtramos los datos para encontrar solo los registros del alumno actual
        this.alumnoData = datos.filter(alumno => alumno.uid === this.uidAlumno) || [];
        this.isAlumnoDataArray = this.alumnoData.length > 0; // Verifica si hay registros
        console.log('Datos de asistencia:', this.alumnoData);
      },
      error: (err) => {
        console.error('Error al obtener datos de asistencia:', err);
      }
    });
  }

  cargarSesionesQR() {
    this.clasesService.obtenerSesionesQRPorAlumno(this.uidAlumno).subscribe({
      next: (sesiones) => {
        this.sesionesQR = sesiones;
        if (this.sesionesQR.length === 0) {
          console.log('No hay sesiones QR para este alumno');
        } else {
          console.log('Sesiones del alumno:', this.sesionesQR);
        }
      },
      error: (err) => {
        console.error('Error al obtener sesiones del alumno:', err);
      }
    });
  }

  volverAtras() {
    this.navController.back();
  }

  irASesiones() {
    this.navController.navigateForward('/sesiones');
  }

  verAsistencia(sesion: SesionQR) {
    this.navController.navigateForward('/asistencia-detalles', {
      queryParams: { idSesion: sesion.id }
    });
  }
}
