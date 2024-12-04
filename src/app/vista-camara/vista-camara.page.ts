import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';  // Importar el plugin BarcodeScanner
import { Router } from '@angular/router';  // Importar el router para navegación

@Component({
  selector: 'app-vista-camara',
  templateUrl: './vista-camara.page.html',
  styleUrls: ['./vista-camara.page.scss'],
})
export class VistaCamaraPage implements OnInit {

  scanning: boolean = false;  // Estado para verificar si estamos escaneando

  constructor(private router: Router) { }

  ngOnInit() {}

  // Función para iniciar el escaneo
  async iniciarEscaneoQR() {
    if (this.scanning) {
      console.log('Ya se está escaneando');
      return;  // Si ya está escaneando, no hace nada
    }

    this.scanning = true;

    try {
      // Iniciar el escaneo
      const result: any = await BarcodeScanner.startScan();  // Usar 'any' por ahora para manejar el retorno vacío
      if (result?.value) {  // Verificamos si 'result' tiene una propiedad 'value'
        console.log('Código QR escaneado:', result.value);
        // Aquí puedes procesar el contenido del código QR
      } else {
        console.log('No se escaneó ningún código');
      }
    } catch (error) {
      console.error('Error al escanear:', error);
      alert('No se pudo acceder a la cámara.');
    } finally {
      this.detenerEscaneoQR();  // Detener el escaneo
    }
  }

  // Función para detener el escaneo
  async detenerEscaneoQR() {
    this.scanning = false;
    BarcodeScanner.stopScan();  // Detener el escaneo de la cámara
  }

  // Función 'volverAtras' para navegar hacia la página anterior
  volverAtras() {
    this.router.navigate(['/home']);  // Ajusta la ruta según tus necesidades
  }

  // Función 'guardarDatosAlumno'
  async guardarDatosAlumno() {
    console.log('Datos del alumno guardados');
    // Implementa la lógica de guardado aquí
  }

  // Función 'irASesiones'
  irASesiones() {
    this.router.navigate(['/sesiones']);  // Ajusta la ruta de sesiones según corresponda
  }
}
