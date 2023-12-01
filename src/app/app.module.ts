import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MerchantPageComponent } from './merchant-page/merchant-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ManageMerchantComponent } from './manage-merchant/manage-merchant.component';
import { MerchantAccountComponent } from './merchant-account/merchant-account.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { AnalyticReportComponent } from './analytic-report/analytic-report.component';
import { MerchantReviewsComponent } from './merchant-reviews/merchant-reviews.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MerchantRegisterComponent } from './merchant-register/merchant-register.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PurchaseProductComponent } from './purchase-product/purchase-product.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { OfficerPageComponent } from './officer-page/officer-page.component';
import { OfficerManagementComponent } from './officer-management/officer-management.component';
import { ReviewMerchantRegistrationComponent } from './review-merchant-registration/review-merchant-registration.component';
import { DetailMerchantRegistrationComponent } from './detail-merchant-registration/detail-merchant-registration.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrderComponent } from './order/order.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { ApprovedMerchantComponent } from './approved-merchant/approved-merchant.component';
import { ApprovedDetailComponent } from './approved-detail/approved-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MerchantPageComponent,
    LandingPageComponent,
    ProductPageComponent,
    ManageMerchantComponent,
    MerchantAccountComponent,
    ProductManagerComponent,
    AnalyticReportComponent,
    MerchantReviewsComponent,
    MerchantRegisterComponent,
    ProductDetailComponent,
    PurchaseProductComponent,
    PaymentPageComponent,
    OfficerPageComponent,
    OfficerManagementComponent,
    ReviewMerchantRegistrationComponent,
    DetailMerchantRegistrationComponent,
    AddProductComponent,
    EditProductComponent,
    OrderComponent,
    AddReviewComponent,
    ApprovedMerchantComponent,
    ApprovedDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
