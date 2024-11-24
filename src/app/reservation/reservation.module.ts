import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MyReservationsComponent,
    ReservationComponent,
    ReservationEditComponent,
    ReservationFormComponent,
    ReservationListComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  exports: [ ReservationFormComponent, ReservationListComponent, ReservationEditComponent, ReservationFormComponent]
})
export class ReservationModule { }
