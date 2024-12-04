import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import jsQR from 'jsqr';  // Asegúrate de tener jsQR instalado

@Component({
  selector: 'app-vista-camara',
  templateUrl: './vista-camara.page.html',
  styleUrls: ['./vista-camara.page.scss'],
})
export class VistaCamaraPage implements AfterViewInit {

  @ViewChild('video', { static: false }) videoElement!: ElementRef; // Usamos "!" para indicar que no será null
  @ViewChild('canvas', { static: false }) canvasElement!: ElementRef; // Usamos "!" para indicar que no será null

  constructor() {}

  // El ciclo de vida AfterViewInit asegura que las vistas estén completamente inicializadas
  ngAfterViewInit() {
    this.obtenerPermisosYAccederACamara(); // Ahora podemos usar las referencias después de la inicialización
  }

  // Método para acceder a la cámara
  async obtenerPermisosYAccederACamara() {
    try {
      // Pide permisos para la cámara en plataformas móviles
      const permiso = await Camera.requestPermissions();
      if (permiso.camera) {
        this.iniciarEscaneoQR(); // Si se concede el permiso, iniciar escaneo
      }
    } catch (error) {
      console.error('Error al obtener permisos de cámara:', error);
    }
  }

  // Inicia el escaneo del código QR
  iniciarEscaneoQR() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');

    // Inicia la captura de la cámara
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream;
      video.play();

      // Configuración del canvas
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const detectarQR = () => {
        // Dibuja el frame del video en el canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Intenta detectar un código QR en el canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

        // Si se detecta un QR, mostrar el resultado
        if (qrCode) {
          console.log('Código QR detectado:', qrCode.data);
          // Aquí puedes hacer algo con el QR detectado, como redirigir o almacenar datos
        }

        // Llamar a la función en un ciclo para seguir detectando
        requestAnimationFrame(detectarQR);
      };

      // Comienza el ciclo de detección de QR
      detectarQR();
    }).catch((error) => {
      console.error('Error al acceder a la cámara:', error);
    });
  }

  // Método para guardar los datos del alumno (sin necesidad de escanear)
  guardarDatosAlumno() {
    console.log("Datos del alumno guardados sin escanear.");
    // Aquí puedes añadir la lógica para guardar los datos del alumno sin escanear un QR
  }

  // Método para volver a la vista anterior
  volverAtras() {
    // Implementar la lógica para navegar hacia atrás (si es necesario)
  }

  // Método para ir a la página de sesiones
  irASesiones() {
    console.log("Ir a la página de sesiones.");
    // Implementar la navegación a la página de sesiones
  }
}
