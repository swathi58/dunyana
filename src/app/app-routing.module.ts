import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CustomerappComponent } from './pages/customer/customerapp/customerapp.component';
import { EmailverificationSuccessComponent } from './pages/customer/user management/emailverification-success/emailverification-success.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomerappRoutingModule } from './pages/customer/customerapp/customerapp-routing.module';
import {} from './pages/customer/customerapp/customerapp.module';
import { LoginComponent } from './pages/customer/user management/login/login.component';
import { RegistrationComponent } from './pages/customer/user management/registration/registration.component';
import { ChangepasswordComponent } from './pages/customer/user management/changepassword/changepassword.component';



const routes: Routes = [

  {
    path:"",
    component:CustomerappComponent
    //loadChildren:'./pages/customer/customerapp/customerapp.module#CustomerappModule',
  },

//   {
//     path: 'customer',
//     loadChildren: 'app/admin/admin.module#AdminModule'
//  },
  // {
  //   path:"emailverificationcompleted/:emailid",
  //   component:EmailverificationSuccessComponent
  // }

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
  },
{
  path:"404",
  component:PageNotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true}),
    //RouterModule.forRoot(routes,{useHash:true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private router: Router) {

  this.router.errorHandler = (error: any) => {
		let routerError = error.toString();
            if (routerError.indexOf('Cannot match any routes') >= 0 ) {
                this.router.navigate(['/404']);
            } else {
                throw error;
            }
	 }
 }
}