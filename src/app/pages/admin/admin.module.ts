import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CategoryListComponent } from './category management/category-list/category-list.component';
import { CategoryDetailsComponent } from './category management/category-details/category-details.component';

import {DropdownModule} from 'primeng/dropdown';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from '../customer/customerapp/shared/header/header.component';
import { AddCategoriesComponent } from './category management/add-categories/add-categories.component';
import {DialogModule} from 'primeng/components/dialog/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddBannersComponent } from './banner management/add-banners/add-banners.component';
import { BannersDetialsComponent } from './banner management/banners-detials/banners-detials.component';
import { BannersListComponent } from './banner management/banners-list/banners-list.component';
import {CalendarModule} from 'primeng/calendar';

import { SharedModule } from 'src/app/shared/shared.module';
import { ImageUploadComponent } from './image-upload/image-upload.component';


@NgModule({
  declarations: [CategoryListComponent, CategoryDetailsComponent, AddCategoriesComponent,AddBannersComponent, BannersDetialsComponent, BannersListComponent, ImageUploadComponent],
  exports:[ImageUploadComponent],

  imports: [
    CommonModule,
    TableModule,
    AdminRoutingModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DropdownModule,
    ProgressSpinnerModule,

    RadioButtonModule,
    FileUploadModule,
    CalendarModule

  ],
})
export class AdminModule { }
