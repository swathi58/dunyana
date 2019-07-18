import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category management/category-list/category-list.component';
import { AdminComponent } from './admin.component';
import { OurStoryComponent } from './About/our-story/our-story.component';
import { DunyanaWorkingProcessComponent } from './About/dunyana-working-process/dunyana-working-process.component';
import { BecomeSellerComponent } from './About/become-seller/become-seller.component';

const routes: Routes = [
  {
    path:"admin",
    component:AdminComponent,
    children:[
      {
        path:"categorylist",
        component:CategoryListComponent
      },
      {
        path:"our-story",
        component:OurStoryComponent
      },
      {
        path:"how-dunyana-works",
        component:DunyanaWorkingProcessComponent
      },
      {
        path:"become-a-seller",
        component:BecomeSellerComponent
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
