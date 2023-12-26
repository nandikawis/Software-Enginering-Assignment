import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  cards: any[] = []
  loggedIn: boolean = true;

  loginForm: FormGroup;
  customer: any;


  public pageSize = 5;
  public currentPage = 1;
  public totalPages: number;

  constructor(private productService: ProductService, private router: Router,
    private renderer: Renderer2,
    private el: ElementRef, private customerService: CustomerService) {
    this.totalPages = Math.ceil(this.cards.length / this.pageSize);
  }

  fetchCategory(category: string) {
    this.productService.getProductByCategory(category).subscribe({
      next: (data: any) => {
        this.cards = data;
        this.totalPages = Math.ceil(this.cards.length / this.pageSize);
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      },
      complete: () => {
        // Optional: Any cleanup or final actions when the Observable completes
      }
    });
  }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.cards = data;
        this.totalPages = Math.ceil(this.cards.length / this.pageSize);
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      },
      complete: () => {
        // Optional: Any cleanup or final actions when the Observable completes
      }
    });
  }

  checkLoggedIn(productId: string) {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.loggedIn = true;
      if (!productId) {
        console.error('Product ID is undefined or null');
        return;
      }
      this.router.navigate(['/Details', productId]);
    }
    else {
      this.loggedIn = false;
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.customerService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            this.customerService.getCustomerByEmail(this.loginForm.value.email).subscribe({
              next: (data: any) => {
                this.customer = data;
                sessionStorage.setItem('customerId', this.customer.customerId);
                sessionStorage.setItem('email', this.loginForm.value.email);
                sessionStorage.setItem('token', response.token);
                const a = sessionStorage.getItem('customerId');
                console.log('Retrive customer ID', a);
                this.router.navigate(['/Product']);
                if (response.token) {
                  this.loggedIn = true;
                }
              },
              error: (error: any) => {
                console.error('Error fetching merchant:', error);
              }
            })
            const a = sessionStorage.getItem('customerId');
            console.log('Retrive Customer ID', a);
            this.router.navigate(['/landing-page']); // Navigate to the protected route
          },
          error: (error) => {
            console.error('Login failed', error);
            // Handle login error (show message to user)
          }
        });
    }
  }

  closeModalToRegister() {
    this.loggedIn = false;
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');
    this.router.navigate(['/Sign-Up']);
  }

  navigateToDetail(productId: string): void {
    if (!productId) {
      console.error('Product ID is undefined or null');
      return;
    }
    this.router.navigate(['/Details', productId]);
  }

  public get cardsForCurrentPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.cards.slice(startIndex, startIndex + this.pageSize);
  }

  public goToPage(page: number): void {
    this.currentPage = page;
  }

  public goToNext(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  public goToPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }



  closeModal() {
    this.loggedIn = true;
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'overflow-hidden');

  }



}
