import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{AuthServiceConfig,AuthService,FacebookLoginProvider,GoogleLoginProvider,SocialLoginModule}from 'angularx-social-login';

import { ImageCropperModule } from 'ngx-image-cropper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { NguCarouselModule } from '@ngu/carousel';
// import 'hammerjs';

import { CustomerappModule } from './pages/customer/customerapp/customerapp.module';
import { LoginComponent } from './pages/customer/user management/login/login.component';
import { RegistrationComponent } from './pages/customer/user management/registration/registration.component';
import { SharedModule } from './shared/shared.module';
import { EmailverificationSuccessComponent } from './pages/customer/user management/emailverification-success/emailverification-success.component';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule, Button} from 'primeng/button';
import { LangShareService } from '../app/shared/services/lang-share.service';
import { registerLocaleData } from '../../node_modules/@angular/common';
import localeESUS from '@angular/common/locales/es-US';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MessageService} from 'primeng/api';

import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChangepasswordComponent } from './pages/customer/user management/changepassword/changepassword.component';
import { AdminModule } from './pages/admin/admin.module';
import { AdminComponent } from './pages/admin/admin.component';
import { ForgotpasswordComponent } from './pages/customer/user management/forgotpassword/forgotpassword.component';
import { MerchantregistrationComponent } from './pages/merchant/merchant management/merchantregistration/merchantregistration.component';

import{merchantModule}from './pages/merchant/merchant.module';
import{MerchantComponent}from './pages/merchant/merchant.component';
registerLocaleData(localeESUS);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('439293503290966')//891933834474064 377698026217789
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('1091728720979-hh89hje2fj3rvik4i94t1jl0jr3tqkis.apps.googleusercontent.com')
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    EmailverificationSuccessComponent,
    PageNotFoundComponent,
    AdminComponent,
    ForgotpasswordComponent,
    MerchantComponent,
    MerchantregistrationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CustomerappModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    SocialLoginModule,
    ImageCropperModule,
    DialogModule,
    ButtonModule,
    merchantModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
   
    //NguCarouselModule
  ],
  
  // providers: [AuthService,MessageService,
  //   {provide:AuthServiceConfig, useFactory:getAuthServiceConfigs},LangShareService,],

    providers: [AuthService,MessageService,
      {provide:AuthServiceConfig, useFactory:getAuthServiceConfigs},LangShareService,],

  bootstrap: [AppComponent]
})
export class AppModule { }
