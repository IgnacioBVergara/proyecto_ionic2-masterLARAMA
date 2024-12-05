import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning'; // Asegúrate de tener la importación correcta
import { FirebaseService } from '../firebase.service';
import { getAuth } from 'firebase/auth';
import { AlertController } from '@ionic/angular';  // Importamos el AlertController para mostrar alertas

@Component({
  selector: 'app-vista-camara',
  templateUrl: './vista-camara.page.html',
  styleUrls: ['./vista-camara.page.scss'],
})
export class VistaCamaraPage implements OnInit {
  private scanListener: any;

  constructor(
    private navController: NavController,
    private firebaseService: FirebaseService,
    private alertController: AlertController // Agregado para mostrar alertas
  ) {}

  ngOnInit() {
    // Inicialización si es necesario
  }

  // Método para navegar hacia atrás
  volverAtras() {
    this.navController.back();
  }

  // Método para iniciar el escaneo de código QR
  async iniciarEscaneoQR() {
    // Verificamos si el dispositivo soporta el escáner
    const isSupported = await BarcodeScanner.isSupported();
    console.log('Soporte de escáner en el dispositivo:', isSupported);  // Mostrar si el dispositivo soporta el escáner
    if (!isSupported) {
      this.presentAlert('Este dispositivo no soporta escaneo de códigos QR.');
      return;
    }

    // Solicitamos permisos antes de proceder
    const granted = await this.requestPermissions();
    console.log('Permisos de cámara otorgados:', granted);  // Mostrar si los permisos de cámara han sido otorgados
    if (!granted) {
      this.presentAlert('Permiso denegado. Por favor habilita el acceso a la cámara.');
      return;
    }

    // Ocultamos los elementos de la UI mientras escaneamos
    document.querySelector('body')?.classList.add('barcode-scanner-active');
    console.log('Iniciando el escaneo...');  // Indicar que se está iniciando el escaneo

    try {
      // Iniciamos el escaneo y esperamos el resultado
      const { barcodes } = await BarcodeScanner.scan();
      console.log('Resultado del escaneo:', barcodes);  // Mostrar el resultado del escaneo

      if (barcodes && barcodes.length > 0) {
        const result = barcodes[0].rawValue;  // Usamos 'rawValue' en lugar de 'data'
        console.log('QR Escaneado:', result);  // El valor escaneado

        // Guardamos la asistencia utilizando el contenido del QR
        await this.guardarAsistenciaEscaneo(result);

        // Detenemos el escaneo
        await BarcodeScanner.stopScan();
        document.querySelector('body')?.classList.remove('barcode-scanner-active');
        console.log('Escaneo detenido');  // Confirmación de que el escaneo ha terminado
      }
    } catch (error) {
      console.error('Error al iniciar el escaneo:', error);  // Mostrar cualquier error que ocurra al intentar iniciar el escaneo
      document.querySelector('body')?.classList.remove('barcode-scanner-active');
      this.presentAlert('Error al intentar escanear el código. Por favor, intenta de nuevo.');
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

      console.log('Usuario autenticado:', user.uid);  // Mostrar el UID del usuario autenticado
      console.log('Datos del QR:', qrData);  // Mostrar los datos extraídos del QR antes de guardarlos

      try {
        // Llamamos al servicio para guardar los datos en Firestore
        await this.firebaseService.guardarDatosEscaneo(user.uid, uidProfesor, asignatura, "a");
        console.log('Datos de escaneo guardados correctamente');  // Confirmar que los datos se guardaron correctamente
      } catch (error) {
        console.error('Error al guardar los datos en Firestore:', error);
        this.presentAlert('Hubo un problema al guardar los datos. Inténtalo más tarde.');
      }
    } else {
      console.log('No hay usuario autenticado');  // Mostrar si no hay usuario autenticado
      this.presentAlert('Por favor, inicia sesión para registrar tu asistencia.');
    }
  }

  // Método para navegar a la página de sesiones
  irASesiones() {
    this.navController.navigateForward('/sesiones');
  }

  // Método para detener el escaneo (opcional si lo necesitas)
  async detenerEscaneo() {
    if (this.scanListener) {
      await this.scanListener.remove();
    }
    await BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('barcode-scanner-active');
    console.log('Escaneo detenido manualmente');
  }

  // Método para habilitar la linterna (si es necesario)
  async activarLinterna() {
    await BarcodeScanner.enableTorch();
    console.log('Linterna activada');
  }

  // Método para deshabilitar la linterna (si es necesario)
  async desactivarLinterna() {
    await BarcodeScanner.disableTorch();
    console.log('Linterna desactivada');
  }

  // Método para solicitar permisos de la cámara
  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    console.log('Estado de los permisos de cámara:', camera);  // Imprimir el estado de los permisos
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
