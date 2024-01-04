import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-officer-page',
  templateUrl: './officer-page.component.html',
  styleUrls: ['./officer-page.component.css']
})
export class OfficerPageComponent {

  menuVisible: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {


    this.checkTokenExpiration();
    setInterval(() => this.checkTokenExpiration(), 60000); // Check every minute
  }


  toggleSidebar() {
    this.menuVisible = !this.menuVisible;
  }

  checkTokenExpiration() {
    const token = sessionStorage.getItem('token');
    if (token && this.isTokenExpired(token)) {
      this.logoutTheOfficer();
    }
  }

  isTokenExpired(token: string): boolean {
    // Decode the token to get its expiration time
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) return true;

    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp < currentTime;
  }

  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      return null;
    }
  }

  logoutTheOfficer() {

    this.authService.logoutOfficer();
    this.router.navigate(['/landing-page']);
  }


}
