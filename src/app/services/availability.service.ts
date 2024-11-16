import {Injectable} from "@angular/core";
import {RoomDataService} from "./room-data.service";
import {Room} from "../models/room.model";
import {Reservation} from '../models/reservation.model';
import {ReservationService} from './reservation.service';

@Injectable({
  providedIn: 'root'
})

export class AvailabilityService {

  constructor(private roomDataService: RoomDataService, private reservationService: ReservationService) {
  }

  async getAvailableRooms(reservationForm: any): Promise<Room[]> {

    let today: Date = new Date();
    today.setHours(0, 0, 0, 0);

    reservationForm = this.setLocalDates(reservationForm);

    console.log(reservationForm.checkInDate);
    console.log(reservationForm.checkOutDate);

    if ((reservationForm.checkInDate < today) || reservationForm.checkOutDate < reservationForm.checkInDate) {
      throw new Error("Las fechas de checkIn / checkOutDate son invalidas");
    }


    const foundReservations = await this.reservationService.getReservations();

    let reservedRoomIds: string[] = [];

    if (foundReservations) foundReservations
      .filter(fr => {
        console.log(fr.checkInDate);
        console.log(fr.checkOutDate);
        return reservationForm.checkInDate <= fr.checkOutDate
      })
      .filter(fr => reservationForm.checkOutDate >= fr.checkInDate)
      .forEach(fr => {
        if (fr.roomId) reservedRoomIds.push(fr.roomId)
      });

    console.log("Reserved Rooms", reservedRoomIds);

    const foundRooms = await this.roomDataService.getRooms();

    return foundRooms ? foundRooms
      .filter(fr => fr.details.available)
      .filter(fr => fr.details.capacity >= reservationForm.guests)
      .map(fr => {
        if (reservedRoomIds.includes(fr.id)) {
          fr.details.available = false
        }
        return fr;
      }) : [];
  }

  setLocalDates(reservation: Reservation): Reservation {
    reservation.checkInDate = new Date(reservation.checkInDate + 'T00:00:00');
    reservation.checkOutDate = new Date(reservation.checkOutDate + 'T00:00:00');
    return reservation;
  }
}
