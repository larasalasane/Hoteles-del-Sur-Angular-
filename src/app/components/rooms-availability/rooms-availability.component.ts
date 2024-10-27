import { Component, OnInit } from '@angular/core';
import { RoomAvailabilityService } from '../../services/room-availability.service';


@Component({
  selector: 'app-rooms-availability',
  templateUrl: './rooms-availability.component.html',
  styleUrls: ['./rooms-availability.component.css']
})
export class RoomsAvailabilityComponent implements OnInit {
  rooms: any[] = [];

  constructor(private roomAvailabilityService: RoomAvailabilityService) { } 

  ngOnInit(): void {
    this.roomAvailabilityService.getRoomAvailability().subscribe(data => {
      this.rooms = data;
    });
  }
}
