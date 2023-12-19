import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { fadeInOutAnimation } from '../animation';
@Component({
  selector: 'app-merchant-account',
  templateUrl: './merchant-account.component.html',
  styleUrls: ['./merchant-account.component.css'],
  animations: [fadeInOutAnimation]
})
export class MerchantAccountComponent implements OnInit {
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  showModal: boolean = false;
  alertModal: boolean = false;
  passForm: FormGroup;
  merchant: any;

  public email: string = 'example@email.com';
  public password: string = 'Password123';
  public showPassword: boolean = false;

  constructor(private merchantService: MerchantService, private router: Router) {
    // Initialize the form without the async validator
    this.passForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const merchantId = sessionStorage.getItem('merchantId');
    if (merchantId) {
      this.merchantService.getMerhcantByMerchantId(merchantId).subscribe({
        next: (data: any) => {
          this.merchant = data;
          // Set the async validator now that we have the data
          const oldPasswordControl = this.passForm.get('oldPassword');
          if (oldPasswordControl) {
            oldPasswordControl.setAsyncValidators(
              this.merchantService.validatePassword(this.merchant.password)
            );
            oldPasswordControl.updateValueAndValidity(); // Update the form control validity
          }
        },
        error: (error: any) => {
          console.error('Error fetching merchant:', error);
        }
      });
    } else {
      console.error('No email found in session storage');
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  openModal() {
    this.showModal = true;
    // Additional modal open logic if necessary
  }

  closeModal() {
    this.showModal = false;
    // Additional modal close logic if necessary
  }

  openAlert() {
    this.alertModal = true;
  }

  closeAlert() {
    this.alertModal = false;
    sessionStorage.removeItem('token'); // Remove the token
    sessionStorage.removeItem('merchantId');
    this.router.navigate(['/Merchants']); // Navigate to the login page
  }

  // function that logsout merchants


  changeMerchantPasswords() {
    const email = sessionStorage.getItem('email');
    if (email && this.passForm.valid) {
      this.merchantService.changeMerchantPassword(email, this.passForm.value.newPassword).subscribe({
        next: (response) => {
          console.log('Merchant password updated:', response);
          // Handle successful password update
        },
        error: (error) => {
          console.error('Error updating password:', error);
          // Handle error in updating password
        }
      });
    }
  }
}
