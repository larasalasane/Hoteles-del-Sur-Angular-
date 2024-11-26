import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation.model';
import { Room } from '../../models/room.model';
import { ReservationService } from '../../reservation/reservation.service';

import { forkJoin } from 'rxjs';
import { UserService } from '../../core/user.service';
import { User } from '../../models/user.model';
import { RoomService } from '../../room/room.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  reservations: Reservation[] = [];
  rooms: Room[] = [];
  users: User[] = [];
  today1: Date = new Date;
  today: Date = new Date;
  todayCheckIn: Date = new Date;
  oneWeekFromNow: Date = new Date;
  occupancyPercentage: number = 0;
  PERCENTAGE_BASE = 100;

  constructor(
    private reservationService: ReservationService,
    private roomService: RoomService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.today.setHours(0, 0, 0, 0);
    this.today1.setHours(0, 0, 0, 0);
    this.todayCheckIn.setHours(0, 0, 0, 0);
    this.today1.setDate(this.today1.getDate() + 1);
    this.todayCheckIn.setDate(this.todayCheckIn.getDate() - 1);
    this.oneWeekFromNow.setDate(this.today1.getDate() + 7);

    this.loadDashboardData();

  }

  loadDashboardData(): void {
    forkJoin({
      reservations: this.reservationService.getReservations(),
      rooms: this.roomService.getListRooms(),
      users: this.userService.getListUsers()
    }).subscribe(({ reservations, rooms, users }) => {
      this.reservations = reservations;
      this.rooms = rooms;
      this.users = users;
      this.calculateOccupancy();
    });
  }

  calculateOccupancy(): void {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const totalRooms = this.rooms.length;
    this.reservationService.calculateOccupation(today, today).subscribe(occupiedRooms => {
      this.occupancyPercentage = Math.round((occupiedRooms / totalRooms) * this.PERCENTAGE_BASE);
    });
  }

  getReservationsForWeek(): (Reservation & { userName?: string, userLastName?: string })[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);
    return this.reservations.filter(reservation => {
      const checkInDate = new Date(reservation.checkInDate);
      return checkInDate >= today && checkInDate <= oneWeekFromNow;
    }).map(reservation => {
      const user = this.users.find(user => user.id === reservation.userId);
      return {
        ...reservation, userName: user?.firstName, userLastName: user?.lastName
      };
    });
  }

  getCheckInsToday(): (Reservation & { userName?: string, userLastName?: string })[] {
    return this.reservations.filter(reservation => {
      const checkInDate = new Date(reservation.checkInDate);
      return checkInDate.toDateString() === this.todayCheckIn.toDateString();
    }).map(reservation => {
      const user = this.users.find(user => user.id === reservation.userId);
      return { ...reservation, userName: user?.firstName, userLastName: user?.lastName };
    });
  }
}
