import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomDataService} from '../../services/room-data.service';
import {CustomValidators} from '../../validators/custom-validators';


@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrls: ['./add-rooms.component.css']
})
export class AddRoomsComponent {

  roomForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roomDataService: RoomDataService
  ) {
    this.roomForm = this.fb.group({
      roomNumber: ['', Validators.required, CustomValidators.roomExists(this.roomDataService)],
      type: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1),Validators.max(4)]],
      pricePerNight: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required, CustomValidators.imageUrlValidator()]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.roomForm.valid) {
      this.roomDataService.createRoom(this.roomForm.value).subscribe(
        (error) => console.error('Error al añadir la habitación:', error)
      );
    } else {
      console.log('El formulario es inválido');
    }
  }
}

