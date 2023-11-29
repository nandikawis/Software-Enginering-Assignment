import { Component } from '@angular/core';
interface Promotion {
  image: string;
}
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
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

  promoSlideIndex: number = 0;

  get currentPromotion(): Promotion[] {
    return this.promo.slice(this.promoSlideIndex, this.promoSlideIndex + 1);
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
