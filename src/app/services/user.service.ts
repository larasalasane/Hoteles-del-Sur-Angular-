import {Injectable} from '@angular/core';
import {UserDataService} from './user-data.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private userDataService: UserDataService) {
  }

  performLogin(email: string, password: string) {
    this.userDataService.getUserByEmail(email).subscribe(user => {
        if (user && user.password === password) {

        }
      }
    );
  }
}
