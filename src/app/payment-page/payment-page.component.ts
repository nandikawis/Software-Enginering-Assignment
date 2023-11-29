import { Component } from '@angular/core';
import { Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent {
  showModal: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  openModal() {
    this.showModal = true;
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');

  }

  closeModal() {
    this.showModal = false;
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }
}
