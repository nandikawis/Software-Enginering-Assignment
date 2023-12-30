import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { PurchaseService } from '../services/purchase.service';

@Component({
  selector: 'app-purchase-product',
  templateUrl: './purchase-product.component.html',
  styleUrls: ['./purchase-product.component.css']
})
export class PurchaseProductComponent implements OnInit {
  purchaseForm: FormGroup;
  product: any;
  showModal = false;
  purchaseData: any;
  orderId: any;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private productService: ProductService, private router: Router, private purchaseService: PurchaseService) {
    this.purchaseForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      specialRequest: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['productId'];
      this.productService.getProductByProductId(id).subscribe({
        next: (data: any) => {
          this.product = data;
        },
        error: (error: any) => {
          console.error('Error fetching merchant:', error);
        },
        complete: () => {
        }
      });
    });
  }

  confirmPurchase() {
    if (this.purchaseForm.valid) {
      const customerId = sessionStorage.getItem('customerId');
      console.log(customerId);
      const purchaseData = {
        "productId": this.product.productId,
        "customerId": customerId,
        "merchantId": this.product.merchantId,
        "fullName": this.purchaseForm.value.fullName,
        "productName": this.product.productName,
        "contactNumber": this.purchaseForm.value.contactNumber,
        "specialRequest": this.purchaseForm.value.specialRequest,
        "price": this.product.price,
        "email": this.purchaseForm.value.emailAddress,
      }
      console.log('Form Data:', this.purchaseForm.value);
      this.purchaseService.addPurchase(purchaseData).subscribe({
        next: (res) => {
          this.purchaseData = res;

          this.router.navigate(['/Payment', this.purchaseData.orderId]);
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  navigateToPayment(Id: string) {
    let orderId;
    if (orderId) {
      this.purchaseService.getPurchaseDataByOrderId(Id).subscribe({
        next: (res) => {
          console.log(res);
          orderId = res.orderId;
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    this.router.navigate(['/Payment', orderId]);
  }

  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }

}
