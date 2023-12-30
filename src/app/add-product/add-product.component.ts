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
  selectedFile: File | null = null;
  selectedFileName: string;
  constructor(private productService: ProductService) {
    this.productForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
      productDescription: new FormControl('', Validators.required),
      file: new FormControl('', [Validators.required])
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.productForm.patchValue({
      file: file,
    });
    this.selectedFileName = file.name; // Update the selected file name
  }


  saveData() {
    if (this.productForm.get('file')?.value) {
      this.productService.uploadFile(this.productForm.get('file')?.value).subscribe(
        response => {
          console.log("Success sending file", response);
          console.log("this is the file name:", response.fileId);

          const productData = {
            "merchantId": this.merchantId,
            "productName": this.productForm.value.productName,
            "category": this.productForm.value.category,
            "price": this.productForm.value.price,
            "productDescription": this.productForm.value.productDescription,
            "imageId": response.fileId,
            "fileName": response.fileName
          }

          if (this.productForm.valid) {
            this.productService.addProduct(productData).subscribe({
              next: (res) => {
                console.log('Merchant registered:', res);
                this.productForm.reset();
                this.selectedFile = null;
              },
              error: (err) => {
                console.error('Error during registration:', err);
              }
            });
          } else {
            console.error('Form is invalid:', this.productForm.errors);
          }
        }
        ,

        error => {
          console.error(error); // Handle errors
        }
      );
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
