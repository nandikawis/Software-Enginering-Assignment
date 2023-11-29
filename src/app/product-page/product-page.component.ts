import { Component } from '@angular/core';
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
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  cards: ProductData[] = [
    {
      image: 'https://source.unsplash.com/1000x600?promotion',
      title: 'Product Title',
      member: 'Rating',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
      heading: 'Can Coffee make you a better developer?',
      authorImage: 'aa',
      authorName: 'nandika',
      date: 'Nov 25'
    },
    {
      image: 'https://source.unsplash.com/1000x600?promotion',
      title: 'Product Title',
      member: 'Rating',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
      heading: 'Can Coffee make you a better developer?',
      authorImage: 'aa',
      authorName: 'nandika',
      date: 'Nov 25'
    },
    {
      image: 'https://source.unsplash.com/1000x600?promotion',
      title: 'Product Title',
      member: 'Rating',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
      heading: 'Can Coffee make you a better developer?',
      authorImage: 'aa',
      authorName: 'nandika',
      date: 'Nov 25'
    },
    {
      image: 'https://source.unsplash.com/1000x600?promotion',
      title: 'Product Title',
      member: 'Rating',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
      heading: 'Can Coffee make you a better developer?',
      authorImage: 'aa',
      authorName: 'nandika',
      date: 'Nov 25'
    },
    {
      image: 'https://source.unsplash.com/1000x600?promotion',
      title: 'Product Title',
      member: 'Rating',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
      heading: 'Can Coffee make you a better developer?',
      authorImage: 'aa',
      authorName: 'nandika',
      date: 'Nov 25'
    },
    {
      image: 'https://source.unsplash.com/1000x600?promotion',
      title: 'Product Title',
      member: 'Rating',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
      heading: 'Can Coffee make you a better developer?',
      authorImage: 'aa',
      authorName: 'nandika',
      date: 'Nov 25'
    },

  ];
  public pageSize = 5;
  public currentPage = 1;
  public totalPages: number;

  constructor() {
    this.totalPages = Math.ceil(this.cards.length / this.pageSize);
  }

  public get cardsForCurrentPage(): ProductData[] {
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
