import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private baseUrl = 'http://localhost:3000/merchants'; // Adjust based on your server

  constructor(private http: HttpClient) { }

  registerMerchant(merchantData: any): Observable<any> {
    return this.http.post(this.baseUrl, merchantData);
  }
}