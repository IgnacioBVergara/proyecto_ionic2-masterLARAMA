import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';  // Firebase Auth
import { Firestore, doc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { FirebaseService } from '../firebase.service'; // Servicio para guardar datos en Firestore
import { BehaviorSubject } from 'rxjs';  // Usamos BehaviorSubject para emitir cambios en el estado de autenticación

// Define una interfaz para los datos del usuario en Firestore
export interface Usuario {
  nombre: string;
  correo: string;
  createdAt: any;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = getAuth();  // Inicializamos Firebase Auth
  private firestore: Firestore = getFirestore();  // Inicializamos Firestore
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);  // Para emitir el estado del usuario autenticado

  constructor(private firebaseService: FirebaseService) {
    // Revisar el estado de autenticación cuando se inicializa el servicio
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // Si hay un usuario autenticado, emitimos su información
        this.userSubject.next(user);
      } else {
        // Si no hay usuario autenticado, emitimos null
        this.userSubject.next(null);
      }
    });
  }

  // Método para registrar un nuevo usuario
  async registrarUsuario(nombre: string, correo: string, contrasena: string, rol: string) {
    try {
      // Usamos createUserWithEmailAndPassword para registrar al usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(this.auth, correo, contrasena);
      const user = userCredential.user;  // Obtén el usuario registrado

      // Una vez registrado el usuario, guardamos su información en Firestore
      // Pasamos el uid del usuario a la función guardarUsuario
      const userId = await this.firebaseService.guardarUsuario(user.uid, nombre, correo, rol);
      console.log("Usuario registrado y guardado en Firestore con ID:", userId);

      return userCredential;  // Devuelve las credenciales del nuevo usuario
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;  // Propaga el error si ocurre
    }
  }

  // Método para iniciar sesión con correo y contraseña
  async iniciarSesion(correo: string, contrasena: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, correo, contrasena);
      console.log('Inicio de sesión exitoso:', userCredential);
      return userCredential;  // Devuelve las credenciales del usuario
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;  // Propaga el error si ocurre
    }
  }

  // Método para obtener el estado del usuario actual
  getUser() {
    return this.userSubject.asObservable();  // Devuelve un observable con el estado actual del usuario
  }

  // Método para obtener el UID del usuario actual
  getUid() {
    const user = this.userSubject.value;
    return user ? user.uid : null;  // Si hay un usuario autenticado, devolvemos su UID
  }

  // Método para obtener los datos del usuario logueado (nombre, correo, rol)
  async obtenerDatosUsuario(): Promise<Usuario> {
    const user = this.userSubject.value;
    if (user) {
      try {
        const userRef = doc(this.firestore, 'usuarios', user.uid);  // Referencia al documento del usuario en Firestore
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          console.log('Datos del usuario obtenidos:', docSnap.data());  // Verifica los datos
          return docSnap.data() as Usuario;  // Retorna los datos del usuario (nombre, correo, rol, etc.) tipados correctamente
        } else {
          throw new Error('Usuario no encontrado en Firestore');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        throw new Error('Error al obtener los datos del usuario');
      }
    } else {
      throw new Error('No hay usuario logueado');
    }
  }

  // Método para cerrar sesión
  async cerrarSesion() {
    try {
      await signOut(this.auth);  // Cerramos la sesión
      console.log('Cierre de sesión exitoso');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;  // Propaga el error si ocurre
    }
  }
}
