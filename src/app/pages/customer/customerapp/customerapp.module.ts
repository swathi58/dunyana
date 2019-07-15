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

import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent,CustomerappComponent, CategoriessliderComponent],
  exports: [CustomerappComponent],
  imports: [
    CommonModule,
    CustomerappRoutingModule,
    NguCarouselModule,
    ToastModule,
    NgxUiLoaderModule,
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
