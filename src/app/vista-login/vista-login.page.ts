import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';  // Importamos el servicio de autenticación

@Component({
  selector: 'app-vista-login',
  templateUrl: './vista-login.page.html',
  styleUrls: ['./vista-login.page.scss'],
})
export class VistaLoginPage implements OnInit {

  correo: string = '';  // Almacenará el correo ingresado
  contrasena: string = '';  // Almacenará la contraseña ingresada

  constructor(
    private router: Router, 
    private navController: NavController,
    private authService: AuthService  // Inyectamos el servicio de autenticación
  ) { }

  ngOnInit() {}

  // Función para manejar el inicio de sesión
  async iniciarSesion() {
    try {
      if (this.correo === '' || this.contrasena === '') {
        alert('Por favor, ingresa un correo y una contraseña válidos.');
        return;
      }

      const userCredential = await this.authService.iniciarSesion(this.correo, this.contrasena);
      console.log('Usuario autenticado', userCredential);

      // Si la autenticación es exitosa, redirige a otra vista
      this.router.navigate(['/vista-profe']);  // O cualquier otra página de tu elección

    } catch (error) {
      console.error('Error en la autenticación', error);
      alert('Error al iniciar sesión. Verifica tu correo o contraseña.');
    }
  }

  // Función para redirigir al usuario a la vista de recuperación de contraseña
  recuperarContrasena() {
    this.router.navigate(['/vista-reestabler']);  // Redirige a la vista de reestablecer contraseña
  }

  // Función para regresar a la página anterior
  volverAtras() {
    this.navController.back();  // Navega a la página anterior
  }

  // Función para navegar a la vista de sesiones
  irASesiones() {
    this.navController.navigateForward('/sesiones');  // Asegúrate de que esta ruta esté configurada
  }

  // Función para redirigir al usuario a la vista de registro
  irARegistro() {
    this.router.navigate(['/vista-registro']);  // Redirige a la página de registro
  }
}
