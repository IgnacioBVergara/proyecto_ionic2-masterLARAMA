import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importa el servicio que inicializa Firebase
import { FirebaseService } from './firebase.service';  // Asegúrate de importar el servicio

// Importa el módulo para formularios (para ngModel)
import { FormsModule } from '@angular/forms';  // <-- Añadido para manejar ngModel

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule  // <-- Añadido para formularios
  ],
  providers: [
    FirebaseService,  // Agrega el servicio a los proveedores
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
