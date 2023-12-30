import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
interface ProductData {
  image: string;
  title: string;
  member: string;
  content: string;
  heading: string;
  authorImage: string;
  authorName: string;
  date: string;
}

interface Review {
  rating: number;
  // include other properties of a review if there are any
}
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  cards: any[] = []

  public pageSize = 5;
  public currentPage = 1;
  public totalPages: number;

  constructor(private reviewService: ReviewService, private productService: ProductService, private router: Router) {
    this.totalPages = Math.ceil(this.cards.length / this.pageSize);
  }

  fetchCategory(category: string) {
    this.productService.getProductByCategory(category).subscribe({
      next: (res) => {
        this.cards = [];
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
  }


  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.cards = [];
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

  navigateToDetail(productId: string): void {
    if (!productId) {
      console.error('Product ID is undefined or null');
      return;
    }
    this.router.navigate(['/Details', productId]);
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
