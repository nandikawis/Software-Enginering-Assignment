import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private baseUrl = 'http://localhost:3000/merchants'; // Adjust based on your server

  constructor(private http: HttpClient) { }

  registerMerchant(merchantData: any): Observable<any> {
    return this.http.post(this.baseUrl, merchantData);
  }

  displayMerchants(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getMerchantById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  approveMerchant(_id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/approve`, { _id });
  }



  validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.http.get<{ emailAvailable: boolean }>(
        `${this.baseUrl}/check-email`,
        { params: { email: control.value } }
      ).pipe(
        map(response => {
          return !response.emailAvailable ? { 'emailTaken': true } : null;
        }),
        catchError(() => of(null))
      );
    };
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }


}

