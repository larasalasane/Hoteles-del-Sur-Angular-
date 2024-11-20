import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation.model';
import { Room } from '../../models/room.model';
import { ReservationService } from '../../services/reservation.service';
import { RoomService } from '../../services/room.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  reservations: Reservation[] = [];
  rooms: Room[] = [];
  occupancyPercentage: number = 0;

  constructor(
    private reservationService: ReservationService,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    forkJoin({
      reservations: this.reservationService.getListReservations(),
      rooms: this.roomService.getListRooms()
    }).subscribe(({ reservations, rooms }) => {
      this.reservations = reservations;
      this.rooms = rooms;
      this.calculateOccupancy();
    });
  }

  calculateOccupancy(): void {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const totalRooms = this.rooms.length;
    this.reservationService.calculateOccupation(today, today).subscribe(occupiedRooms => {
      console.log('Occupied Rooms:', occupiedRooms); this.occupancyPercentage = (occupiedRooms / totalRooms) * 100;
    });
  }

  getReservationsForWeek(): Reservation[] {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const oneWeekFromNow = new Date(); oneWeekFromNow.setDate(today.getDate() + 7);
    return this.reservations.filter(reservation => {
      const checkInDate = new Date(reservation.checkInDate);
      return checkInDate >= today && checkInDate <= oneWeekFromNow;
    });
  }
}


