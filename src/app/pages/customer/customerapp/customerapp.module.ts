import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguCarouselModule } from '@ngu/carousel';
import 'hammerjs';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';
import { NgxUiLoaderModule } from  'ngx-ui-loader';

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

import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { CategoryListComponent } from './Category Management/category-list/category-list.component';
import { CategoryDetailsComponent } from './Category Management/category-details/category-details.component';
import { CustomerAccountComponent } from './account management/customer-account/customer-account.component';
import { ChangepasswordComponent } from '../user management/changepassword/changepassword.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent,CustomerappComponent, CategoriessliderComponent,
     CategoryListComponent, CategoryDetailsComponent, CustomerAccountComponent,ChangepasswordComponent],
  exports: [CustomerappComponent],
  imports: [
    CommonModule,
    CustomerappRoutingModule,
    NguCarouselModule,
    DialogModule,
    ToastModule,
    NgxUiLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers:[MessageService]
})
export class CustomerappModule { }
