import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registercustomer',
  templateUrl: './registercustomer.component.html',
  styleUrls: ['./registercustomer.component.css']
})
export class RegistercustomerComponent implements OnInit {
  customerForm: FormGroup;
  showModal = false;
  customer: any;

  constructor(private customerService: CustomerService, private renderer: Renderer2,
    private el: ElementRef, private router: Router) {
    this.customerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      contactNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.customerService.validateEmailNotTaken()],
        updateOn: 'blur'
      }),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.customerForm.get('password')?.valueChanges.subscribe(() => {
      this.customerForm.get('confirmPassword')?.updateValueAndValidity();
    });

    this.customerForm.get('confirmPassword')?.setAsyncValidators(
      this.confirmPasswordValidator.bind(this)
    );
  }

  saveData() {
    if (this.customerForm.valid) {
      this.customer = {
        fullName: this.customerForm.value.name,
        contactNumber: this.customerForm.value.contactNumber,
        email: this.customerForm.value.email,
        password: this.customerForm.value.password
      }

      this.customerService.registerCustomer(this.customer).subscribe({
        next: data => {
          console.log("Data has been saved: ", data);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })

      console.log(this.customer);

    } else {
      console.error('Form is invalid:', this.customerForm.errors);
    }
  }

  confirmPasswordValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise(resolve => {
      const password = this.customerForm.get('password')?.value;
      const confirmPassword = control.value;

      if (password !== confirmPassword) {
        resolve({ passwordMismatch: true });
      } else {
        resolve(null);
      }
    });
  }

  openModal() {
    this.showModal = true;
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }

  closeModal() {
    this.showModal = false;
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
    this.router.navigate(['/landing-page']);
  }


}
