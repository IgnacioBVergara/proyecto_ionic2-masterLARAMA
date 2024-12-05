import { Injectable } from '@angular/core';
import { getFirestore, doc, setDoc, collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';  // Importar funciones necesarias
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db = getFirestore(initializeApp(environment.firebaseConfig));  // Inicializamos Firestore

  constructor() {}

  // Método para guardar la información del usuario en Firestore
  async guardarUsuario(uid: string, nombre: string, correo: string, rol: string) {
    try {
      // Usamos setDoc para guardar el usuario usando su UID como ID del documento
      const docRef = doc(this.db, 'usuarios', uid);  // Usamos el UID como ID del documento
      await setDoc(docRef, {
        uid: uid,               // UID del usuario (viene de Firebase Authentication)
        nombre: nombre,         // Nombre del usuario
        correo: correo,         // Correo del usuario
        rol: rol,               // Rol del usuario
        fechaRegistro: new Date(), // Fecha de registro
      });

      console.log('Usuario guardado con UID:', uid);
      return uid;  // Retornamos el UID del usuario como referencia
    } catch (e) {
      console.error('Error al guardar el usuario en Firestore:', e);
      throw e;  // Propaga el error si algo falla
    }
  }

  // Método para obtener el nombre del profesor desde Firestore usando el UID
  async obtenerNombreProfesor(uid: string): Promise<string> {
    try {
      // Crear una consulta para buscar el documento en la colección "usuarios"
      const querySnapshot = await getDocs(query(collection(this.db, 'usuarios'), where('uid', '==', uid)));

      if (!querySnapshot.empty) {
        // Si encontramos el documento, extraemos el nombre del docente
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();  // Obtenemos los datos del documento

        return data['nombre'];  // Accedemos a la propiedad 'nombre'
      } else {
        // Si no se encuentra el documento
        throw new Error('Usuario no encontrado');
      }
    } catch (e) {
      console.error('Error al obtener el nombre del profesor:', e);
      throw e;  // Propaga el error si algo falla
    }
  }

  // Método para guardar la sesión QR
  async guardarSesionQR(uid: string, asignatura: string, qrUrl: string): Promise<void> {
    try {
      // Guardamos la sesión QR en la colección "sesionesQR"
      const docRef = await addDoc(collection(this.db, 'sesionesQR'), {
        uidProfesor: uid,         // UID del profesor
        asignatura: asignatura,   // Asignatura del profesor
        qrUrl: qrUrl,             // URL generada para el QR
        fechaGeneracion: new Date(),  // Fecha de generación del QR
      });
      console.log('QR guardado con ID:', docRef.id);
    } catch (e) {
      console.error('Error al guardar la sesión QR en Firestore:', e);
      throw e;
    }
  }

  // Método para guardar los datos del escaneo QR
  async guardarDatosEscaneo(uid: string, uidProfesor: string, asignatura: string, horaEscaneo: string): Promise<void> {
    try {
      // Guardamos los datos del escaneo QR en la colección "escaneosQR"
      const docRef = await addDoc(collection(this.db, 'escaneosQR'), {
        uidUsuario: uid,          // UID del usuario que escaneó el QR
        uidProfesor: uidProfesor, // UID del profesor relacionado con la asignatura
        asignatura: asignatura,   // La asignatura asociada al QR
        horaEscaneo: horaEscaneo, // Hora del escaneo
        timestamp: Timestamp.now() // Fecha y hora exacta en Firestore
      });
      console.log('Datos de escaneo guardados con ID:', docRef.id);
    } catch (e) {
      console.error('Error al guardar los datos del escaneo en Firestore:', e);
      throw e;
    }
  }
}
