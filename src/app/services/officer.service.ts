import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  private baseUrl = 'http://localhost:3000/officer';
  constructor(private http: HttpClient) { }

  loginOfficer(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }


}
