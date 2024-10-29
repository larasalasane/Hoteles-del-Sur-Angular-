import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registerData = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: ''
  };
  registerSuccess = false;
  registerError = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.registerData).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        this.registerSuccess = true;
        this.registerError = false;
      },
      (error) => {
        console.error('Error en el registro:', error);
        this.registerSuccess = false;
        this.registerError = true;
      }
    );
  }
}
