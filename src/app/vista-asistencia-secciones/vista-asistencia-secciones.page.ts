import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';  // Importar AuthService
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-asistencia-secciones',
  templateUrl: './vista-asistencia-secciones.page.html',
  styleUrls: ['./vista-asistencia-secciones.page.scss'],
})
export class VistaAsistenciaSeccionesPage implements OnInit {
  nombreUsuario: string = '';  // Variable para almacenar el nombre del usuario
  isLoading: boolean = true;   // Estado de carga para mostrar "Cargando..."

  constructor(private authService: AuthService, private navController: NavController, private router: Router) { }

  ngOnInit() {
    // Llamar al servicio para obtener los datos del usuario logueado
    this.authService.obtenerDatosUsuario().then(data => {
      console.log('Datos del usuario obtenidos:', data);  // Verifica si los datos devueltos son correctos
      // Verifica si el campo 'nombre' está presente en los datos
      if (data && data['nombre']) {
        this.nombreUsuario = data['nombre'];  // Asigna el nombre a la variable
      } else {
        this.nombreUsuario = 'Nombre no disponible';  // Si no hay nombre, asigna un valor predeterminado
      }
      this.isLoading = false;  // Cambia el estado a 'false' cuando los datos estén disponibles
    }).catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
      this.isLoading = false;  // Cambia el estado a 'false' en caso de error
    });
  }

  // Método para navegar a la sección de asistencia
  irAAsistencia(seccion: string) {
    this.router.navigate([`/vista-asistencia`], { queryParams: { seccion } });
  }

  // Método para volver a la página anterior
  volverAtras() {
    this.navController.back();
  }

  // Método para ir a la página de sesiones
  irASesiones() {
    this.navController.navigateForward('/sesiones');
  }
}
