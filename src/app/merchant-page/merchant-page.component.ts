import { Component } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MerchantService } from '../services/merchant.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-merchant-page',
  templateUrl: './merchant-page.component.html',
  styleUrls: ['./merchant-page.component.css']
})
export class MerchantPageComponent {
  showModal: boolean = false;
  loginForm: FormGroup;
  merchant: any;
  loginAlert: boolean = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private formBuilder: FormBuilder,
    private merchantService: MerchantService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  openModal() {
    this.showModal = true;
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }

  closeModal() {
    this.showModal = false;
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }

  login() {
    if (this.loginForm.valid) {
      this.merchantService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            this.merchantService.getMerchantByEmail(this.loginForm.value.email).subscribe({
              next: (data: any) => {
                this.merchant = data;

                this.authService.loginMerchant(response.token, this.merchant.merchantId, this.loginForm.value.email);

                this.router.navigate(['/Management']); // Navigate to the protected route
              },
              error: (error: any) => {
                console.error('Error fetching merchant:', error);
              }
            })
            const a = sessionStorage.getItem('merchantId');
            console.log('Retrive Merchant ID', a);
            this.router.navigate(['/Management']); // Navigate to the protected route
          },
          error: (error) => {
            console.error('Login failed', error);
            this.loginAlert = true;
          }
        });
    }
  }
  closeLoginAlert() {
    this.loginAlert = false;
  }
}
