import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MerchantService } from '../services/merchant.service';
import { fadeInOutAnimation } from '../animation';
@Component({
  selector: 'app-manage-merchant',
  templateUrl: './manage-merchant.component.html',
  styleUrls: ['./manage-merchant.component.css'],
  animations: [fadeInOutAnimation]
})
export class ManageMerchantComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  merchant: any;
  constructor(private router: Router, private route: ActivatedRoute,
    private merchantService: MerchantService) { }
  ngOnInit(): void {
    const merchantId = sessionStorage.getItem('merchantId');
    if (merchantId) {
      console.log('Retrieved merchant ID:', merchantId);
      this.merchantService.getMerhcantByMerchantId(merchantId).subscribe({
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

  }

  logout() {
    sessionStorage.removeItem('token'); // Remove the token
    sessionStorage.removeItem('merchantId');
    sessionStorage.removeItem('email');
    this.router.navigate(['/Merchants']); // Navigate to the login page
  }
}
