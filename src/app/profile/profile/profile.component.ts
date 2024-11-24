import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor(private userService: UserService, private location: Location) {}

  ngOnInit(): void {
    if (!this.userService.userIsLoggedIn()) {
      console.log("Usuario no logueado.");
    } else {
      this.userData = this.userService.getUserData();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
