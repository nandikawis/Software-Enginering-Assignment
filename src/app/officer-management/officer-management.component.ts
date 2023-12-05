import { Component } from '@angular/core';

@Component({
  selector: 'app-officer-management',
  templateUrl: './officer-management.component.html',
  styleUrls: ['./officer-management.component.css']
})
export class OfficerManagementComponent {
  public email: string = 'example@email.com';
  public password: string = 'Password123';
  public showPassword: boolean = false;

  constructor() { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
