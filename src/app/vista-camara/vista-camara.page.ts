import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { getAuth } from 'firebase/auth';
import { AlertController } from '@ionic/angular';  // Importamos el AlertController para mostrar alertas

@Component({
  selector: 'app-vista-camara',
  templateUrl: './vista-camara.page.html',
  styleUrls: ['./vista-camara.page.scss'],
})
export class VistaCamaraPage implements OnInit {
  isSupported = false;  // Variable para saber si el dispositivo soporta el escaneo
  barcodes: Barcode[] = [];  // Lista de códigos escaneados

  constructor(
    private navController: NavController,
    private firebaseService: FirebaseService,
    private alertController: AlertController // Agregado para mostrar alertas
  ) {}

  ngOnInit() {
    // Verificamos si el dispositivo soporta el escáner
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
      console.log('Dispositivo soporta escaneo:', this.isSupported);  // Añadido para ver si el dispositivo soporta el escaneo
    });
  }

  // Método para iniciar el escaneo de código QR
  async iniciarEscaneoQR() {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert('Permiso denegado. Por favor habilita el acceso a la cámara.');
      return;
    }

    try {
      // Iniciamos el escaneo y esperamos el resultado
      const { barcodes } = await BarcodeScanner.scan();

      console.log('Códigos escaneados:', barcodes);  // Mostrar todos los códigos escaneados en el log

      // Si encontramos códigos escaneados, los agregamos a la lista
      if (barcodes && barcodes.length > 0) {
        this.barcodes.push(...barcodes);  // Añadimos los códigos escaneados a la lista
        const result = barcodes[0].rawValue;  // Usamos 'rawValue' para obtener el valor del código
        console.log('QR Escaneado:', result);  // El valor escaneado

        // Guardamos la asistencia utilizando el contenido del QR
        await this.guardarAsistenciaEscaneo(result);
      }
    } catch (error) {
      console.error('Error al iniciar el escaneo:', error);
    }
  }

  // Método para guardar los datos de la asistencia al escanear el QR
  async guardarAsistenciaEscaneo(qrData: string) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const horaEscaneo = new Date().toISOString(); // Hora del escaneo

      // Aquí extraemos la información del QR (suponiendo que el QR contiene una URL con los datos)
      const partesQR = qrData.split('/'); // Dividimos la URL en partes para obtener el UID del profesor y la asignatura
      const uidProfesor = partesQR[4];  // Suponiendo que la URL tiene la forma 'https://example.com/escaneo/{uid}/{asignatura}'
      const asignatura = partesQR[5];

      // Llamamos al servicio para guardar los datos en Firestore
      await this.firebaseService.guardarDatosEscaneo(user.uid, uidProfesor, asignatura,"a");
      console.log('Datos de escaneo guardados correctamente');
    } else {
      console.log('No hay usuario autenticado');
    }
  }

  // Método para solicitar permisos de la cámara
  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
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
}
