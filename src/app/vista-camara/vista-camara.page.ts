import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';  // Importa el plugin correcto
import { FirebaseService } from '../firebase.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-vista-camara',
  templateUrl: './vista-camara.page.html',
  styleUrls: ['./vista-camara.page.scss'],
})
export class VistaCamaraPage implements OnInit {
  private scanListener: any;

  constructor(private navController: NavController, private firebaseService: FirebaseService) {}

  ngOnInit() {
    // Inicialización si es necesario
  }

  // Método para navegar hacia atrás
  volverAtras() {
    this.navController.back();
  }

  // Método para iniciar el escaneo de código QR
  async iniciarEscaneoQR() {
    // Ocultamos los elementos de la UI mientras escaneamos
    document.querySelector('body')?.classList.add('barcode-scanner-active');

    try {
      // Agregamos el listener para el evento 'barcodeScanned'
      this.scanListener = await BarcodeScanner.addListener('barcodeScanned', async (result) => {
        console.log('QR Escaneado:', result.barcode);  // Cambié a 'value' según la documentación

        // Aseguramos que el valor sea una cadena
        const qrData = String(result.barcode);  // Convertir a string, por si acaso el tipo de datos no es string

        // Guardamos la asistencia utilizando el contenido del QR
        await this.guardarAsistenciaEscaneo(qrData);  // Pasa el valor correcto del QR

        // Detenemos el escaneo
        await BarcodeScanner.stopScan();
        document.querySelector('body')?.classList.remove('barcode-scanner-active');
      });

      // Iniciamos el escaneo
      await BarcodeScanner.startScan();
    } catch (error) {
      console.error('Error al iniciar el escaneo:', error);
      document.querySelector('body')?.classList.remove('barcode-scanner-active');
    }
  }

  // Método para guardar los datos de la asistencia al escanear el QR
  async guardarAsistenciaEscaneo(qrData: string) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const horaEscaneo = new Date().toISOString(); // Hora del escaneo

      // Llamamos al servicio para guardar los datos en Firestore
      await this.firebaseService.guardarDatosEscaneo(user.uid, qrData, horaEscaneo);
      console.log('Datos de escaneo guardados correctamente');
    } else {
      console.log('No hay usuario autenticado');
    }
  }

  // Método para navegar a la página de sesiones
  irASesiones() {
    // Lógica para navegar a la página de sesiones
    this.navController.navigateForward('/sesiones');  // Redirige a la página de sesiones
  }

  // Método para detener el escaneo (opcional si lo necesitas)
  async detenerEscaneo() {
    if (this.scanListener) {
      await this.scanListener.remove();
    }
    await BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('barcode-scanner-active');
  }

  // Método para habilitar la linterna (si es necesario)
  async activarLinterna() {
    await BarcodeScanner.enableTorch();
  }

  // Método para deshabilitar la linterna (si es necesario)
  async desactivarLinterna() {
    await BarcodeScanner.disableTorch();
  }
}
