import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerappComponent } from './pages/customer/customerapp/customerapp.component';


const routes: Routes = [

  {
    path:"",
    component:CustomerappComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
