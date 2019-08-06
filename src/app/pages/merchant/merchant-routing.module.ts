import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchantComponent } from './merchant.component';
import{MerchantregistrationComponent}from './merchant management/merchantregistration/merchantregistration.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:"merchant",
    component:MerchantComponent,
    children:[
      {
        path:"home",
        component:HomeComponent
      },
     
      
    ]
  },
  {
    path:"merchants/registration",
    component:MerchantregistrationComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule {

 }
