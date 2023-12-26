import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../services/merchant.service';
import { Renderer2, ElementRef } from '@angular/core';
import emailjs from '@emailjs/browser';
@Component({
  selector: 'app-detail-merchant-registration',
  templateUrl: './detail-merchant-registration.component.html',
  styleUrls: ['./detail-merchant-registration.component.css']
})
export class DetailMerchantRegistrationComponent {
  merchant: any;

  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantService,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }
  showModal: boolean = false;
  openModal() {
    this.showModal = true;
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }
  closeModal() {
    this.showModal = false;
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']; // Get ID from route parameters
      console.log('Retrieved merchant ID:', id);
      this.merchantService.getMerchantById(id).subscribe({
        next: (data: any) => { // Replace 'any' with a more specific type if possible
          this.merchant = data;
        },
        error: (error: any) => { // Same here for 'any'
          console.error('Error fetching merchant:', error);
        },
        complete: () => {
          // Optional: Any cleanup or final actions when the Observable completes
        }
      });
    });
  }

  deleteMerchant(id: string): void {
    this.merchantService.deleteMerchantById(id).subscribe({
      next: (response) => {
        console.log(response.message);
      },
      error: (error) => {
        console.error('Error deleting merchant:', error);
        // Handle error, e.g., show error message
      }
    });
  }
  approveMerchant(id: string, email: string, merchantname: string,): void {
    this.merchantService.approveMerchant(id).subscribe({
      next: (response) => {
        this.showModal = true;
        const password = response.password;;

        console.log(response.message);
        emailjs.init('UTVuuMC1iOeI3C_ZY');
        emailjs.send("service_fp59wt6", "template_2ce6heo", {
          to_name: merchantname,
          _email: email,
          _pass: password,
          to_email: email
        });
        // Handle the response, e.g., show a success message, refresh the list, etc.
      },
      error: (error) => {
        console.error('Error approving merchant:', error);
        // Handle error, e.g., show error message
      }
    });
  }
}
