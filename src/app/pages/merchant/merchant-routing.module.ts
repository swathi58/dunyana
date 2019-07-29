import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchantComponent } from './merchant.component';
import{MerchantregistrationComponent}from './merchant management/merchantregistration/merchantregistration.component';

const routes: Routes = [
  {
    path:"merchant",
    component:MerchantComponent,
    children:[
      {
        path:"registration",
        component:MerchantregistrationComponent
      },
     
      
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule {

 }
