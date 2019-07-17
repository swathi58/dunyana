import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../user management/login/login.component';
import { RegistrationComponent } from '../user management/registration/registration.component';
import { CustomerappComponent } from './customerapp.component';
import { EmailverificationSuccessComponent } from '../user management/emailverification-success/emailverification-success.component';
import { ChangepasswordComponent } from '../user management/changepassword/changepassword.component';
import { CategoryListComponent } from './Category Management/category-list/category-list.component';
import { CustomerAccountComponent } from './account management/customer-account/customer-account.component';


const routes: Routes = [
{
  path:"customer",
  component:CustomerappComponent,
  children:[
    {
      path:"home",
      component:HomeComponent
    },
    {
      path:"test",
      component:CategoryListComponent
    },
    {
      path:"customeraccount",
      component:CustomerAccountComponent

    }
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
    path:"emailverificationcompleted/:emailid",
    component:EmailverificationSuccessComponent
  },
  {
    path:"changepassword",
    component:ChangepasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CustomerappRoutingModule { }
