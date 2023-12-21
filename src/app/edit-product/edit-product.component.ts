import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  product: any;
  editProductForm: FormGroup;
  showModal = false;
  showAlert = false;
  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.editProductForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
      productDescription: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['productId']; // Get ID from route parameters
      console.log('Retrieved product ID:', id);
      this.productService.getProductByProductId(id).subscribe({
        next: (data: any) => { // Replace 'any' with a more specific type if possible
          this.product = data;
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

  confirmUpdate() {
    this.route.params.subscribe(params => {

      const id = params['productId']; // Get ID from route parameters
      if (this.editProductForm.valid && id) {
        const formValue = this.editProductForm.value;
        this.productService.editProduct(
          id,
          formValue.productName,
          formValue.price,
          formValue.productDescription
        ).subscribe({
          next: response => console.log('Product updated:', response),
          error: error => console.error('Error updating product:', error)
        });
      }
    });

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
