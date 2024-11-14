import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private firestore: Firestore;

  constructor() {
    this.firestore = getFirestore(); // Inicializa Firestore con el SDK Modular
  }

  // Método para obtener las sesiones QR para un profesor específico
  obtenerSesionesQR(uidProfesor: string): Observable<any[]> {
    const sesionesQRRef = collection(this.firestore, 'sesionesQR'); // Colección sesionesQR
    const q = query(sesionesQRRef, where('uidProfesor', '==', uidProfesor)); // Filtra por uidProfesor

    return from(getDocs(q).then(querySnapshot => {
      const sesiones: any[] = [];
      querySnapshot.forEach(doc => {
        sesiones.push({ id: doc.id, ...doc.data() }); // Añade el id y los datos del documento
      });
      return sesiones; // Retorna las sesiones obtenidas
    }));
  }
}
