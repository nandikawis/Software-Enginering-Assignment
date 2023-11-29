import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MerchantPageComponent } from './merchant-page/merchant-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { MerchantRegisterComponent } from './merchant-register/merchant-register.component';
import { ManageMerchantComponent } from './manage-merchant/manage-merchant.component';
import { MerchantAccountComponent } from './merchant-account/merchant-account.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PurchaseProductComponent } from './purchase-product/purchase-product.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { MerchantReviewsComponent } from './merchant-reviews/merchant-reviews.component';
import { AnalyticReportComponent } from './analytic-report/analytic-report.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MerchantPageComponent,
    LandingPageComponent,
    ProductPageComponent,
    MerchantRegisterComponent,
    ManageMerchantComponent,
    MerchantAccountComponent,
    ProductManagerComponent,
    AddProductComponent,
    EditProductComponent,
    ProductDetailComponent,
    PurchaseProductComponent,
    PaymentPageComponent,
    MerchantReviewsComponent,
    AnalyticReportComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
