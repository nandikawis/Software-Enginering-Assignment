import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkInitialLogin());

  constructor() { }

  private checkInitialLogin(): boolean {
    // Check if the token exists in sessionStorage
    return !!sessionStorage.getItem('token');
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public getUserType(): string | null {
    return sessionStorage.getItem('userType');
  }

  public loginCustomer(token: string, customerId: string, email: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('customerId', customerId);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('userType', 'customer');
    this.loggedIn.next(true);
  }

  public loginMerchant(token: string, merchantId: string, email: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('merchantId', merchantId);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('userType', 'merchant');
    this.loggedIn.next(true);
  }

  public loginOfficer(token: string, username: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('userType', 'officer');
    this.loggedIn.next(true);
  }

  public logoutCustomer() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('customerId');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userType');
    this.loggedIn.next(false);
  }

  public logoutMerchant() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('merchantId');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userType');
    this.loggedIn.next(false);
  }

  public logoutOfficer() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userType');
    this.loggedIn.next(false);
  }



}
