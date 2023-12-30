import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private BaseUrl = 'http://localhost:3000/receipts';
  constructor(private http: HttpClient) { }

  captureOrder(orderId: string, transactionDetails: any): Observable<any> {
    return this.http.post(`${this.BaseUrl}/order/capture/${orderId}`, { transactionDetails });
  }

  getReceiptDataByCustomerId(customerId: string): Observable<any> {
    let params = new HttpParams().set('customerId', customerId);
    return this.http.get(`${this.BaseUrl}/customerReceipt`, { params });
  }

  getReceiptByPaypalTransactionId(paypalTransactionId: string): Observable<any> {
    let params = new HttpParams().set('paypalTransactionId', paypalTransactionId);
    return this.http.get(`${this.BaseUrl}/paypalTransactionId`, { params });
  }

  getReceiptsByProductId(productId: string): Observable<any> {
    let params = new HttpParams().set('productId', productId);
    return this.http.get(`${this.BaseUrl}/productId`, { params });
  }


}
