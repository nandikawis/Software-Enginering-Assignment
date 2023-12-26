import { Component, ViewEncapsulation, HostListener, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  loginForm: FormGroup;
  showModal: boolean = false;
  customer: any;
  loggedIn: boolean = false;
  customerNameInitial: string = '';
  showDropdown = false;


  navbarClass = '';
  constructor(private renderer: Renderer2,
    private el: ElementRef, private router: Router,
    private customerService: CustomerService,
    private authService: AuthService) { }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
    this.authService.isLoggedIn().subscribe(status => {
      this.loggedIn = status;
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }


  openModal() {
    this.showModal = true;
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }

  navigateToReceipt() {
    const customerId = sessionStorage.getItem('customerId');
    this.router.navigate(['/Order', customerId]);
  }


  closeModalToRegister() {
    this.showModal = false;
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
    this.router.navigate(['/Sign-Up']);
  }
  closeModal() {
    this.showModal = false;
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
    this.router.navigate(['/landing-page']);
  }
  login() {
    if (this.loginForm.valid) {
      this.customerService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            this.customerService.getCustomerByEmail(this.loginForm.value.email).subscribe({
              next: (data) => {
                this.customer = data;
                let firstCharacter = '';
                if (this.customer && typeof this.customer.fullName === 'string') {
                  firstCharacter = this.customer.fullName.charAt(0);
                }


                this.customerNameInitial = firstCharacter;

                console.log(this.customer.fullName);
                this.authService.login(response.token, data.customerId, this.loginForm.value.email);
              },
              error: (error) => {
                console.error('Login failed', error);
                // Handle login error (show message to user)
              }
            })
            this.authService.login(response.token, response.customerId, this.loginForm.value.email);
            this.router.navigate(['/landing-page']);
          },
          error: (error) => {
            console.error('Login failed', error);
            // Handle login error (show message to user)
          }
        });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/landing-page']);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollTop = (event.target as Document)?.documentElement.scrollTop || window.scrollY;
    if (scrollTop > 0) {
      this.navbarClass = 'bg-darkgreen';
    } else {
      this.navbarClass = '';
    }
  }
}