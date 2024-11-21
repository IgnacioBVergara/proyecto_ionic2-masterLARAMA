import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable, from } from 'rxjs';

// Definimos la interfaz para la sesión QR
interface SesionQR {
  id: string;  // ID del documento en Firestore
  asignatura: string;  // Nombre de la asignatura
  fechaGeneracion: any;  // Marca de tiempo de la fecha de generación (por ejemplo: Timestamp)
  qrUrl: string;  // URL del QR
  uidProfesor: string;  // UID del profesor que generó el QR
  uidAlumno?: string; // UID del alumno (nuevo campo, si es necesario)
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
        sesiones.push({ id: doc.id, ...doc.data() } as SesionQR);
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
        sesiones.push({ id: doc.id, ...doc.data() } as SesionQR);
      });
      return sesiones;
    }));
  }
}
