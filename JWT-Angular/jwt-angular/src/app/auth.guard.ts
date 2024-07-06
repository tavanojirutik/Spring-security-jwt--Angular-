import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwt');
    
    if (token) {
      // Token exists, user is authenticated
      return true;
    } else {
      // No token, redirect to login
      this.router.navigate(['/login'], { queryParams: { redirected: true } });
      return false;
    }
  }
}
