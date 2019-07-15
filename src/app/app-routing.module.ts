import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerappComponent } from './pages/customer/customerapp/customerapp.component';
import { EmailverificationSuccessComponent } from './pages/customer/user management/emailverification-success/emailverification-success.component';


const routes: Routes = [

  {
    path:"",
    component:CustomerappComponent
  },
  // {
  //   path:"emailverificationcompleted/:emailid",
  //   component:EmailverificationSuccessComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
