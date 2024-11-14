import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BrowserMultiFormatReader } from '@zxing/library';  // Importación correcta de la librería ZXing
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';  // API modular de Firestore
import { initializeApp } from 'firebase/app';  // Inicialización de Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';  // Autenticación de Firebase
import { environment } from '../../environments/environment';  // Configuración de Firebase

// Definir la interfaz AlumnoData para los datos que se guardan
interface AlumnoData {
  uid: string;
  correo: string;
  nombre: string;
  fecha: Timestamp;  // Usamos Timestamp para la fecha
  rol: string;
  estado: string;
}

@Component({
  selector: 'app-vista-camara',
  templateUrl: './vista-camara.page.html',
  styleUrls: ['./vista-camara.page.scss'],
})
export class VistaCamaraPage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('video', { static: false }) video!: ElementRef;  // Uso de "!" para suprimir el error de inicialización
  private codeReader: BrowserMultiFormatReader;  // Instancia del lector de códigos
  private scanning: boolean = false;  // Controla si está escaneando o no
  private firestore: any;  // Instancia Firestore
  private uid: string | null = null;  // UID del usuario autenticado
  private usuarioAutenticado: boolean = false; // Flag de autenticación
  private correoUsuario: string | null = null;  // Correo del usuario
  private nombreUsuario: string | null = null;  // Nombre del usuario
  private usuarioCargado: boolean = false; // Indica si el usuario ya está completamente cargado

  constructor(private navController: NavController) {
    // Inicializa Firebase
    initializeApp(environment.firebaseConfig);  // Usamos el entorno de configuración de Firebase

    // Inicializa el lector de códigos QR
    this.codeReader = new BrowserMultiFormatReader();

    // Inicializa Firestore usando la nueva API modular
    this.firestore = getFirestore();

    // Obtener el estado de autenticación
    this.obtenerUsuarioAutenticado();
  }

  // Función para obtener el usuario autenticado
  obtenerUsuarioAutenticado() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        this.correoUsuario = user.email;  // Obtener el correo del usuario
        this.nombreUsuario = user.displayName;  // Obtener el nombre del usuario (si está disponible)
        this.usuarioAutenticado = true;
        this.usuarioCargado = true;  // Indicamos que el usuario ha sido cargado correctamente
        console.log("Usuario autenticado:", user.email);
      } else {
        this.usuarioAutenticado = false;
        this.usuarioCargado = true;  // También indicamos que el estado de autenticación ha finalizado
        console.log("No hay usuario autenticado.");
      }
    });
  }

  ngOnInit() {
    // No es necesario inicializar aquí, ya lo hicimos en el constructor
  }

  ngAfterViewInit() {
    // Asegúrate de que el video esté disponible
    if (this.video) {
      console.log('Referencia al video disponible:', this.video.nativeElement);
    }
  }

  ngOnDestroy() {
    // Detener el escaneo cuando el componente se destruya
    if (this.scanning) {
      this.detenerEscaneoQR();
    }
  }

  volverAtras() {
    this.navController.back();  // Navegar a la página anterior
  }

  irASesiones() {
    this.navController.navigateForward('/sesiones');  // Navegar a la vista de sesiones
  }

  // Función para guardar los datos del alumno en la nueva colección 'asistenciaqrree'
  async guardarDatosAlumno() {
    // Usamos valores predeterminados si los datos no están disponibles
    const uid = this.uid || "usuario_no_autenticado";  // UID predeterminado si no está disponible
    const correo = this.correoUsuario || "usuario@noautenticado.com";  // Correo predeterminado
    const nombre = this.nombreUsuario || "Usuario Sin Nombre";  // Nombre predeterminado
    const telefono = "";  // Teléfono vacío por defecto
    const direccion = "";  // Dirección vacía por defecto

    // Crear el objeto con los datos del alumno usando la interfaz AlumnoData
    const alumnoData: AlumnoData = {
      uid: uid,  // UID del usuario (ahora predeterminado si no está disponible)
      correo: correo,  // Correo del usuario (ahora predeterminado)
      nombre: nombre,  // Nombre del usuario (ahora predeterminado)
      fecha: Timestamp.fromDate(new Date()),  // Usar Timestamp de Firebase
      rol: 'alumno',  // Rol del alumno
      estado: 'activo'  // Estado de la sesión (puede ser 'activo', 'completado', etc.)
    };

    try {
      console.log("Guardando datos del alumno en Firestore...");
      // Guardar los datos en Firestore en la colección 'asistenciaqrree'
      const docRef = await addDoc(collection(this.firestore, 'asistenciaqrree'), alumnoData);
      console.log('Datos del alumno guardados correctamente con ID:', docRef.id);
      alert('Datos guardados correctamente');
    } catch (error) {
      console.error('Error al guardar los datos en Firebase:', error);
      alert('Error al guardar los datos. Por favor, intenta nuevamente.');
    }
  }

  // Iniciar escaneo de QR
  async iniciarEscaneoQR() {
    if (!this.usuarioAutenticado) {
      alert('Debes estar autenticado para realizar el escaneo.');
      return;
    }

    try {
      if (this.scanning) {
        console.log('Ya se está escaneando');
        return;  // Si ya está escaneando, no hace nada
      }

      this.scanning = true;

      // Asegúrate de que el video esté correctamente referenciado
      const video = this.video.nativeElement;

      // Solicitar acceso a la cámara
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',  // Usar la cámara trasera
        }
      });

      // Configurar el flujo de video en el elemento <video>
      video.srcObject = stream;
      video.setAttribute('playsinline', 'true'); // Requerido para iOS
      video.play();

      // Iniciar el escaneo de QR desde el video
      this.codeReader.decodeFromVideoDevice(null, video, (result, err) => {
        if (result) {
          console.log('Código QR escaneado: ', result.getText());
          // Guardar los datos del alumno si se escanea correctamente
          this.guardarDatosAlumno();
          this.detenerEscaneoQR();  // Detener escaneo después de leer el QR
        }
        if (err) {
          console.error('Error al leer el QR: ', err);
        }
      });
    } catch (error) {
      console.error('Error al acceder a la cámara: ', error);
      alert('No se pudo acceder a la cámara. Asegúrate de que está habilitada.');
    }
  }

  // Detener el escaneo y liberar los recursos
  async detenerEscaneoQR() {
    this.scanning = false;
    const video = this.video.nativeElement;
    const stream = video.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    tracks?.forEach(track => track.stop());  // Detener la cámara

    video.srcObject = null;  // Liberar el video
  }
}
