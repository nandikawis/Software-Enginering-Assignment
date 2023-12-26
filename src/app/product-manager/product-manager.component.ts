import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

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

  constructor(private productService: ProductService, private router: Router) {
    this.totalPages = Math.ceil(this.cards.length / this.pageSize);
  }

  ngOnInit(): void {
    const merchantId = sessionStorage.getItem('merchantId');
    console.log('merchantId', merchantId);
    if (merchantId) {
      this.productService.getProductsByMerchantId(merchantId).subscribe({
        next: (res) => {
          this.cards = res;
          this.totalPages = Math.ceil(this.cards.length / this.pageSize);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {

        }
      })
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

  navigateToEdit(productId: string): void {
    if (!productId) {
      console.error('Merchant ID is undefined or null');
      return;
    }
    this.router.navigate(['/Edit-Product', productId]);
  }

}
