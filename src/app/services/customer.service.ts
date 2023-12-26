import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { map, catchError, debounceTime } from 'rxjs/operators';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:3000/customers';
  constructor(private http: HttpClient) { }

  registerCustomer(customerData: any): Observable<any> {
    return this.http.post(this.baseUrl, customerData);
  }

  loginCustomer(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  getCustomerByEmail(email: string): Observable<any> {
    let params = new HttpParams().set('email', email);
    return this.http.get(`${this.baseUrl}/email`, { params });
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

  validatePassword(password: string, confirmPassword: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null); // If no value is present, don't make a backend call
      }
      console.log('Password:', password);
      if (confirmPassword !== password) {
        return of({ 'passwordNotMatch': true });
      }
      return of({ 'passwordNotMatch': false });
    };
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

}
