import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ReviewService } from '../services/review.service';

interface Review {
  rating: number;
  // include other properties of a review if there are any
}
@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent {

  cards: any[] = [];
  public pageSize = 5;
  public currentPage = 1;
  public totalPages: number;
  imageData: string | ArrayBuffer | null = null;

  constructor(private reviewService: ReviewService, private productService: ProductService, private router: Router) {
    this.totalPages = Math.ceil(this.cards.length / this.pageSize);
  }

  ngOnInit(): void {
    const merchantId = sessionStorage.getItem('merchantId');
    if (merchantId) {
      this.productService.getProductsByMerchantId(merchantId).subscribe({
        next: (res) => {
          for (const product of res) {
            this.processProduct(product);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
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
              this.cards.push(productData);
              this.totalPages = Math.ceil(this.cards.length / this.pageSize);
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
                this.cards.push(productData);
                this.totalPages = Math.ceil(this.cards.length / this.pageSize);
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

  navigateToEdit(productId: string): void {
    if (!productId) {
      console.error('Merchant ID is undefined or null');
      return;
    }
    this.router.navigate(['/Edit-Product', productId]);
  }

}
