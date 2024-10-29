import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {EventBusService} from '../../services/event-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  loggedInUser: User | undefined = undefined;

  constructor(private eventBus:EventBusService) {}

  ngOnInit() {
    this.eventBus.loginEvent$.subscribe(user => {
      this.loggedInUser = user;
      this.isLoggedIn = true;
    })
  }
}
