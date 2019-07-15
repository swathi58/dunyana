import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CustomerappComponent } from './pages/customer/customerapp/customerapp.component';
import { EmailverificationSuccessComponent } from './pages/customer/user management/emailverification-success/emailverification-success.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const routes: Routes = [

  {
    path:"",
    component:CustomerappComponent
  },
  // {
  //   path:"emailverificationcompleted/:emailid",
  //   component:EmailverificationSuccessComponent
  // }
{
  path:"404",
  component:PageNotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
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