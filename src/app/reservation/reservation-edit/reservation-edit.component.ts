import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../../models/reservation.model';
import { ReservationDataService } from '../reservation-data.service';
import { CustomValidators } from '../../core/validators/custom-validators';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {
  editForm: FormGroup;
  reservationId: string | null = null;
  reservation: Reservation | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private reservationDataService: ReservationDataService,
    public dialog: MatDialog
  ) {
    this.editForm = this.fb.group({
      id: new FormControl({ value: '', disabled: true }),
      checkInDate: ['', [Validators.required, CustomValidators.checkInValidator()]],
      checkOutDate: ['', [Validators.required, CustomValidators.checkOutValidator()]],
      guests: new FormControl({ value: '', disabled: true }),
      roomId: new FormControl({ value: '', disabled: true }),
      userId: new FormControl({ value: '', disabled: true })
    });
  }

  async ngOnInit(): Promise<void> {
    this.reservationId = this.route.snapshot.paramMap.get('id');
    if (this.reservationId) {
      try {
        const reservation = await this.reservationService.getReservation(this.reservationId);
        if (reservation) {
          this.reservation = reservation;
          this.populateForm(reservation); // Populate the form dynamically
        } else {
          console.error('Reserva no encontrada.');
        }
      } catch (error) {
        console.error('Error al cargar la reserva:', error);
      }
    }
  }

  private populateForm(reservation: Reservation): void {
    const formatDate = (date: Date | string | undefined): string => {
      if (!date) {
        return '';
      }
      const parsedDate = typeof date === 'string' ? new Date(date) : date;
      return parsedDate.toISOString().split('T')[0];
    };

    this.editForm.patchValue({
      id: reservation.id,
      checkInDate: formatDate(reservation.checkInDate),
      checkOutDate: formatDate(reservation.checkOutDate),
      guests: reservation.guests,
      roomId: reservation.roomId,
      userId: reservation.userId
    });
  }


  onSubmit(): void {
    if (this.editForm.valid && this.reservationId) {
      const updatedReservation = {
        ...this.editForm.getRawValue(),
        id: this.reservationId
      };
      this.reservationDataService.updateReservation(updatedReservation).subscribe(
        () => this.router.navigate(['reservations/list']),
        (error) => this.openErrorDialog(error.message)
      );
    }
  }

  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      height: '200px',
      data: errorMessage
    });
  }
}
