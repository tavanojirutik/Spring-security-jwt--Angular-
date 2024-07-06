import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtRegisterService } from './service/jwt/jwt.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jwt-angular';

  constructor(private jwtRegisterService: JwtRegisterService, private router: Router) {}

  // Call logout method and navigate to login
  logout(): void {
    this.jwtRegisterService.logout();
    this.router.navigate(['/login']);
  }
}
