import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; // Asegúrate de tener este servicio de autenticación

@Component({
  selector: 'app-vista-registro',
  templateUrl: './vista-registro.page.html',
  styleUrls: ['./vista-registro.page.scss'],
})
export class VistaRegistroPage implements OnInit {

  // Declaración de las propiedades utilizadas en el formulario
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  rol: string = ''; // Aquí guardamos el rol, que será 'profesor' o 'alumno'

  constructor(private router: Router, private navController: NavController, private authService: AuthService) { }

  ngOnInit() {}

  // Método para registrar al usuario
  registrarUsuario() {
    // Validar que las contraseñas coincidan
    if (this.contrasena === this.confirmarContrasena) {

      // Verificar el tipo de correo y asignar el rol correspondiente
      if (this.correo.endsWith('@profesor.cl')) {
        this.rol = 'profesor'; // Rol para el correo de profesor
      } else if (this.correo.endsWith('@alumno.cl')) {
        this.rol = 'alumno'; // Rol para el correo de alumno
      } else {
        alert('El correo debe ser de tipo @profesor.cl o @alumno.cl');
        return;
      }

      // Llamada al servicio de autenticación para registrar al usuario
      this.authService.registrarUsuario(this.nombre, this.correo, this.contrasena, this.rol)
        .then(() => {
          console.log('Usuario registrado exitosamente');
          // Redirigir según el rol asignado
          if (this.rol === 'profesor') {
            this.router.navigate(['/vista-profe']); // Redirigir a la vista de profesor
          } else {
            this.router.navigate(['/vista-alumno']); // Redirigir a la vista de alumno
          }
        })
        .catch((error: any) => {  // Especificamos que el tipo de 'error' es 'any'
          console.error('Error al registrar el usuario:', error);
        });
    } else {
      console.log('Las contraseñas no coinciden');
    }
  }

  // Método para redirigir a la vista de login
  irALogin() {
    this.router.navigate(['/vista-login']);
  }

  // Método para navegar a la vista de sesiones
  irASesiones() {
    this.navController.navigateForward('/sesiones');
  }

  // Método para volver a la página anterior
  volverAtras() {
    this.navController.back();
  }
}
