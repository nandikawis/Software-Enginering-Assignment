import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { fadeInOutAnimation } from '../animation';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [fadeInOutAnimation],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  navbarClass = '';

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollTop = (event.target as Document)?.documentElement.scrollTop || window.scrollY;
    if (scrollTop > 0) {
      this.navbarClass = 'bg-darkgreen';
    } else {
      this.navbarClass = '';
    }
  }
}