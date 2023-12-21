import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  merchantId = sessionStorage.getItem('merchantId');
  showModal = false;
  showAlert = false;
  constructor(private productService: ProductService) {
    this.productForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
      productDescription: new FormControl('', Validators.required)
    });
  }


  saveData() {
    if (this.productForm.valid) {
      const dataOfMerhcnat = {
        "merchantId": this.merchantId,
        "productName": this.productForm.value.productName,
        "category": this.productForm.value.category,
        "price": this.productForm.value.price,
        "productDescription": this.productForm.value.productDescription
      }
      console.log('Form Data:', this.productForm.value);
      console.log('With merchant ID:', dataOfMerhcnat);

      this.productService.addProduct(dataOfMerhcnat).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      console.error('Form is invalid:', this.productForm.errors);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openAlert() {
    this.showAlert = true;
  }

  closeAlert() {
    this.showAlert = false;
  }
}
