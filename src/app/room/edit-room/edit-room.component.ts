import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomDataService } from '../room-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '../../core/validators/custom-validators';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.css'
})
export class EditRoomComponent implements OnInit{

  roomForm: FormGroup;
  successMessage: boolean = false;
  roomId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private roomDataService: RoomDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.roomForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      type: ['', Validators.required],
      details: this.fb.group({
        capacity: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
        pricePerNight: ['', [Validators.required, Validators.min(0)]],
        available: [true],
        imageUrl: ['', [Validators.required, CustomValidators.imageUrlValidator()]]
      })
    });
  }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id');
    if (this.roomId) {
      this.roomDataService.getRoomById(this.roomId).subscribe(
        (rooms) => {
          const room = rooms[0];
          this.roomForm.patchValue(room);
        },
        (error) => console.error('Error al cargar la habitación:', error)
      );
    }
  }

  onSubmit(): void {
    if (this.roomForm.valid && this.roomId) {
      const roomData = { ...this.roomForm.value, id: this.roomId };
      this.roomDataService.updateRoom(roomData).subscribe(
        () => this.router.navigate(['/rooms/list']),
        (error) => console.error('Error al actualizar la habitación:', error)
      );
    }
  }

}
