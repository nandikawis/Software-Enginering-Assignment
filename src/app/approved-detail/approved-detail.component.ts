import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from '../services/merchant.service';
import { Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-approved-detail',
  templateUrl: './approved-detail.component.html',
  styleUrls: ['./approved-detail.component.css']
})
export class ApprovedDetailComponent {
  merchant: any;
  showModal: boolean = false;
  imageData: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) { }
  closeModal() {
    this.showModal = false;
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['merchantId'];
      console.log('Retrieved merchant ID:', id);
      this.merchantService.getMerchantByMerchantId(id).subscribe({
        next: (data: any) => {
          this.merchant = data;
          console.log('Retrieved merchant this:', this.merchant.merchantId);
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

  navigateToAnalyticReport(merchantId: string): void {
    if (!merchantId) {
      console.error('Merchant ID is undefined or null');
      return;
    }
    this.router.navigate(['/Officer/Merchant-Report', merchantId]);
  }


}
