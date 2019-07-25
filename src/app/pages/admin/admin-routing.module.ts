import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category management/category-list/category-list.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path:"admin",
    component:AdminComponent,
    children:[
      {
        path:"categorylist",
        component:CategoryListComponent,
        
      },
      
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

 }
