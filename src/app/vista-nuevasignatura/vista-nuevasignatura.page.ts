import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  // Importamos el AlertController

@Component({
  selector: 'app-vista-nuevasignatura',
  templateUrl: './vista-nuevasignatura.page.html',
  styleUrls: ['./vista-nuevasignatura.page.scss'],
})
export class VistaNuevasignaturaPage implements OnInit {

  nombreAsignatura: string = '';
  seccion: string = '';

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  // Función que se ejecuta cuando se guarda la asignatura
  async guardarCambios() {
    if (this.nombreAsignatura.length < 12) {
      // Si el nombre de la asignatura tiene menos de 12 caracteres, mostramos la alerta
      const alert = await this.alertController.create({
        header: 'Nombre de Asignatura Inválido',
        message: 'El nombre de la asignatura debe tener al menos 12 caracteres.',
        buttons: ['Aceptar']
      });

      await alert.present();
    } else if (!this.seccion) {
      // Si la sección no ha sido ingresada
      const alert = await this.alertController.create({
        header: 'Sección Obligatoria',
        message: 'Por favor ingrese la sección.',
        buttons: ['Aceptar']
      });

      await alert.present();
    } else {
      // Si todo está bien, procedemos con el guardar
      console.log('Asignatura:', this.nombreAsignatura);
      console.log('Sección:', this.seccion);
      // Aquí podrías enviar estos datos a un servicio, guardarlos en el almacenamiento local, etc.

      // Redirigir a otra página, por ejemplo, a la vista de secciones
      this.router.navigate(['/vista-secciones']);
    }
  }

  // Función para volver atrás
  volverAtras() {
    this.router.navigate(['/vista-profe']); // Regresa a la vista anterior
  }

}
