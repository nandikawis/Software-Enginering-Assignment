import { Component, AfterViewInit } from '@angular/core';
import { Renderer2, ElementRef, ViewChild } from '@angular/core';
import { PurchaseService } from '../services/purchase.service';
import { ReceiptService } from '../services/receipt.service';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



declare let paypal: any; // Declare PayPal's global variable

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements AfterViewInit {
  @ViewChild('receiptContent', { static: false }) receiptContent: ElementRef;

  showModal: boolean = false;
  receipt: any;
  purchase: any;
  showReceiptModal: boolean = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private purchaseService: PurchaseService,
    private receiptService: ReceiptService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['orderId'];
      this.purchaseService.getPurchaseDataByOrderId(id).subscribe({
        next: (data: any) => {
          this.purchase = data;
        },
        error: (error: any) => {
          console.error('Error fetching merchant:', error);
        },
        complete: () => {
          // Optional: Any cleanup or final actions when the Observable completes
        }
      });
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initializePaypalButtons(), 500);

  }




  initializePaypalButtons(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.purchase.price
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log('Transaction completed by', details.payer.name.given_name);
          console.log('Transaction', details);
          this.receiptService.captureOrder(this.purchase.orderId, details).subscribe({
            next: (response) => {
              // Handle the response
              console.log('Receipt saved', response);

              const dataR = {
                "ID": details.id,
                "productName": this.purchase.fullName,
                "price": this.purchase.price,
                "email": this.purchase.email,
                "status": details.status

              }
              this.receipt = dataR;
              this.showModal = true;
            },
            error: (error) => {
              // Handle errors
              console.error('Error capturing order:', error);
            }
          });
        });
      },
      onError: (err: any) => {
        console.error(err);
      }
    }).render('#paypal-button-container');
  }

  openModal() {
    this.showModal = true;
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }

  closeModal() {
    this.showModal = false;

    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }
  closeReceipt() {
    this.showReceiptModal = false;
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }
  downloadReceiptAsPDF() {
    const DATA = this.receiptContent.nativeElement;
    const pdfFormat = 'a4'; // or use specific dimensions

    html2canvas(DATA, {
      useCORS: true,
      scale: 1 // You might adjust the scale for better resolution
    }).then(canvas => {
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? 'l' : 'p',
        unit: 'px',
        format: [imgWidth, imgHeight]
      });

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('purchase-receipt.pdf');
    });
  }


}
