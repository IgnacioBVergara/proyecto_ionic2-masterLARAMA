import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';  // Firebase Auth
import { Router } from '@angular/router'; // Importamos Router para redirigir
import { FirebaseService } from '../firebase.service'; // Servicio para guardar datos en Firestore
import { BehaviorSubject } from 'rxjs';  // Usamos BehaviorSubject para emitir cambios en el estado de autenticación
import { getFirestore, doc, getDoc } from 'firebase/firestore';  // Importamos Firestore para consultar la base de datos

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = getAuth();  // Inicializamos Firebase Auth
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);  // Para emitir el estado del usuario autenticado
  private nombreUsuarioSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null); // Para almacenar el nombre del usuario

  constructor(
    private firebaseService: FirebaseService,
    private router: Router  // Inyectamos Router
  ) {
    // Revisar el estado de autenticación cuando se inicializa el servicio
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // Si hay un usuario autenticado, emitimos su información
        this.userSubject.next(user);
        // También buscamos el nombre del usuario en Firestore cuando el usuario se autentica
        this.obtenerNombreUsuario(user.uid);
      } else {
        // Si no hay usuario autenticado, emitimos null
        this.userSubject.next(null);
        this.nombreUsuarioSubject.next(null); // Limpiar el nombre si no hay usuario
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

      const user = userCredential.user;
      const email = user.email?.toLowerCase(); // Convertir el correo a minúsculas

      // Obtener el nombre del usuario desde Firestore
      await this.obtenerNombreUsuario(user.uid);

      // Redirigir a la vista según el dominio del correo
      if (email?.includes('@profesor.cl')) {
        // Si el correo tiene el dominio @profesor.cl, redirigir a "vista-profe"
        this.router.navigate(['/vista-profe']);
      } else if (email?.includes('@alumno.cl')) {
        // Si el correo tiene el dominio @alumno.cl, redirigir a "vista-alumno"
        this.router.navigate(['/vista-alumno']);
      } else {
        console.log('Correo no válido para redirección');
        // Aquí puedes hacer algo en caso de que el correo no sea de los dominios permitidos
      }

      return userCredential;  // Devuelve las credenciales del usuario
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;  // Propaga el error si ocurre
    }
  }

  // Método para obtener el nombre del usuario desde Firestore
 // Método para obtener el nombre del usuario desde Firestore
private async obtenerNombreUsuario(uid: string) {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'usuarios', uid);  // Referencia al documento del usuario usando el UID
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const nombreUsuario = userDocSnap.data()?.['nombre'];  // Acceso con la notación de corchetes
      console.log('Nombre del usuario:', nombreUsuario);

      // Emitir el nombre del usuario a través del BehaviorSubject
      this.nombreUsuarioSubject.next(nombreUsuario || 'Nombre no disponible');
    } else {
      console.log("No se encontró el documento del usuario en Firestore.");
      this.nombreUsuarioSubject.next('Nombre no disponible');
    }
  } catch (error) {
    console.error("Error al obtener el nombre del usuario desde Firestore:", error);
    this.nombreUsuarioSubject.next('Nombre no disponible');
  }
}


  // Método para obtener el estado del usuario actual
  getUser() {
    return this.userSubject.asObservable();  // Devuelve un observable con el estado actual del usuario
  }

  // Método para obtener el nombre del usuario actual
  getNombreUsuario() {
    return this.nombreUsuarioSubject.asObservable();  // Devuelve un observable con el nombre del usuario
  }

  // Método para obtener el UID del usuario actual
  getUid() {
    const user = this.userSubject.value;
    return user ? user.uid : null;  // Si hay un usuario autenticado, devolvemos su UID
  }

  // Método para cerrar sesión
  async cerrarSesion() {
    try {
      await signOut(this.auth);  // Cerramos la sesión
      console.log('Cierre de sesión exitoso');
      this.nombreUsuarioSubject.next(null);  // Limpiar el nombre al cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;  // Propaga el error si ocurre
    }
  }
}
