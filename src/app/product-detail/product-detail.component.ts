import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';

interface Promotion {
  image: string;
}

interface Review {
  rating: number;
}
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  overAllReview: any;
  product: any;
  productId: string;
  loggedIn: boolean = true;
  showModal: boolean = false;
  loginForm: FormGroup;
  customer: any;
  imageData: string | ArrayBuffer | null = null;
  noReview: boolean = false;

  cards: any[] = [];
  public pageSize = 5;
  public currentPage = 1;
  public totalPages: number;


  promo: Promotion[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router,
    private renderer: Renderer2,
    private el: ElementRef, private customerService: CustomerService,
    private authService: AuthService,
    private reviewService: ReviewService) {
    this.totalPages = Math.ceil(this.cards.length / this.pageSize);
  }

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
          this.productService.downloadFileById(data.imageId, data.fileName).subscribe(
            (blob) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                this.imageData = reader.result as string;
                this.promo.push({ image: this.imageData });
                this.promo.push({ image: this.imageData });
                this.promo.push({ image: this.imageData });
                console.log('Image data:', this.imageData);

                this.reviewService.getReviewsByProductId(data.productId).subscribe(
                  (reviews: Review[]) => {
                    this.noReview = false;
                    let totalRating = 0;
                    reviews.forEach(review => {
                      totalRating += review.rating; // Assuming 'rating' is a property of review
                    });
                    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
                    const numberOfRatings = reviews.length;

                    // Create the product data object including the image and review data
                    const reviewData = {
                      averageRating: averageRating,
                      numberOfRatings: numberOfRatings
                    };
                    this.overAllReview = reviewData;
                    this.reviewService.getReviewsByProductId(id).subscribe({
                      next: (data: any) => { // Replace 'any' with a more specific type if possible
                        this.cards = data;
                        this.totalPages = Math.ceil(this.cards.length / this.pageSize);
                      },
                      error: (error: any) => { // Same here for 'any'
                        console.error('Error fetching merchant:', error);
                      },
                      complete: () => {
                        // Optional: Any cleanup or final actions when the Observable completes
                      }
                    })
                  },
                  (error) => {
                    if (error.status === 404) {
                      this.noReview = true;
                    } else {
                      console.error('Error fetching reviews:', error);
                    }
                  }
                );

              };
              reader.readAsDataURL(blob);
            },
            (error) => {
              console.error('Error downloading file:', error);
            }
          );
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

  public get cardsForCurrentPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.cards.slice(startIndex, startIndex + this.pageSize);
  }

  public goToPage(page: number): void {
    this.currentPage = page;
  }

  public goToNext(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  public goToPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
