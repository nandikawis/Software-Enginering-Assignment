import { Component } from '@angular/core';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  rating: number = 0;
  selectedRating: number = 0;

  setRating(value: number): void {
    this.rating = value;
    this.selectedRating = value;
  }
}
