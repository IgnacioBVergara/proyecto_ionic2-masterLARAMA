import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';  // Firebase Auth
import { FirebaseService } from '../firebase.service'; // Servicio para guardar datos en Firestore

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = getAuth();  // Inicializamos Firebase Auth

  constructor(private firebaseService: FirebaseService) {}

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
}
