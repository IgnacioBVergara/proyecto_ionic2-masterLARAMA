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

    // Usamos `from` para crear un observable y manejar la promesa de `getDocs`
    return from(getDocs(q).then(querySnapshot => {
      const sesiones: SesionQR[] = [];  // Arreglo para almacenar las sesiones
      querySnapshot.forEach(doc => {
        // Aquí agregamos los datos del documento junto con el ID
        sesiones.push({ id: doc.id, ...doc.data() } as SesionQR);
      });
      return sesiones;  // Retorna el arreglo de sesiones
    }));
  }
}
