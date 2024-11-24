import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../core/validators/custom-validators';
import {Router} from '@angular/router';
import {RoomService} from '../room.service';


@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrls: ['./add-rooms.component.css']
})
export class AddRoomsComponent {

  roomForm: FormGroup;
  successMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private roomService: RoomService,
  ) {
    this.roomForm = this.fb.group({
      id: ['', Validators.required, CustomValidators.roomExists(this.roomService)],
      type: ['', Validators.required],
      details: this.fb.group({
        capacity: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
        pricePerNight: ['', [Validators.required, Validators.min(0)]],
        available: [true],
        imageUrl: ['', [Validators.required, CustomValidators.imageUrlValidator()]]
      })
    });
  }

  async onSubmit(): Promise<void> {
    if (this.roomForm.valid) {
      this.roomService.createRoom(this.roomForm.value).subscribe(
        (createdRoom) => {
          if (createdRoom) {
            this.successMessage = true;
            setTimeout(() => this.successMessage = false, 3000);
            this.router.navigateByUrl(`/rooms/${createdRoom.id}`);
          } else {
            throw new Error("Error desconocido al crear habitacion")
          }
        }, (error) => console.error('Error al añadir la habitación:', error));
    } else {
      console.log('El formulario es inválido');
    }
  }
}

