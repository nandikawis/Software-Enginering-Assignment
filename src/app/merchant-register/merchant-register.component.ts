import { Component } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-merchant-register',
  templateUrl: './merchant-register.component.html',
  styleUrls: ['./merchant-register.component.css']
})
export class MerchantRegisterComponent {
  merchantForm: FormGroup;
  showModal = false;

  constructor(private merchantService: MerchantService) {
    this.merchantForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.merchantService.validateEmailNotTaken()],
        updateOn: 'blur'
      }),
      companyDescription: new FormControl('', [Validators.required])
    });
  }
  onSubmit() {
    console.log('Form data being sent:', this.merchantForm.value);

    if (this.merchantForm.valid) {
      this.merchantService.registerMerchant(this.merchantForm.value).subscribe({
        next: (res) => {
          console.log('Merchant registered:', res);
          this.merchantForm.reset();
        },
        error: (err) => {
          console.error('Error during registration:', err);
        }
      });
    } else {
      console.error('Form is invalid:', this.merchantForm.errors);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}