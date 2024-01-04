import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MerchantService } from '../services/merchant.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-manage-merchant',
  templateUrl: './manage-merchant.component.html',
  styleUrls: ['./manage-merchant.component.css'],

})
export class ManageMerchantComponent {
  menuVisible: boolean = false;
  merchant: any;
  constructor(private router: Router, private route: ActivatedRoute,
    private merchantService: MerchantService,
    private authService: AuthService) { }
  ngOnInit(): void {
    const merchantId = sessionStorage.getItem('merchantId');
    if (merchantId) {
      console.log('Retrieved merchant ID:', merchantId);
      this.merchantService.getMerchantByMerchantId(merchantId).subscribe({
        next: (data: any) => {
          this.merchant = data;
        },
        error: (error: any) => {
          console.error('Error fetching merchant:', error);
        }
      });
    } else {
      console.error('No email found in session storage');
      // Handle the case where email is null - perhaps redirect to login or show an error message
    }

    this.checkTokenExpiration();
    setInterval(() => this.checkTokenExpiration(), 60000); // Check every minute

  }

  toggleSidebar() {
    this.menuVisible = !this.menuVisible;
  }

  checkTokenExpiration() {
    const token = sessionStorage.getItem('token');
    if (token && this.isTokenExpired(token)) {
      this.logout();
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

  navigateToAnalyticReport(): void {
    const merchantId = sessionStorage.getItem('merchantId');
    if (!merchantId) {
      console.error('Merchant ID is undefined or null');
      return;
    }
    this.router.navigate(['/Analytic-Report', merchantId]);
  }




  logout() {
    this.authService.logoutMerchant();
    this.router.navigate(['/Merchants']); // Navigate to the login page
  }
}
