import { Component } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MerchantService } from '../services/merchant.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-merchant-page',
  templateUrl: './merchant-page.component.html',
  styleUrls: ['./merchant-page.component.css']
})
export class MerchantPageComponent {
  showModal: boolean = false;
  loginForm: FormGroup;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private formBuilder: FormBuilder,
    private merchantService: MerchantService,
    private router: Router
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
            sessionStorage.setItem('token', response.token);
            this.router.navigate(['/management']); // Navigate to the protected route
          },
          error: (error) => {
            console.error('Login failed', error);
            // Handle login error (show message to user)
          }
        });
    }
  }
}
