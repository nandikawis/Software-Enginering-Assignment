import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl = 'http://localhost:3000/purchases';
  constructor(private http: HttpClient) { }
  addPurchase(purchaseData: any): Observable<any> {
    return this.http.post(this.baseUrl, purchaseData);
  }

  getPurchaseDataByOrderId(orderId: string): Observable<any> {
    let params = new HttpParams().set('orderId', orderId);
    return this.http.get(`${this.baseUrl}/orderId`, { params });
  }
}
