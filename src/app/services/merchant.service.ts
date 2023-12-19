import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { map, catchError, debounceTime } from 'rxjs/operators';
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

  getMerchantByEmail(email: string): Observable<any> {
    let params = new HttpParams().set('email', email);
    return this.http.get(`${this.baseUrl}/email`, { params });
  }

  getMerhcantByMerchantId(merchantId: string): Observable<any> {
    let params = new HttpParams().set('merchantId', merchantId);
    return this.http.get(`${this.baseUrl}/merchantId`, { params });
  }

  approveMerchant(_id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/approve`, { _id });
  }

  changeMerchantPassword(email: string, newpassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/changePassword`, { email, newpassword });
  }


  validatePassword(oldPassword: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null); // If no value is present, don't make a backend call
      }

      return this.http.get<{ passwordMatch: boolean }>(`${this.baseUrl}/check-oldpassword`, { params: { newpassword: control.value, oldpassword: oldPassword } })
        .pipe(
          debounceTime(500), // Add debounce time to prevent too many requests
          map(response => {
            return response.passwordMatch ? { 'passwordNotMatch': true } : null;
          }),
          catchError(() => of(null)) // In case of an error, return null (consider handling this differently)
        );
    };
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

