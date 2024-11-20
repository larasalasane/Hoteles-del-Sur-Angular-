import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation.model';
import { Room } from '../../models/room.model';
import { ReservationService } from '../../services/reservation.service';
import { RoomService } from '../../services/room.service';
import { forkJoin } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

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
  oneWeekFromNow: Date = new Date;
  occupancyPercentage: number = 0;

  constructor(
    private reservationService: ReservationService,
    private roomService: RoomService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.today.setHours(0, 0, 0, 0);
    this.today1.setHours(0, 0, 0, 0);
    this.today1.setDate(this.today1.getDate()+1);
    this.loadDashboardData();
    this.oneWeekFromNow.setDate(this.today1.getDate() + 7);
  }

  loadDashboardData(): void {
    forkJoin({
      reservations: this.reservationService.getListReservations(),
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
      console.log('Occupied Rooms:', occupiedRooms); this.occupancyPercentage = (occupiedRooms / totalRooms) * 100;
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
}