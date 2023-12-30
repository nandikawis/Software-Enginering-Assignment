import { Component } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-merchant-register',
  templateUrl: './merchant-register.component.html',
  styleUrls: ['./merchant-register.component.css']
})
export class MerchantRegisterComponent {
  merchantForm: FormGroup;
  showModal = false;
  selectedFile: File | null = null;
  selectedFileName: string;
  filename = '5.png';
  fileData: ArrayBuffer | null = null;
  imageData: string | ArrayBuffer | null = null;
  theId: string;



  constructor(private merchantService: MerchantService) {
    this.merchantForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.merchantService.validateEmailNotTaken()],
        updateOn: 'blur'
      }),
      companyDescription: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
      fileDescription: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    const filename = '5.png'; // Replace with the actual filename
    this.merchantService.downloadFile(filename).subscribe(
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
  }

  downloadFile(): void {
    this.merchantService.downloadFile(this.filename).subscribe(
      (blob) => {
        console.log("file is found")

        const url = window.URL.createObjectURL(blob);

        // Create an anchor element
        const a = document.createElement('a');
        a.href = url;
        a.download = this.filename;

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




  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.merchantForm.patchValue({
      file: file,
    });
    this.selectedFileName = file.name; // Update the selected file name
  }

  onSubmit() {
    console.log('Form data being sent:', this.merchantForm.value);

    if (this.merchantForm.get('file')?.value) {
      this.merchantService.uploadFile(this.merchantForm.get('file')?.value).subscribe(
        response => {
          console.log("Success sending file", response);
          console.log("this is the file name:", response.fileId);

          const merchantData = {
            "name": this.merchantForm.value.name,
            "contactNumber": this.merchantForm.value.contactNumber,
            "email": this.merchantForm.value.email,
            "companyDescription": this.merchantForm.value.companyDescription,
            "documentId": response.fileId,
            "fileDescription": this.merchantForm.value.fileDescription,
            "fileName": response.fileName
          }

          if (this.merchantForm.valid) {
            this.merchantService.registerMerchant(merchantData).subscribe({
              next: (res) => {
                console.log('Merchant registered:', res);
                this.merchantForm.reset();
                this.selectedFile = null;
              },
              error: (err) => {
                console.error('Error during registration:', err);
              }
            });
          } else {
            console.error('Form is invalid:', this.merchantForm.errors);
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

}