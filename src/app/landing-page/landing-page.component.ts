import { Component } from '@angular/core';

interface TopDestination {
  image: string;
  title: string;
  content: string;
  tags: string[];
}
interface Promotion {
  image: string;
}

interface PopularAttraction {
  image: string;
  title: string;
  content: string;
  tags: string[];
}


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
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
  cards: TopDestination[] = [
    // Add as many cards as needed
    {
      image: 'https://source.unsplash.com/1000x600?nature,water',
      title: 'The Coldest Sunset',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      tags: ['#photography', '#travel', '#winter']
    },
    {
      image: 'https://source.unsplash.com/1000x600?city',
      title: 'The Coldest Sunset',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      tags: ['#photography', '#travel', '#winter']
    },
    {
      image: 'https://source.unsplash.com/1000x600?aquarium',
      title: 'The Coldest Sunset',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      tags: ['#photography', '#travel', '#winter']
    },
    {
      image: 'https://source.unsplash.com/1000x600?hotel',
      title: 'The Coldest Sunset',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      tags: ['#photography', '#travel', '#winter']
    },
    {
      image: 'https://source.unsplash.com/1000x600?genting',
      title: 'The Coldest Sunset',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      tags: ['#photography', '#travel', '#winter']
    },
    {
      image: 'https://source.unsplash.com/1000x600?casino',
      title: 'The Coldest Sunset',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      tags: ['#photography', '#travel', '#winter']
    },
    {
      image: 'https://source.unsplash.com/1000x600?mall',
      title: 'The Coldest Sunset',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      tags: ['#photography', '#travel', '#winter']
    },
    // Duplicate the card structure to have multiple cards
    // ...
  ];

  popular: PopularAttraction[] = [
    // Add as many cards as needed
    {
      image: 'https://source.unsplash.com/1000x600?jakarta',
      title: 'The Coldest Sunset',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      tags: ['#photography', '#travel', '#winter']
    },
    {
      image: 'https://source.unsplash.com/1000x600?aquarium',
      title: 'The Coldest Sunset',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      tags: ['#photography', '#travel', '#winter']
    },
    {
      image: 'https://source.unsplash.com/1000x600?city',
      title: 'The Coldest Sunset',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      tags: ['#photography', '#travel', '#winter']
    },
    {
      image: 'https://source.unsplash.com/1000x600?hotel',
      title: 'The Coldest Sunset',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      tags: ['#photography', '#travel', '#winter']
    },
    {
      image: 'https://source.unsplash.com/1000x600?genting',
      title: 'The Coldest Sunset',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      tags: ['#photography', '#travel', '#winter']
    },
    {
      image: 'https://source.unsplash.com/1000x600?casino',
      title: 'The Coldest Sunset',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      tags: ['#photography', '#travel', '#winter']
    },
    {
      image: 'https://source.unsplash.com/1000x600?mall',
      title: 'The Coldest Sunset',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      tags: ['#photography', '#travel', '#winter']
    },
    // Duplicate the card structure to have multiple cards
    // ...
  ];

  activeSlideIndex: number = 0;

  promoSlideIndex: number = 0;

  popularSlideIndex: number = 0;

  constructor() { }

  // Get the cards for the current slide
  get currentCards(): TopDestination[] {
    return this.cards.slice(this.activeSlideIndex, this.activeSlideIndex + 3);
  }

  get currentPromotion(): Promotion[] {
    return this.promo.slice(this.promoSlideIndex, this.promoSlideIndex + 1);
  }

  get currentPopularAttraction(): PopularAttraction[] {
    return this.popular.slice(this.popularSlideIndex, this.popularSlideIndex + 3);
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
    if (this.activeSlideIndex < this.cards.length - 3) {
      this.activeSlideIndex++;
    } else {

    }
  }

  nextSlidePop(): void {
    if (this.popularSlideIndex < this.popular.length - 3) {
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
}
