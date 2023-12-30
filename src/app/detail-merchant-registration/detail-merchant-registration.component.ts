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
  showModal: boolean = false;
  imageData: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantService,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }
  closeModal() {
    this.showModal = false;
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('Retrieved merchant ID:', id);
      this.merchantService.getMerchantById(id).subscribe({
        next: (data: any) => {
          this.merchant = data;
          console.log('Retrieved merchant:', this.merchant.documentId);
          this.merchantService.downloadFileById(data.documentId, data.fileName).subscribe(
            (blob) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                this.imageData = reader.result;
                console.log('Image data:', this.imageData);
              };
              reader.readAsDataURL(blob);
            },
            (error) => {
              console.error('Error downloading file:', error);
            }
          );
        },
        error: (error: any) => {
          console.error('Error fetching merchant:', error);
        },
        complete: () => {

        }
      });
    });
  }

  downloadFile(): void {
    this.merchantService.downloadFileById(this.merchant.documentId, this.merchant.fileName).subscribe(
      (blob) => {
        console.log("file is found")

        const url = window.URL.createObjectURL(blob);

        // Create an anchor element
        const a = document.createElement('a');
        a.href = url;
        a.download = this.merchant.documentId;

        // Append the anchor element to the document
        document.body.appendChild(a);

        // Trigger a click on the anchor element to start the download
        a.click();

        // Remove the anchor element from the document
        document.body.removeChild(a);

        // Release the blob URL
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading the file:', error);
      }
    );
  }

  deleteMerchant(id: string): void {
    this.merchantService.deleteMerchantById(id).subscribe({
      next: (response) => {
        console.log(response.message);
      },
      error: (error) => {
        console.error('Error deleting merchant:', error);
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

      },
      error: (error) => {
        console.error('Error approving merchant:', error);

      }
    });
  }
}
