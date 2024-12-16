import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';  // Importamos el AlertController para mostrar alertas
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning'; // Importamos el BarcodeScanner
import { QrService } from '../servicios/qr.service';

@Component({
  selector: 'app-vista-camara',
  templateUrl: './vista-camara.page.html',
  styleUrls: ['./vista-camara.page.scss'],
})
export class VistaCamaraPage implements OnInit {
  qrCodeContent: string | null = null; // Almacena el resultado del código QR (por ahora no se usará)


  constructor(
    private navController: NavController,
    public qr : QrService,
    private alertController: AlertController // Para mostrar alertas
       
  ) {}


  ngOnInit() {
    // Inicialización si es necesario
  }

  // Método para navegar hacia atrás
  volverAtras() {
    this.navController.back();
  }

  Scaneo(){
    this.qr.StartScan()
  }

  
    
  
}
