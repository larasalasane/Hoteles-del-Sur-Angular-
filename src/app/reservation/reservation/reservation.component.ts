import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../../models/reservation.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservation: Reservation | undefined;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router
  ) { }

  async ngOnInit() {
    let reservationId: string = this.route.snapshot.params['id'];
    this.reservation = await this.reservationService.getReservation(reservationId);
  }

  goToReservations() {
    this.router.navigate(['/reservations']);
  }
}
