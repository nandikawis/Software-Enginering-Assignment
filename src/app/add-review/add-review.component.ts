import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiptService } from '../services/receipt.service';
import { ReviewService } from '../services/review.service';
import { ProductService } from '../services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  rating: number = 0;
  selectedRating: number = 0;
  receipt: any;
  product: any;
  reviewForm: FormGroup;
  confirmReview: boolean = false;
  review: any;
  theId: string;
  showAlert: boolean = false;
  reviewTitle: string;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router, private receiptService: ReceiptService, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      rating: new FormControl(this.selectedRating, Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.route.params.subscribe(params => {
      const id = params['paypalTransactionId'];
      this.theId = id;
      console.log('Retrieved ID 1:', id);
      this.receiptService.getReceiptByPaypalTransactionId(id).subscribe({
        next: (data) => {
          this.receipt = data;
          this.productService.getProductByProductId(this.receipt.productId).subscribe({
            next: (res) => {
              this.product = res;
            },
            error: (err) => {
              console.log(err);
            }
          })
        },
        error: (error) => {
          console.log(error);
        }
      })
    });
  }

  setRating(value: number): void {
    this.rating = value;
    this.selectedRating = value;
  }

  setTitle(value: string): void {
    this.reviewTitle = value;
  }

  addReview() {

    this.review = {
      "rating": this.rating,
      "reviewDescription": this.reviewForm.value.description,
      "reviewTitle": this.reviewTitle
    }

    console.log("here is data: ", this.review)

    if (this.review) {
      this.reviewService.addReview(this.theId, this.review).subscribe({
        next: (res) => {
          console.log(res);
          this.receiptService.editReviewStatus(this.theId).subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (err) => {
              console.log(err);
            }
          })
          this.confirmReview = false;
          this.showAlert = true;
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }

  confirmation(): void {
    this.confirmReview = true;
  }

  cancel(): void {
    this.confirmReview = false;
  }

  closeAlert() {
    this.showAlert = false;
  }


}
