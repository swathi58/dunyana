import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../user management/login/login.component';
import { RegistrationComponent } from '../user management/registration/registration.component';
import { CustomerappComponent } from './customerapp.component';
import { EmailverificationSuccessComponent } from '../user management/emailverification-success/emailverification-success.component';
import { ChangepasswordComponent } from '../user management/changepassword/changepassword.component';
import { CustomerAccountComponent } from './account management/customer-account/customer-account.component';
import { ShopByCategoryComponent } from './customer category management/shop-by-category/shop-by-category.component';
import { AboutDunyanaComponent } from './About/about-dunyana/about-dunyana.component';
import { BecomeSellerComponent } from './About/become-seller/become-seller.component';
import { ContactUsComponent } from './About/contact-us/contact-us.component';
import { FAQComponent } from './About/faq/faq.component';
import { HowDunyanaWorksComponent } from './About/how-dunyana-works/how-dunyana-works.component';
import { OurStoryComponent } from './About/our-story/our-story.component';
import { PrivacyPolicyComponent } from './About/privacy-policy/privacy-policy.component';
import { OrderingPaymentComponent } from './order management/ordering-payment/ordering-payment.component';
import { ShippingComponent } from './order management/shipping/shipping.component';
import { ReturnsComponent } from './order management/returns/returns.component';
import { PressEnquiriesComponent } from './About/press-enquiries/press-enquiries.component';
import { DealsPromotionsComponent } from './Deals Management/deals-promotions/deals-promotions.component';
import { TrackYourPackageComponent } from './order management/track-your-package/track-your-package.component';
import { PaymentMethodsComponent } from './Payment/payment-methods/payment-methods.component';
import { CustomerServiceComponent } from './About/customer-service/customer-service.component';
import { CategoryComponent } from './customer category management/category/category.component';
import { ShoppingComponent } from './shopping/shopping.component';


const routes: Routes = [
{
  path:"customer",
  component:CustomerappComponent,
  children:[
    {
      path:"home",
      component:HomeComponent
    },
    // {
    //   path:"test",
    //   component:CategoryListComponent
    // },
    {
      path:"customeraccount",
      component:CustomerAccountComponent
    },
    {
      path:"shop-by-category",
      component:ShopByCategoryComponent
    },
    {
      path:"about-dunyana",
      component:AboutDunyanaComponent
    },
    {
      path:"become-seller",
      component:BecomeSellerComponent
    },
    {
      path:"contact-us",
      component:ContactUsComponent
    },
    {
      path:"faq",
      component:FAQComponent
    },
    {
      path:"how-dunyana-works",
      component:HowDunyanaWorksComponent
    },
    {
      path:"our-story",
      component:OurStoryComponent
    },
    {
      path:"privacy-policy",
      component:PrivacyPolicyComponent
    },
    {
      path:"orders-payment",
      component:OrderingPaymentComponent
    },
    {
      path:"shipping",
      component:ShippingComponent
    },
    {
      path:"Returns",
      component:ReturnsComponent
    },
    {
      path:"deals-promotions",
      component:DealsPromotionsComponent
    },
    {
      path:"track-your-package",
      component:TrackYourPackageComponent
    },
    {
      path:"payment-methods",
      component:PaymentMethodsComponent
    },
    {
      path:"customer-service",
      component:CustomerServiceComponent
    },
    {
      path:"press-enquiries",
      component:PressEnquiriesComponent
    },
    {
      path:"category/:catname",
      component:CategoryComponent
    },

  ]
},
 
  {
    path:"signin",
    component:LoginComponent
  },
  {
    path:"signup",
    component:RegistrationComponent
  },
  {
    path:"emailverify/:emailid",
    component:EmailverificationSuccessComponent
  },
  {
    path:"changepassword",
    component:ChangepasswordComponent
  },
  {
    path:"shopping",
    component:ShoppingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CustomerappRoutingModule { }
