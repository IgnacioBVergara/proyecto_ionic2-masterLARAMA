import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ClasesService } from '../services/clases.service';

@Component({
  selector: 'app-vista-asistencia',
  templateUrl: './vista-asistencia.page.html',
  styleUrls: ['./vista-asistencia.page.scss'],
})
export class VistaAsistenciaPage implements OnInit {
  
  uidProfesor: string = ''; // UID del profesor (obtenido al iniciar sesión)
  sesiones: any[] = []; // Lista de todas las sesiones
  sesionesFiltradas: any[] = []; // Lista de sesiones filtradas por la asignatura
  nombreAsignatura: string = ''; // Nombre de la asignatura pasada desde la vista anterior

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private clasesService: ClasesService,
    private activatedRoute: ActivatedRoute // Para obtener los queryParams
  ) { }

  ngOnInit() {
    // Obtiene el UID del usuario autenticado (profesor)
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.uidProfesor = user.uid;
        this.cargarSesionesQR(); // Carga las sesiones QR del profesor
      } else {
        console.log('No hay usuario autenticado');
      }
    });

    // Obtiene el nombre de la asignatura desde los queryParams
    this.activatedRoute.queryParams.subscribe(params => {
      this.nombreAsignatura = params['nombre']; // El nombre de la asignatura
      console.log('Asignatura seleccionada:', this.nombreAsignatura);
      this.filtrarSesionesPorAsignatura();
    });
  }

  // Método para cargar las sesiones QR
  cargarSesionesQR() {
    this.clasesService.obtenerSesionesQR(this.uidProfesor).subscribe(
      sesiones => {
        this.sesiones = sesiones; // Asigna todas las sesiones obtenidas de Firestore
        console.log('Sesiones QR del profesor:', this.sesiones);
        this.filtrarSesionesPorAsignatura(); // Filtra las sesiones según la asignatura
      },
      error => {
        console.error('Error al cargar las sesiones QR:', error);
        this.sesiones = []; // Asigna un array vacío si ocurre un error
      }
    );
  }

  // Filtra las sesiones según la asignatura seleccionada
  filtrarSesionesPorAsignatura() {
    if (this.nombreAsignatura) {
      // Filtra las sesiones por nombre de asignatura
      this.sesionesFiltradas = this.sesiones.filter(sesion => sesion.asignatura === this.nombreAsignatura);
    } else {
      this.sesionesFiltradas = this.sesiones; // Si no hay asignatura seleccionada, muestra todas las sesiones
    }
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
