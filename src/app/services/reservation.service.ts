import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import {ReservationDataService} from './reservation-data.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private reservationDataService: ReservationDataService,
    private userService: UserService
  ) {}

  async createReservation(reservation: Reservation): Promise<string | undefined> {
    let userId : string | undefined = this.userService.getUserId();
    if (userId) {
      reservation.userId = userId;
      let createdReservation : Reservation | undefined = await this.reservationDataService.createReservation(reservation);
      if (createdReservation) {
        console.log(createdReservation);
        return createdReservation.id;
      } else {
        throw new Error("Error creating reservation");
      }
    } else {
      throw new Error("Error creating reservation");
    }
  }

  async getReservation(reservationId: string): Promise<Reservation | undefined> {
    return await this.reservationDataService.getReservationById(reservationId);
  }

  async getUserReservations(): Promise<Reservation[] | undefined> {
    let userId : string | undefined = this.userService.getUserId();
    let reservations : Reservation[] = [];
    if(userId){
      const foundReservations = await this.reservationDataService.getUserReservations(userId);
      if (foundReservations) {
        foundReservations.forEach(reservation => this.setLocalDate(reservation))
        reservations = foundReservations;
      }
    }
    return reservations;
  }

  async getReservations(): Promise<Reservation[] | undefined> {
    const foundReservations = await this.reservationDataService.getReservations();
    if (foundReservations) foundReservations.forEach(reservation => this.setLocalDate(reservation));
    return foundReservations;
  }

  async deleteReservation(id: string): Promise<void> {
    await this.reservationDataService.deleteReservation(id);
  }

  setLocalDate(reservation: Reservation): Reservation {
    reservation.checkInDate = new Date(reservation.checkInDate);
    reservation.checkOutDate = new Date(reservation.checkOutDate);
    return reservation;
  }
}
