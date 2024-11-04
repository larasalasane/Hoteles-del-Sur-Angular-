import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services = [
    { id: 'rnfyo3k', title: 'Habitaciones confortables', description: 'Disfruta de nuestras habitaciones con todas las comodidades.' }
  ];
  //esto tendria que venir de la base de datos
  // por cada servicio va a crear un componente con toda la informacion

  constructor() {}
}