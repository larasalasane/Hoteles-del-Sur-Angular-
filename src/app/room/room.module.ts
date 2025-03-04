import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRoomsComponent } from './add-rooms/add-rooms.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { RoomListComponent } from './room-list/room-list.component';
import { ViewRoomComponent } from './view-room/view-room.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SingleComponent } from './single/single.component';
import { DoubleComponent } from './double/double.component';
import { SuiteComponent } from './suite/suite.component';



@NgModule({
  declarations: [
    AddRoomsComponent,
    EditRoomComponent,
    RoomListComponent,
    ViewRoomComponent,
    SingleComponent,
    DoubleComponent,
    SuiteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ], exports: [
    AddRoomsComponent,
    EditRoomComponent,
    RoomListComponent,
    ViewRoomComponent,
  ]
})
export class RoomModule { }
