import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { MerchantPageComponent } from './merchant-page/merchant-page.component';
import { MerchantRegisterComponent } from './merchant-register/merchant-register.component';
import { ManageMerchantComponent } from './manage-merchant/manage-merchant.component';
import { MerchantAccountComponent } from './merchant-account/merchant-account.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '', redirectTo: 'landing-page', pathMatch: 'full' },  // Redirect to landing-page by default
      { path: 'landing-page', component: LandingPageComponent },
      { path: 'Product', component: ProductPageComponent },
      { path: 'Merchants', component: MerchantPageComponent },
      { path: 'Register', component: MerchantRegisterComponent },

      {
        path: '', component: ManageMerchantComponent, children: [
          { path: 'Management', redirectTo: 'Account', pathMatch: 'full' },
          { path: 'Account', component: MerchantAccountComponent },
          { path: 'Product-Manage', component: ProductManagerComponent },
          { path: 'Add-Product', component: AddProductComponent },
          { path: 'Edit-Product', component: EditProductComponent }
        ]
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
