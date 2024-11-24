import {Component, OnInit} from '@angular/core';
import {RoomDataService} from '../room-data.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit {

  rooms: any[] = [];

  filterText: string = '';

  filteredRooms: any[] = [];

  constructor(
    private roomService: RoomDataService,
    public dialog: MatDialog,
    public router: Router) {
  }

  async ngOnInit(): Promise<void> {
    await this.getRooms();
    this.filteredRooms = this.rooms;
  }

  async openConfirmDialog(roomId: string): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      height: '200px',
      data: {roomId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelRoom(roomId);
      }
    });

  }

  applyPriceFilter(filter: string): void {
    this.filterText = filter;

    switch (filter) {
      case 'bracketA':
        this.filteredRooms = this.rooms.filter(room => room.details.pricePerNight <= 50000);
        break;
      case 'bracketB':
        this.filteredRooms = this.rooms.filter(room => room.details.pricePerNight > 50000 && room.details.pricePerNight <= 75000);
        break;
      case 'bracketC':
        this.filteredRooms = this.rooms.filter(room => room.details.pricePerNight > 75000);
        break;
      default:
        this.filteredRooms = [...this.rooms];
    }
  }

  /*

  applyFilter(): void {
    console.log('Texto de filtro:', this.filterText);
    console.log('Habitaciones filtradas:', this.filteredRooms);

    const lowerCaseFilter = this.filterText.trim().toLowerCase();
    this.filteredRooms = this.rooms.filter(room =>
      room.details.pricePerNight.toString().includes(lowerCaseFilter)
    );
  }
    */

  async cancelRoom(roomId: string): Promise<void> {
    await this.roomService.deleteRoom(roomId);
    await this.getRooms()
  }

  // async getRooms(): Promise<void> {
  //   const rooms = this.roomService.getRooms().subscribe(rooms => rooms ? this.rooms = rooms : []);
  // }

  async getRooms(): Promise<void> {
    this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms ? rooms : [];
      this.filteredRooms = [...this.rooms]; // Sincroniza filteredRooms
    });
  }

  goToEditRooms(roomId: string): void {
    this.router.navigate([`/rooms/edit/${roomId}`]);
  }

}
