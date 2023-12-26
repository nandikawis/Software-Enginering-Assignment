import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

interface Promotion {
  image: string;
}
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: any;
  productId: string;
  loggedIn: boolean = true;
  showModal: boolean = false;
  loginForm: FormGroup;
  customer: any;

  promo: Promotion[] = [
    {
      image: 'https://source.unsplash.com/1000x600?promotion'
    },
    {
      image: 'https://source.unsplash.com/1000x600?promotion'
    },
    {
      image: 'https://source.unsplash.com/1000x600?promotion'
    },
    {
      image: 'https://source.unsplash.com/1000x600?promotion'
    },
    {
      image: 'https://source.unsplash.com/1000x600?promotion'
    },
    {
      image: 'https://source.unsplash.com/1000x600?promotion'
    },

  ];

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router,
    private renderer: Renderer2,
    private el: ElementRef, private customerService: CustomerService,
    private authService: AuthService) { }

  promoSlideIndex: number = 0;

  get currentPromotion(): Promotion[] {
    return this.promo.slice(this.promoSlideIndex, this.promoSlideIndex + 1);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
    this.route.params.subscribe(params => {
      const id = params['productId'];
      this.productService.getProductByProductId(id).subscribe({
        next: (data: any) => { // Replace 'any' with a more specific type if possible
          this.product = data;
        },
        error: (error: any) => { // Same here for 'any'
          console.error('Error fetching merchant:', error);
        },
        complete: () => {
          // Optional: Any cleanup or final actions when the Observable completes
        }
      });
    });
    this.authService.isLoggedIn().subscribe(status => {
      this.loggedIn = status;
    });
    console.log('status :', this.loggedIn);

  }

  checkLoggedIn(productId: string) {
    if (!this.loggedIn) {
      this.showModal = true;
    } else {
      if (productId) {
        this.router.navigate(['/Purchase', productId]);
      } else {
        console.error('Product ID is undefined or null');
      }
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.customerService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            this.customerService.getCustomerByEmail(this.loginForm.value.email).subscribe({
              next: (data: any) => {

                this.authService.login(response.token, data.customerId, this.loginForm.value.email);
                this.router.navigate(['/Details', this.product.productId]);
              },
              error: (error: any) => {
                console.error('Error fetching customer:', error);
              },
              complete: () => {
                // Optional: Any cleanup or final actions when the Observable completes
              }
            })


          },
          error: (error) => {
            console.error('Login failed', error);
            // Handle login error (show message to user)
          }
        });
    }
  }

  closeModalToRegister() {
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
    this.router.navigate(['/Sign-Up']);
  }

  openModal() {
    this.showModal = true;
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }

  closeModal() {
    this.showModal = false;
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');

  }


  prevSlidePromo(): void {
    if (this.promoSlideIndex > 0) {
      this.promoSlideIndex--;
    } else {

    }
  }

  nextSlidePromo(): void {
    if (this.promoSlideIndex < this.promo.length - 1) {
      this.promoSlideIndex++;
    } else {

    }
  }

}
