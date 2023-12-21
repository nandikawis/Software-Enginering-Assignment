import { Component } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-review-merchant-registration',
  templateUrl: './review-merchant-registration.component.html',
  styleUrls: ['./review-merchant-registration.component.css']
})
export class ReviewMerchantRegistrationComponent {
  cards: any[] = [];
  public pageSize = 5;
  public currentPage = 1;
  public totalPages: number;

  constructor(private merchantService: MerchantService, private router: Router) {
    this.totalPages = Math.ceil(this.cards.length / this.pageSize);
    this.navigateToDetail = this.navigateToDetail.bind(this);

  }
  ngOnInit(): void {
    this.merchantService.displayMerchants().subscribe({
      next: (data) => {
        this.cards = data;
        this.totalPages = Math.ceil(this.cards.length / this.pageSize);
      },
      error: (error) => {
        console.error('Error fetching merchants', error);
      },
      complete: () => {
        // Optional: Code to run on completion
      }
    });
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

  selectedStatus: string = 'Rejected'; // Default value

  updateStatus(newStatus: string): void {
    this.selectedStatus = newStatus;
  }

  navigateToDetail(merchantId: string): void {
    if (!merchantId) {
      console.error('Merchant ID is undefined or null');
      return;
    }
    this.router.navigate(['/Officer/Detail-Merchant', merchantId]);
  }

}
