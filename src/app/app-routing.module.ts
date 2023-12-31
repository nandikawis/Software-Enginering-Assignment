import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
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
import { RegistercustomerComponent } from './registercustomer/registercustomer.component';
import { customerAuthGuard } from './guards/customer-auth.guard';
import { officerAuthGuard } from './guards/officer-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '', redirectTo: 'landing-page', pathMatch: 'full' },  // Redirect to landing-page by default
      { path: 'landing-page', component: LandingPageComponent },
      { path: 'Sign-Up', component: RegistercustomerComponent },
      { path: 'Merchants', component: MerchantPageComponent },
      { path: 'Register', component: MerchantRegisterComponent },
      { path: 'Order/:customerId', component: OrderComponent },
      { path: 'Give-Review/:paypalTransactionId', component: AddReviewComponent },
      { path: 'Product', component: ProductPageComponent },
      { path: 'Details/:productId', component: ProductDetailComponent },
      { path: 'Purchase/:productId', component: PurchaseProductComponent, canActivate: [customerAuthGuard] },
      { path: 'Payment/:orderId', component: PaymentPageComponent, canActivate: [customerAuthGuard] },

      {
        path: '', component: ManageMerchantComponent,
        canActivate: [authGuard],
        children: [
          { path: 'Management', redirectTo: 'Account', pathMatch: 'full' },
          { path: 'Account', component: MerchantAccountComponent },
          { path: 'Product-Manage', component: ProductManagerComponent },
          { path: 'Reviews', component: MerchantReviewsComponent },
          { path: 'Analytic-Report/:merchantId', component: AnalyticReportComponent },
          { path: 'Add-Product', component: AddProductComponent },
          { path: 'Edit-Product/:productId', component: EditProductComponent }
        ]
      },
      {
        path: 'Officer',
        canActivate: [officerAuthGuard],
        component: OfficerPageComponent,
        children: [
          { path: '', redirectTo: 'Officer-Management', pathMatch: 'full' },
          { path: 'Officer-Management', component: OfficerManagementComponent },
          { path: 'Review-Merchant', component: ReviewMerchantRegistrationComponent },
          { path: 'Detail-Merchant/:id', component: DetailMerchantRegistrationComponent },
          { path: 'Approved-Merchant', component: ApprovedMerchantComponent },
          { path: 'Approved-Detail/:merchantId', component: ApprovedDetailComponent },
          { path: 'Merchant-Report/:merchantId', component: AnalyticReportComponent },

        ]
      }
    ]
  },
];

const routerOption: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOption)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
