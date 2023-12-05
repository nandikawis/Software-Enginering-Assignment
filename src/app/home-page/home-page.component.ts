import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {
  navbarClass = '';

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollTop = (event.target as Document)?.documentElement.scrollTop || window.scrollY;
    if (scrollTop > 0) {
      this.navbarClass = 'bg-darkgreen'; // Replace 'bg-blue-500' with your desired background color utility class.
    } else {
      this.navbarClass = '';
    }
  }
}