import {Component, OnInit} from '@angular/core';
import {ReservationService} from '../reservation.service';
import {Router} from '@angular/router';
import {Reservation} from '../../models/reservation.model';
import {CustomValidators} from '../../core/validators/custom-validators';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  errorMessage: string | null = null;

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  async onEdit(reservationId: string | undefined): Promise<void> {
    await this.router.navigate([`/reservations/edit/${reservationId}`]);
  }

  async ngOnInit(): Promise<void> {
    await this.loadReservations();
  }

  async loadReservations(): Promise<void> {
    this.reservationService.getReservations().subscribe(
      reservations => this.reservations = reservations,
    )
  }

  async cancelReservation(reservation: any): Promise<void> {
    try {
      await this.reservationService.deleteReservation(reservation.id);
      this.reservations = this.reservations.filter(r => r.id !== reservation.id);
    } catch (error) {
      this.errorMessage = 'Error al cancelar la reserva.';
      console.error(error);
    }
  }

  dateIsInvalid(reservation: Reservation): boolean {
    return !CustomValidators.dateIsBeforeToday(reservation.checkInDate);
  }

  async openConfirmDialog(reservation: Reservation): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      height: '200px',
      data: { reservation }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelReservation(reservation);
      }
    });
  }
}
