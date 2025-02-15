import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../core/user.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const user = this.userService.getUserData();
    if (user && user.role === 1) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
