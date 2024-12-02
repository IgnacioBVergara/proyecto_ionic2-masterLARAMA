import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where, doc, getDoc, DocumentSnapshot } from 'firebase/firestore';
import { getFirestore, Timestamp } from 'firebase/firestore'; // Asegúrate de importar Timestamp
import { Observable, from } from 'rxjs';

// Definimos y exportamos la interfaz para la sesión QR
export interface SesionQR {  // EXPORTADO
  id: string;  // ID del documento en Firestore
  asignatura: string;  // Nombre de la asignatura
  fechaGeneracion: any;  // Marca de tiempo de la fecha de generación (por ejemplo: Timestamp)
  qrUrl: string;  // URL del QR
  uidProfesor: string;  // UID del profesor que generó el QR
  uidAlumno?: string; // UID del alumno (nuevo campo, si es necesario)
  sede?: string;  // Agregamos la propiedad sede (ubicación) al modelo
}

// Definimos y exportamos la interfaz para los datos del alumno
export interface AlumnoData {  // EXPORTADO
  uid: string;
  nombre: string;
  correo: string;
  fecha: Timestamp;  // Timestamp para la fecha de registro
  rol: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private firestore: Firestore;

  constructor() {
    this.firestore = getFirestore(); // Inicializa Firestore con el SDK Modular
  }

  // Método para obtener las sesiones QR para un profesor específico
  obtenerSesionesQR(uidProfesor: string): Observable<SesionQR[]> {
    const sesionesQRRef = collection(this.firestore, 'sesionesQR'); // Colección sesionesQR
    const q = query(sesionesQRRef, where('uidProfesor', '==', uidProfesor)); // Filtra por uidProfesor

    return from(getDocs(q).then(querySnapshot => {
      const sesiones: SesionQR[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        sesiones.push({ id: doc.id, ...data } as SesionQR); // Aseguramos que el tipo es SesionQR
      });
      return sesiones;
    }));
  }

  // Método para obtener las sesiones QR de un alumno específico
  obtenerSesionesQRPorAlumno(uidAlumno: string): Observable<SesionQR[]> {
    const sesionesQRRef = collection(this.firestore, 'sesionesQR'); // Colección sesionesQR
    const q = query(sesionesQRRef, where('uidAlumno', '==', uidAlumno)); // Filtra por uidAlumno

    return from(getDocs(q).then(querySnapshot => {
      const sesiones: SesionQR[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        sesiones.push({ id: doc.id, ...data } as SesionQR); // Aseguramos que el tipo es SesionQR
      });
      return sesiones;
    }));
  }

  // Método para obtener los datos del alumno a partir del UID
  obtenerDatosAlumno(uidAlumno: string): Observable<AlumnoData | null> {
    const alumnoRef = doc(this.firestore, 'alumnos', uidAlumno); // Referencia al documento del alumno
    return from(getDoc(alumnoRef).then(docSnap => {
      if (docSnap.exists()) {
        const data = docSnap.data();  // Obtiene los datos del documento

        // Validación de los datos para asegurarse que contengan las propiedades correctas
        if (data && this.esAlumnoData(data)) {
          // Convertimos 'fecha' a Timestamp si no lo es ya
          const fecha = this.convertirAFirebaseTimestamp(data.fecha);

          return {
            uid: data.uid,
            nombre: data.nombre,
            correo: data.correo,
            fecha: fecha,  // Aseguramos que fecha es un Timestamp
            rol: data.rol,
            estado: data.estado
          } as AlumnoData;
        } else {
          console.error('Datos del alumno incompletos o inválidos', data);
          return null;  // Si los datos son incorrectos o incompletos, retorna null
        }
      } else {
        console.log('No se encontró el alumno');
        return null;  // Si no existe el documento, retornamos null
      }
    }));
  }

  // Método para obtener los datos de asistencia desde la colección 'asistenciaqrree'
  obtenerDatosDeAsistencia(): Observable<AlumnoData[]> {
    const asistenciaRef = collection(this.firestore, 'asistenciaqrree'); // Colección asistenciaqrree
    return from(getDocs(asistenciaRef).then(querySnapshot => {
      const asistencia: AlumnoData[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();  // Obtiene los datos del documento

        // Validamos y aseguramos que los datos sean del tipo AlumnoData
        if (data && this.esAlumnoData(data)) {
          // Convertimos 'fecha' a Timestamp si no lo es ya
          const fecha = this.convertirAFirebaseTimestamp(data.fecha);

          asistencia.push({
            uid: data.uid,
            nombre: data.nombre,
            correo: data.correo,
            fecha: fecha,  // Aseguramos que fecha es un Timestamp
            rol: data.rol,
            estado: data.estado
          } as AlumnoData);
        } else {
          console.error('Datos de asistencia incompletos para el documento:', doc.id);
        }
      });
      return asistencia;
    }));
  }

  // Función para verificar que los datos son del tipo AlumnoData
  private esAlumnoData(data: any): data is AlumnoData {
    return data && typeof data.uid === 'string' && typeof data.nombre === 'string' && typeof data.correo === 'string' && data.fecha instanceof Timestamp && typeof data.rol === 'string' && typeof data.estado === 'string';
  }

  // Función para convertir un valor a Firebase Timestamp si es necesario
  private convertirAFirebaseTimestamp(fecha: any): Timestamp {
    if (fecha instanceof Timestamp) {
      return fecha; // Ya es un Timestamp
    } else if (fecha && fecha.seconds) {
      // Si 'fecha' tiene la propiedad 'seconds', podemos asumir que es un objeto con el formato de Timestamp
      return new Timestamp(fecha.seconds, fecha.nanoseconds);
    } else {
      // Si no es un Timestamp ni tiene la propiedad 'seconds', devolvemos el Timestamp actual
      return Timestamp.now();
    }
  }
}
