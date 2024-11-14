import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vista-detalles',
  templateUrl: './vista-detalles.page.html',
  styleUrls: ['./vista-detalles.page.scss'],
})
export class VistaDetallesPage implements OnInit {

  public id: string | null = null; // Declaramos 'id' como nullable para manejar la posibilidad de que sea null

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Obtener el parámetro 'id' de la ruta
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', this.id); // Verifica si el ID se recibe correctamente

    // Opcional: Realiza alguna lógica adicional con 'id', como consultar una base de datos o mostrar información relacionada
  }
}
