import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { map, catchError, debounceTime } from 'rxjs/operators';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }

  //register product
  addProduct(productData: any): Observable<any> {
    return this.http.post(this.baseUrl, productData);
  }

  // to fetch all products for a specific merchant
  getProductsByMerchantId(merchantId: string): Observable<any> {
    let params = new HttpParams().set('merchantId', merchantId);
    return this.http.get(`${this.baseUrl}/merchantId`, { params });
  }

  getProductByProductId(productId: string): Observable<any> {
    let params = new HttpParams().set('productId', productId);
    return this.http.get(`${this.baseUrl}/productId`, { params });
  }

  editProduct(productId: string, newName: string, newPrice: number, newDescription: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/editProduct/${productId}`, { newName, newPrice, newDescription });
  }



}
