import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { MerchantPageComponent } from './merchant-page/merchant-page.component';
import { ManageMerchantComponent } from './manage-merchant/manage-merchant.component';
import { MerchantAccountComponent } from './merchant-account/merchant-account.component';
import { MerchantRegisterComponent } from './merchant-register/merchant-register.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PurchaseProductComponent } from './purchase-product/purchase-product.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { MerchantReviewsComponent } from './merchant-reviews/merchant-reviews.component';
import { OfficerPageComponent } from './officer-page/officer-page.component';
import { OfficerManagementComponent } from './officer-management/officer-management.component';
import { ReviewMerchantRegistrationComponent } from './review-merchant-registration/review-merchant-registration.component';
import { DetailMerchantRegistrationComponent } from './detail-merchant-registration/detail-merchant-registration.component';
import { AnalyticReportComponent } from './analytic-report/analytic-report.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrderComponent } from './order/order.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { ApprovedMerchantComponent } from './approved-merchant/approved-merchant.component';
import { ApprovedDetailComponent } from './approved-detail/approved-detail.component';
import { authGuard } from './auth.guard';

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
      { path: 'Details', component: ProductDetailComponent },
      { path: 'Purchase', component: PurchaseProductComponent },
      { path: 'Payment', component: PaymentPageComponent },
      { path: 'Order', component: OrderComponent },
      { path: 'Give-Review', component: AddReviewComponent },

      {
        path: '', component: ManageMerchantComponent,
        canActivate: [authGuard],
        children: [
          { path: 'Management', redirectTo: 'Account', pathMatch: 'full' },
          { path: 'Account', component: MerchantAccountComponent },
          { path: 'Product-Manage', component: ProductManagerComponent },
          { path: 'Reviews', component: MerchantReviewsComponent },
          { path: 'Report', component: AnalyticReportComponent },
          { path: 'Add-Product', component: AddProductComponent },
          { path: 'Edit-Product/:productId', component: EditProductComponent }
        ]
      },
      {
        path: 'Officer',
        component: OfficerPageComponent,
        children: [
          { path: '', redirectTo: 'Officer-Management', pathMatch: 'full' },
          { path: 'Officer-Management', component: OfficerManagementComponent },
          { path: 'Review-Merchant', component: ReviewMerchantRegistrationComponent },
          { path: 'Detail-Merchant/:id', component: DetailMerchantRegistrationComponent },
          { path: 'Approved-Merchant', component: ApprovedMerchantComponent },
          { path: 'Approved-Detail', component: ApprovedDetailComponent },
          { path: 'Report', component: AnalyticReportComponent },
          { path: 'Reviews', component: MerchantReviewsComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
