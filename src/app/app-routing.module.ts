import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MerchantPageComponent } from './merchant-page/merchant-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/merchant', pathMatch: 'full' }, // Redirect empty path to '/home'
  { path: 'merchant', component: MerchantPageComponent }, // HomePage route
  // Add more routes here as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
