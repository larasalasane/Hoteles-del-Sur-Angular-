import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  showReservationForm = false;

  toggleReservationForm() {
    this.showReservationForm = !this.showReservationForm;
  }
}