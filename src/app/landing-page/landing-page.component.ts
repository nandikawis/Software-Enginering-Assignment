import { HostListener, Component, ViewChild, ElementRef } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';


interface Review {
  rating: number;
  // include other properties of a review if there are any
}
interface TopDestination {
  productId: string,
  productName: string,
  productDescription: string,
  category: string,
  imageId: string,
  filename: string,
  imageData: string | ArrayBuffer | null,
  averageRating: number,
  numberOfRatings: number
}
interface Promotion {
  productId: string,
  productName: string,
  productDescription: string,
  imageId: string,
  filename: string,
  imageData: string | ArrayBuffer | null,
  averageRating: number,
  numberOfRatings: number
}

interface PopularAttraction {
  productId: string,
  productName: string,
  productDescription: string,
  category: string,
  imageId: string,
  filename: string,
  imageData: string | ArrayBuffer | null,
  averageRating: number,
  numberOfRatings: number
}


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  promo: Promotion[] = [];
  cards: TopDestination[] = [];

  popular: PopularAttraction[] = [];

  activeSlideIndex: number = 0;

  promoSlideIndex: number = 0;

  popularSlideIndex: number = 0;

  isMobile: boolean = false;

  constructor(private reviewService: ReviewService, private productService: ProductService, private router: Router) {
    this.checkIfMobile(window.innerWidth);
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {

        for (const product of res) {
          this.processProduct(product);
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
      complete: () => {
        // Optional: Any cleanup or final actions when the Observable completes
      }
    });
    this.productService.getProductByCategory("Attraction").subscribe({
      next: (res) => {
        for (const product of res) {
          this.processAttractionProduct(product);
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
      complete: () => {
        // Optional: Any cleanup or final actions when the Observable completes
      }
    });

    this.productService.getProductByCategory("Shopping").subscribe({
      next: (res) => {
        for (const product of res) {
          this.processShoppingProduct(product);
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
      complete: () => {
        // Optional: Any cleanup or final actions when the Observable completes
      }
    });
  }

  private processAttractionProduct(product: any): void {
    this.productService.downloadFileById(product.imageId, product.filename).subscribe(
      (blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Fetch and process reviews after the image is loaded

          this.reviewService.getReviewsByProductId(product.productId).subscribe(
            (reviews: Review[]) => {
              let totalRating = 0;
              reviews.forEach(review => {
                totalRating += review.rating; // Assuming 'rating' is a property of review
              });
              const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
              const numberOfRatings = reviews.length;

              // Create the product data object including the image and review data
              const productData = {
                productId: product.productId,
                productName: product.productName,
                productDescription: product.productDescription,
                category: product.category,
                imageId: product.imageId,
                filename: product.filename,
                imageData: reader.result,
                averageRating: averageRating,
                numberOfRatings: numberOfRatings
              };

              // Push the product data to the cards array
              this.popular.push(productData);

            },
            (error) => {
              if (error.status === 404) {
                // Handle the case where no reviews are found
                const productData = {
                  productId: product.productId,
                  productName: product.productName,
                  productDescription: product.productDescription,
                  category: product.category,
                  imageId: product.imageId,
                  filename: product.filename,
                  imageData: reader.result,
                  averageRating: 0,
                  numberOfRatings: 0
                };
                this.popular.push(productData);

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
  }

  private processShoppingProduct(product: any): void {
    this.productService.downloadFileById(product.imageId, product.filename).subscribe(
      (blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Fetch and process reviews after the image is loaded

          this.reviewService.getReviewsByProductId(product.productId).subscribe(
            (reviews: Review[]) => {
              let totalRating = 0;
              reviews.forEach(review => {
                totalRating += review.rating; // Assuming 'rating' is a property of review
              });
              const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
              const numberOfRatings = reviews.length;

              // Create the product data object including the image and review data
              const productData = {
                productId: product.productId,
                productName: product.productName,
                productDescription: product.productDescription,
                category: product.category,
                imageId: product.imageId,
                filename: product.filename,
                imageData: reader.result,
                averageRating: averageRating,
                numberOfRatings: numberOfRatings
              };

              // Push the product data to the cards array
              this.cards.push(productData);

            },
            (error) => {
              if (error.status === 404) {
                // Handle the case where no reviews are found
                const productData = {
                  productId: product.productId,
                  productName: product.productName,
                  productDescription: product.productDescription,
                  category: product.category,
                  imageId: product.imageId,
                  filename: product.filename,
                  imageData: reader.result,
                  averageRating: 0,
                  numberOfRatings: 0
                };
                this.cards.push(productData);

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
  }

  private processProduct(product: any): void {
    this.productService.downloadFileById(product.imageId, product.filename).subscribe(
      (blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Fetch and process reviews after the image is loaded

          this.reviewService.getReviewsByProductId(product.productId).subscribe(
            (reviews: Review[]) => {
              let totalRating = 0;
              reviews.forEach(review => {
                totalRating += review.rating; // Assuming 'rating' is a property of review
              });
              const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
              const numberOfRatings = reviews.length;

              // Create the product data object including the image and review data
              const productData = {
                productId: product.productId,
                productName: product.productName,
                productDescription: product.productDescription,
                imageId: product.imageId,
                filename: product.filename,
                imageData: reader.result,
                averageRating: averageRating,
                numberOfRatings: numberOfRatings
              };

              // Push the product data to the cards array
              this.promo.push(productData);

            },
            (error) => {
              if (error.status === 404) {
                // Handle the case where no reviews are found
                const productData = {
                  productId: product.productId,
                  productName: product.productName,
                  productDescription: product.productDescription,
                  imageId: product.imageId,
                  filename: product.filename,
                  imageData: reader.result,
                  averageRating: 0,
                  numberOfRatings: 0
                };
                this.promo.push(productData);

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
  }




  // Get the cards for the current slide
  get currentCards(): TopDestination[] {
    const itemsPerSlide = this.isMobile ? 1 : 3;
    const endIndex = this.activeSlideIndex + itemsPerSlide;
    return this.cards.slice(this.activeSlideIndex, endIndex);
  }

  get currentPromotion(): Promotion[] {
    return this.promo.slice(this.promoSlideIndex, this.promoSlideIndex + 1);
  }

  get currentPopularAttraction(): PopularAttraction[] {
    const itemsPerSlide = this.isMobile ? 1 : 3;
    const endIndex = this.popularSlideIndex + itemsPerSlide;
    return this.popular.slice(this.popularSlideIndex, endIndex);
  }

  scrollToSection(fragment: any): void {
    this.router.navigateByUrl('landing-page#' + fragment);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Using the 'as' keyword for type assertion
    const target = event.target as Window;
    this.checkIfMobile(target.innerWidth);
  }

  checkIfMobile(width: number) {
    this.isMobile = width < 768; // Adjust the breakpoint as needed
  }

  get transformValueTop() {
    const divisor = this.isMobile ? 1 : 3;
    return `translateX(-${this.activeSlideIndex * (100 / divisor)}%)`;
  }

  get transformValuePop() {
    const divisor = this.isMobile ? 1 : 3;
    return `translateX(-${this.popularSlideIndex * (100 / divisor)}%)`;
  }




  prevSlide(): void {
    if (this.activeSlideIndex > 0) {
      this.activeSlideIndex--;
    } else {

    }
  }

  prevSlidePop(): void {
    if (this.popularSlideIndex > 0) {
      this.popularSlideIndex--;
    } else {

    }
  }

  prevSlidePromo(): void {
    if (this.promoSlideIndex > 0) {
      this.promoSlideIndex--;
    } else {

    }
  }


  nextSlide(): void {
    const itemsPerSlide = this.isMobile ? 1 : 3;
    const maxIndex = this.cards.length - itemsPerSlide;
    if (this.activeSlideIndex < maxIndex) {
      this.activeSlideIndex++;
    }
  }

  nextSlidePop(): void {
    const itemsPerSlide = this.isMobile ? 1 : 3;
    const maxIndex = this.popular.length - itemsPerSlide;
    if (this.popularSlideIndex < maxIndex) {
      this.popularSlideIndex++;
    } else {

    }
  }

  nextSlidePromo(): void {
    if (this.promoSlideIndex < this.promo.length - 1) {
      this.promoSlideIndex++;
    } else {

    }
  }

  getfullStars(rating: number) {
    return new Array(Math.floor(rating));
  }

  gethasHalfStar(rating: number) {
    return rating % 1 >= 0.5;
  }

  navigateToDetails(productId: string) {
    this.router.navigate(['/Details', productId]);
  }

  formatRating(rating: number): string {
    return rating.toFixed(1);
  }



}
