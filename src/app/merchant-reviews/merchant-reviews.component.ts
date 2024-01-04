import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';

interface Review {
  rating: number;
}
@Component({
  selector: 'app-merchant-reviews',
  templateUrl: './merchant-reviews.component.html',
  styleUrls: ['./merchant-reviews.component.css']
})
export class MerchantReviewsComponent {
  overAllReview: any;
  product: any;
  productId: string;
  loggedIn: boolean = true;
  showModal: boolean = false;
  customer: any;
  noReview: boolean = false;

  cards: any[] = [];
  public pageSize = 5;
  public currentPage = 1;
  public totalPages: number;


  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router,
    private renderer: Renderer2,
    private el: ElementRef, private customerService: CustomerService,
    private authService: AuthService,
    private reviewService: ReviewService) {
    this.totalPages = Math.ceil(this.cards.length / this.pageSize);
  }

  promoSlideIndex: number = 0;

  get fullStars() {
    return new Array(Math.floor(this.overAllReview.averageRating));
  }

  get hasHalfStar() {
    return this.overAllReview.averageRating % 1 >= 0.5;
  }

  formatRating(rating: number): string {
    return rating.toFixed(1);
  }

  ngOnInit() {
    const merchantId = sessionStorage.getItem('merchantId');
    if (merchantId) {
      this.reviewService.getReviewsByMerchantId(merchantId).subscribe(
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
          this.reviewService.getReviewsByMerchantId(merchantId).subscribe({
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
      )
    };
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
