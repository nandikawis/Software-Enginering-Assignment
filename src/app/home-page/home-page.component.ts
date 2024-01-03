import { Component, ViewEncapsulation, HostListener, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { AuthService } from '../services/auth.service';
import { OfficerService } from '../services/officer.service';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  loginForm: FormGroup;
  loginOfficerForm: FormGroup;
  showModal: boolean = false;
  customer: any;
  loggedIn: boolean = false;
  userType: string | null = null;
  customerNameInitial: string = '';
  showDropdown = false;
  isMenuVisible = false;
  loginAlert: boolean = false;
  officerModal: boolean = false;
  loginAlert2: boolean = false;

  navbarClass = '';
  constructor(private renderer: Renderer2,
    private el: ElementRef, private router: Router,
    private customerService: CustomerService,
    private authService: AuthService,
    private officerService: OfficerService) { }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.loginOfficerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });

    this.authService.isLoggedIn().subscribe(status => {
      this.loggedIn = status;
      if (!status) {
        this.userType = null; // Reset userType when logged out
      } else {
        this.userType = this.authService.getUserType();
        console.log(this.userType);
        console.log(sessionStorage.getItem('username'));
      }
    });
    this.checkTokenExpiration();
    setInterval(() => this.checkTokenExpiration(), 60000);
    this.checkUserType();
    setInterval(() => this.checkUserType(), 1000);
  }

  scrollToSection(fragment: any): void {
    this.router.navigateByUrl('landing-page#' + fragment);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }


  openModal() {
    this.showModal = true;
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }

  navigateToReceipt() {
    const customerId = sessionStorage.getItem('customerId');
    this.router.navigate(['/Order', customerId]);
  }

  checkTokenExpiration() {
    const token = sessionStorage.getItem('token');
    if (token && this.isTokenExpired(token)) {
      this.logout();
    }
  }

  checkUserType() {
    const type = sessionStorage.getItem('userType');

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
                this.authService.loginCustomer(response.token, data.customerId, this.loginForm.value.email);
              },
              error: (error) => {
                console.error('Login failed', error);
                // Handle login error (show message to user)
              }
            })
            this.router.navigate(['/landing-page']);
          },
          error: (error) => {
            console.error('Login failed', error);
            this.loginAlert = true;
          }
        });
    }
  }

  loginOfficer() {
    if (this.loginOfficerForm.valid) {
      this.officerService.loginOfficer(this.loginOfficerForm.value.username, this.loginOfficerForm.value.password)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.authService.loginOfficer(response.token, this.loginOfficerForm.value.username);
            this.router.navigate(['/Officer']);
          },
          error: (error) => {
            console.error('Login failed', error);
            this.loginAlert2 = true;
          }
        });
    }
  }

  openOfficerModal() {
    this.officerModal = true;
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }

  closeOfficerModal() {
    this.officerModal = false;
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }


  closeLoginAlert() {
    this.loginAlert = false;

  }

  closeLoginAlert2() {
    this.loginAlert2 = false;

  }

  logout() {
    this.authService.logoutCustomer();
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