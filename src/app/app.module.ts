import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importación de Firebase desde la API modular (Firebase v9+)
import { initializeApp } from 'firebase/app';  // Para inicializar Firebase
import { getFirestore } from 'firebase/firestore';  // Para Firestore
import { getAuth } from 'firebase/auth';  // Para autenticación

import { environment } from '../environments/environment';  // Tu archivo de configuración de Firebase

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // Inicialización de Firebase con la configuración
    // Aquí inicializas Firebase con tu configuración del archivo environment.ts
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Inicializa Firebase en la aplicación
    initializeApp(environment.firebaseConfig);  // Usamos el método de inicialización
  }
}
