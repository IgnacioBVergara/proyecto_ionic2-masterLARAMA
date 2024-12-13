import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';  // Importamos el AlertController para mostrar alertas
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning'; // Importamos el BarcodeScanner

@Component({
  selector: 'app-vista-camara',
  templateUrl: './vista-camara.page.html',
  styleUrls: ['./vista-camara.page.scss'],
})
export class VistaCamaraPage implements OnInit {
  qrCodeContent: string | null = null; // Almacena el resultado del código QR (por ahora no se usará)

  constructor(
    private navController: NavController,
    private alertController: AlertController // Para mostrar alertas
  ) {}

  ngOnInit() {
    // Inicialización si es necesario
  }

  // Método para navegar hacia atrás
  volverAtras() {
    this.navController.back();
  }

  // Método para mostrar alertas de errores
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para iniciar el escaneo (solo comprobar si abre la cámara)
  async iniciarEscaneoQR() {
    try {
      // Verifica si el dispositivo es compatible con el escaneo de códigos QR
      const { supported } = await BarcodeScanner.isSupported();
      if (!supported) {
        this.presentAlert('El escaneo de código QR no es compatible con este dispositivo');
        return;
      }

      // Inicia el escaneo, pero no se almacenará ningún valor en este caso
      await BarcodeScanner.startScan();

      // Si la cámara se abre correctamente, mostramos un mensaje de éxito
      console.log('Cámara abierta correctamente para escanear');
      this.presentAlert('La cámara se ha abierto correctamente. Escanea un código QR.');

    } catch (error) {
      console.error('Error al abrir la cámara:', error);
      this.presentAlert('Hubo un problema al intentar abrir la cámara');
    }
  }
}
