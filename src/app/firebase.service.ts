import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // Importamos getAuth para obtener el UID del usuario
import { environment } from 'src/environments/environment'; // Asegúrate de que está configurado en tu environment

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  private db = getFirestore(initializeApp(environment.firebaseConfig));  // Inicializamos Firestore
  private auth = getAuth();  // Inicializamos Firebase Auth

  constructor() {}

  // Método para guardar un nuevo usuario en la colección 'usuarios'
  async guardarUsuario(nombre: string, correo: string, rol: string): Promise<string> {
    try {
      // Obtenemos el UID del usuario actual desde Firebase Auth
      const userId = this.auth.currentUser?.uid;

      if (!userId) {
        throw new Error('No se encontró un usuario autenticado');
      }

      // Creamos una referencia al documento en la colección 'usuarios' usando el UID del usuario
      const docRef = doc(this.db, 'usuarios', userId);  // Usamos el UID como ID del documento

      // Guardamos la información del usuario en Firestore
      await setDoc(docRef, {
        nombre: nombre,
        correo: correo,
        rol: rol,
        createdAt: new Date(),  // Almacenamos la fecha de creación
      });

      console.log("Usuario guardado con ID:", userId);
      return userId;  // Devolvemos el UID del usuario como el ID del documento guardado
    } catch (e) {
      console.error("Error al guardar el usuario: ", e);
      throw e;  // Si ocurre un error, lo lanzamos
    }
  }
}
