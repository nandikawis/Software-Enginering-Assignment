import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { MerchantPageComponent } from './merchant-page/merchant-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to '/home'
  {
    path: 'home', component: HomePageComponent, children: [
      { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
      { path: '', component: LandingPageComponent },
      { path: 'Product', component: ProductPageComponent },
      { path: 'Merchants', component: MerchantPageComponent }
    ]
  }, // HomePage route
  // Add more routes here as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
