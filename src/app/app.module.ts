import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importación de Firebase
import { initializeApp } from 'firebase/app';  
import { getAuth } from 'firebase/auth';       
import { getFirestore } from 'firebase/firestore'; 

// Importación de la configuración de Firebase desde environment.ts
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Inicializa Firebase con la configuración desde environment.ts
    const app = initializeApp(environment.firebaseConfig);  // Usa la configuración de Firebase del archivo environment.ts

    // Inicializa los servicios de Firebase
    const auth = getAuth(app);  // Servicio de autenticación
    const firestore = getFirestore(app); // Servicio de Firestore
  }
}
