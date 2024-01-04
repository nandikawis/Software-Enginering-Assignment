import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private BaseUrl = 'http://localhost:3000/reviews'
  constructor(private http: HttpClient) { }

  addReview(paypalTransactionId: string, reviewDetails: any): Observable<any> {
    return this.http.post(`${this.BaseUrl}/review/${paypalTransactionId}`, { reviewDetails });
  }

  getReviewsByProductId(productId: string): Observable<any> {
    return this.http.get(`${this.BaseUrl}/review/${productId}`);
  }

  getReviewsByMerchantId(merchantId: string): Observable<any> {
    return this.http.get(`${this.BaseUrl}/reviewOfMerchant/${merchantId}`);
  }

}
