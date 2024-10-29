import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email : string = '';
  password : string = '';

  constructor(private userService: UserService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.email = form.value.email;
      this.password = form.value.password;
      this.userService.performLogin(this.email, this.password);
    }
  }
}
