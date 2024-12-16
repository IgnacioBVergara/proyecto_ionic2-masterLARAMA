import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importamos el AlertController

@Component({
  selector: 'app-vista-nuevasignatura',
  templateUrl: './vista-nuevasignatura.page.html',
  styleUrls: ['./vista-nuevasignatura.page.scss'],
})
export class VistaNuevasignaturaPage implements OnInit {
  nombreAsignatura: string = '';
  seccion: string = '';

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {}

  // Función para guardar los cambios de la asignatura
  async guardarCambios() {
    if (this.nombreAsignatura.length < 5) {
      const alert = await this.alertController.create({
        header: 'Nombre de Asignatura Inválido',
        message: 'El nombre de la asignatura debe tener al menos 5 caracteres.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    } else if (!this.seccion) {
      const alert = await this.alertController.create({
        header: 'Sección Obligatoria',
        message: 'Por favor ingrese la sección.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    } else {
      // Creamos un objeto de la nueva asignatura
      const nuevaAsignatura = { nombre: this.nombreAsignatura, seccion: this.seccion };
  
      // Recuperamos el array de asignaturas almacenadas en localStorage (si existe)
      const asignaturasGuardadas = JSON.parse(localStorage.getItem('asignaturas') || '[]');
  
      // Añadimos la nueva asignatura al array
      asignaturasGuardadas.push(nuevaAsignatura);
  
      // Guardamos el array actualizado en localStorage
      localStorage.setItem('asignaturas', JSON.stringify(asignaturasGuardadas));
  
      // Redirigimos a la vista de secciones
      this.router.navigate(['/vista-secciones']);
    }
  }
  
  

  volverAtras() {
    this.router.navigate(['/vista-profe']); // Regresa a la vista anterior
  }
}
