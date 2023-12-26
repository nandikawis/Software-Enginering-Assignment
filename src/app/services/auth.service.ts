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

  public login(token: string, customerId: string, email: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('customerId', customerId);
    sessionStorage.setItem('email', email);
    this.loggedIn.next(true);
  }

  public logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('customerId');
    sessionStorage.removeItem('email');
    this.loggedIn.next(false);
  }
}
