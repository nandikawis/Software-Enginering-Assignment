import { Component } from '@angular/core';
import { Router } from 'express';
import { jwtDecode } from 'jwt-decode';
import { MerchantService } from '../services/merchant.service';

@Component({
  selector: 'app-merchant-account',
  templateUrl: './merchant-account.component.html',
  styleUrls: ['./merchant-account.component.css']
})
export class MerchantAccountComponent {
  public email: string = 'example@email.com';
  public password: string = 'Password123';
  public showPassword: boolean = false;
  merchant: any;
  constructor(private router: Router, private merchantService: MerchantService) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  getLoggedInMerchant() {
    const token = sessionStorage.getItem('token');
    try {
      if (token) {
        const decodedToken = jwtDecode(token); // Assuming jwtDecode is a valid method to decode JWT
        if (decodedToken && decodedToken) {
          return decodedToken.toString(); // Converts ID to string and returns it
        }
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return null;
  }
  ngOnInit(): void {
    const loggedInMerchant = this.getLoggedInMerchant();
    if (loggedInMerchant) {
      this.merchantService.getMerchantById(loggedInMerchant).subscribe({
        next: (data: any) => {
          this.merchant = data;
        },
        error: (error: any) => {
          console.error('Error fetching merchant:', error);
        },
        complete: () => {
          // Optional: Any cleanup or final actions when the Observable completes
        }
      });
    } else {
      console.error('No logged-in merchant found');
      // Handle the scenario when no merchant is logged in
    }
  }
}
