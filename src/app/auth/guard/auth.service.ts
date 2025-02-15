import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  login(user: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === user.email && u.password === user.password);
  
    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      this.router.navigate(['home']);
    } else {
      alert('Credenciales inválidas');
    }
  }
  

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
