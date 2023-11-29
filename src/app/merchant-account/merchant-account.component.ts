import { Component } from '@angular/core';

@Component({
  selector: 'app-merchant-account',
  templateUrl: './merchant-account.component.html',
  styleUrls: ['./merchant-account.component.css']
})
export class MerchantAccountComponent {
  public email: string = 'example@email.com';
  public password: string = 'Password123';
  public showPassword: boolean = false;

  constructor() { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
