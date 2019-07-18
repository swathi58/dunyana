import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguCarouselModule } from '@ngu/carousel';
import 'hammerjs';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { CustomerappRoutingModule } from './customerapp-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';

import { CustomerappComponent } from './customerapp.component';
import { CategoriessliderComponent } from './shared/categoriesslider/categoriesslider.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
registerLocaleData(localeESUS);
import { registerLocaleData } from '../../../../../node_modules/@angular/common';
import localeESUS from '@angular/common/locales/es-US';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/components/dialog/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { CustomerAccountComponent } from './account management/customer-account/customer-account.component';
import { ChangepasswordComponent } from '../user management/changepassword/changepassword.component';
import { ShopByCategoryComponent } from './customer category management/shop-by-category/shop-by-category.component';
import { OurStoryComponent } from './About/our-story/our-story.component';
import { HowDunyanaWorksComponent } from './About/how-dunyana-works/how-dunyana-works.component';
import { BecomeSellerComponent } from './About/become-seller/become-seller.component';
import { TermsConditionsComponent } from './About/terms-conditions/terms-conditions.component';
import { ContactUsComponent } from './About/contact-us/contact-us.component';
import { FAQComponent } from './About/faq/faq.component';
import { AboutDunyanaComponent } from './About/about-dunyana/about-dunyana.component';
import { PrivacyPolicyComponent } from './About/privacy-policy/privacy-policy.component';
import { OrderingPaymentComponent } from './order management/ordering-payment/ordering-payment.component';
import { ShippingComponent } from './order management/shipping/shipping.component';
import { ReturnsComponent } from './order management/returns/returns.component';
import { PressEnquiriesComponent } from './About/press-enquiries/press-enquiries.component';
import { PaymentMethodsComponent } from './Payment/payment-methods/payment-methods.component';
import { CustomerServiceComponent } from './About/customer-service/customer-service.component';
import { TrackYourPackageComponent } from './order management/track-your-package/track-your-package.component';
import { DealsPromotionsComponent } from './Deals Management/deals-promotions/deals-promotions.component';
import { CategoryComponent } from './customer category management/category/category.component';
import {CarouselModule} from 'primeng/carousel';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent,CustomerappComponent, CategoriessliderComponent, CustomerAccountComponent,ChangepasswordComponent, ShopByCategoryComponent, OurStoryComponent, HowDunyanaWorksComponent, BecomeSellerComponent, TermsConditionsComponent, ContactUsComponent, FAQComponent, AboutDunyanaComponent, PrivacyPolicyComponent, OrderingPaymentComponent, ShippingComponent, ReturnsComponent, PressEnquiriesComponent, PaymentMethodsComponent, CustomerServiceComponent, TrackYourPackageComponent, DealsPromotionsComponent, CategoryComponent],
  exports: [CustomerappComponent,HeaderComponent,FooterComponent,TermsConditionsComponent],
  imports: [
    CommonModule,
    CustomerappRoutingModule,

    CommonModule,
    CustomerappRoutingModule,
    NguCarouselModule,
    DialogModule,
    ToastModule,
    NgxUiLoaderModule,
    FormsModule,
    CarouselModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [MessageService]
})
export class CustomerappModule { }
