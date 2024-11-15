import {Injectable} from '@angular/core';
import {UserDataService} from './user-data.service';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userDataService: UserDataService, private router: Router) {
  }

  performLogin(loginForm : {email:string , password : string}) {
    this.userDataService.getUserByEmail(loginForm.email).subscribe(
      user => {
        if (user && user[0].password === loginForm.password) {
          user[0].password = '';
          this.router.navigateByUrl('home').then(() => {
            sessionStorage.setItem('user', JSON.stringify(user[0]));
          });
        } else {
          console.error("Incorrect email or password.");
        }
      },
      error => {
        console.error("User not found or other error:", error);
      }
    );
  }

  register(user: User): void {
    let email: string = '';
    if (user.email) {
      email = user.email;
    } else {
      console.error('Error interno');
    }
    this.userDataService.getUserByEmail(email).subscribe(
      Users => {
        if (Users.length != 0) {
          throw console.error('Email ya existente');
        } else {
          this.userDataService.createUser(user).subscribe();
        }
      }
    )
  }

  userIsLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null;
  }

  performLogout() {
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('home');
  }

  getUserId(): string | undefined {
    let currentUser: User = JSON.parse(<string>sessionStorage.getItem('user'));
    return currentUser.id;
  }

  getUserData(): User | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
