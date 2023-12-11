import { Component } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-merchant-register',
  templateUrl: './merchant-register.component.html',
  styleUrls: ['./merchant-register.component.css']
})
export class MerchantRegisterComponent {
  merchantForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    contactNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    companyDescription: new FormControl('', [Validators.required])
  });

  constructor(private merchantService: MerchantService) { }

  onSubmit() {
    console.log('Form data being sent:', this.merchantForm.value);

    if (this.merchantForm.valid) {
      this.merchantService.registerMerchant(this.merchantForm.value).subscribe({
        next: (res) => {
          console.log('Merchant registered:', res);
          // Additional success handling
        },
        error: (err) => {
          console.error('Error during registration:', err);
          // More detailed error handling
        }
      });
    } else {
      console.error('Form is invalid:', this.merchantForm.errors);
    }
  }
}