import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @Output() toggleForm = new EventEmitter<void>();

  toggleReservationForm() {
    this.toggleForm.emit();
  }
}
