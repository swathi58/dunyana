import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CategoryListComponent } from './category management/category-list/category-list.component';
import { CategoryDetailsComponent } from './category management/category-details/category-details.component';
import { SharedModule } from 'primeng/components/common/shared';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import {TableModule} from 'primeng/table';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from '../customer/customerapp/shared/header/header.component';
import { AddCategoriesComponent } from './category management/add-categories/add-categories.component';
import {DialogModule} from 'primeng/components/dialog/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OurStoryComponent } from './About/our-story/our-story.component';
import { DunyanaWorkingProcessComponent } from './About/dunyana-working-process/dunyana-working-process.component';
import { BecomeSellerComponent } from './About/become-seller/become-seller.component';
@NgModule({
  declarations: [CategoryListComponent, CategoryDetailsComponent, AddCategoriesComponent, OurStoryComponent, DunyanaWorkingProcessComponent, BecomeSellerComponent],
  imports: [
    CommonModule,
    TableModule,
    AdminRoutingModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DropdownModule,
    ProgressSpinnerModule
  ],
})
export class AdminModule { }
