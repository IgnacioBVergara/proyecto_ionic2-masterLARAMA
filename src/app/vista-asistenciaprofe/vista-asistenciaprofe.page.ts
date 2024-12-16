import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';  // Asegúrate de importar esto

@Component({
  selector: 'app-vista-asistenciaprofe',
  templateUrl: './vista-asistenciaprofe.page.html',
  styleUrls: ['./vista-asistenciaprofe.page.scss'],
})
export class VistaAsistenciaprofePage implements OnInit {

  constructor(private navController: NavController) {  // Asegúrate de inyectar NavController aquí
  }

  ngOnInit() {
  }

  // Este método usa navController
  volverAtras() {
    this.navController.back();  // Esto debería funcionar sin errores ahora
  }
}
