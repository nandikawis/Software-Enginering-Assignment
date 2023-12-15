import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MerchantService } from '../services/merchant.service';
@Component({
  selector: 'app-manage-merchant',
  templateUrl: './manage-merchant.component.html',
  styleUrls: ['./manage-merchant.component.css']
})
export class ManageMerchantComponent {
  merchant: any;
  constructor(private router: Router, private merchantService: MerchantService) { }
  logout() {
    sessionStorage.removeItem('token'); // Remove the token
    this.router.navigate(['/Merchants']); // Navigate to the login page
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
