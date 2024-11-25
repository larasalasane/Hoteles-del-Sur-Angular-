import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../core/user.service';
import {CustomValidators} from '../../core/validators/custom-validators';
import { Router } from '@angular/router';
import { SuccessfullyDialogComponent } from '../../shared/successfully-dialog/successfully-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  showSuccessPopup = false;
  registerError = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email], CustomValidators.emailAlreadyExists(userService)],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      try {
        this.userService.register(this.registerForm.value); // Aquí se envía el registro al servicio
         // Abre el pop-up al registrar exitosamente
         this.dialog.open(SuccessfullyDialogComponent).afterClosed().subscribe(() => {
          this.router.navigate(['login']); // Navega después de cerrar el pop-up
        });
        this.showSuccessPopup = true; // Muestra el modal
      } catch (error) {
        this.registerError = true;
      }
    }
  }
  closePopup() {
    this.showSuccessPopup = false; // Cierra el modal
    this.router.navigate(['login']); // Navega al login
  }
}
