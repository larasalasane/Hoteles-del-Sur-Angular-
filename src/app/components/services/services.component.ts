import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services = [
    { title: 'Habitaciones confortables', description: 'Disfruta de nuestras habitaciones con todas las comodidades.' },
    { title: 'Restaurante Gourmet', description: 'Gastronomía de alta calidad para todos nuestros huéspedes.' },
    { title: 'Spa & Wellness', description: 'Relájate y rejuvenece con nuestros servicios de spa.' },
  ];

  constructor() {}
}