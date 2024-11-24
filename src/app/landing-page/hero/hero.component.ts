import {Component} from '@angular/core';
import {EventBusService} from '../../core/event-bus.service';
import {Router} from '@angular/router';
import {UserService} from '../../core/user.service';
import {Role} from '../../models/user.model';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  constructor(private eventBus: EventBusService, private userService: UserService, private router: Router) {
  }

  toggleReservationForm() {
    if (this.userService.userIsLoggedIn()) {
      this.eventBus.emitToggleForm()
    } else {
      this.router.navigateByUrl('login');
    }
  }

  currentUrlIsHome(): boolean {
    return this.router.url == '/home';
  }

  userIsAdmin() {
    return this.userService.getUserData()?.role == Role.ADMIN_ROLE
  }
}
