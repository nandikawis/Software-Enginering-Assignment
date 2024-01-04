import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiptService } from '../services/receipt.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @ViewChild('receiptContent', { static: false }) receiptContent: ElementRef;
  cards: any[] = []
  public pageSize = 5;
  public currentPage = 1;
  public totalPages: number;
  showReceipt: boolean = false

  constructor(private route: ActivatedRoute, private router: Router, private receiptService: ReceiptService, private renderer: Renderer2,
    private el: ElementRef) {
    this.totalPages = Math.ceil(this.cards.length / this.pageSize);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['customerId'];
      this.receiptService.getReceiptDataByCustomerId(id).subscribe({
        next: (data) => {
          this.cards = data;
          this.totalPages = Math.ceil(this.cards.length / this.pageSize);
        },
        error: (error) => {
          console.log(error);
        }
      })
    });
  }

  navigateToReview(paypalTransactionId: string) {
    this.router.navigate(['/Give-Review', paypalTransactionId]);
  }


  downloadReceiptAsPDF() {
    const DATA = this.receiptContent.nativeElement;
    const pdfFormat = 'a4';

    html2canvas(DATA, {
      useCORS: true,
      scale: 1
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
  openReceipt() {
    this.showReceipt = true
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }

  closeReceipt() {
    this.showReceipt = false
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
  }


  public get cardsForCurrentPage(): any[] {
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
