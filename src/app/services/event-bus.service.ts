import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  constructor() { }

  private toggleFormSource = new Subject<void>();
  toggleForm$ = this.toggleFormSource.asObservable();

  private loginEventSource = new Subject<User>();
  loginEvent$ = this.loginEventSource.asObservable()

  emitToggleForm() {
    this.toggleFormSource.next();
  }

  emmitLoginEvent(user: User) {
    this.loginEventSource.next(user);
  }
}
