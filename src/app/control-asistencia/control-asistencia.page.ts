import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-control-asistencia',
  templateUrl: './control-asistencia.page.html',
  styleUrls: ['./control-asistencia.page.scss'],
})
export class ControlAsistenciaPage {
  students = [
    { name: 'Juan Pérez', present: false, absent: false, justified: false },
    { name: 'María López', present: false, absent: false, justified: false },
    { name: 'Carlos García', present: false, absent: false, justified: false },
    { name: 'Ana Martínez', present: false, absent: false, justified: false },
    { name: 'Luis Fernández', present: false, absent: false, justified: false },
    { name: 'Sofía Rodríguez', present: false, absent: false, justified: false },
    { name: 'Diego Sánchez', present: false, absent: false, justified: false },
    { name: 'Valeria Torres', present: false, absent: false, justified: false },
    { name: 'Andrés Morales', present: false, absent: false, justified: false },
    { name: 'Claudia Jiménez', present: false, absent: false, justified: false },
    { name: 'Javier Castro', present: false, absent: false, justified: false },
    { name: 'Laura Ortega', present: false, absent: false, justified: false },
    { name: 'Felipe Ramírez', present: false, absent: false, justified: false },
    { name: 'Patricia Herrera', present: false, absent: false, justified: false },
    { name: 'Ricardo Vega', present: false, absent: false, justified: false },
    { name: 'Teresa Ruiz', present: false, absent: false, justified: false },
    { name: 'ignacio Ruiz', present: false, absent: false, justified: false },
    { name: 'ian Ruiz', present: false, absent: false, justified: false }
  ];
  
  
  

  alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Aceptar',
      handler: () => {
        console.log('Accept clicked');
      }
    }
  ];

  constructor(private alertController: AlertController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿se registrara el control de acceso?',
      buttons: this.alertButtons
    });

    await alert.present();
  }
}

