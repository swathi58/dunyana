import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DropdownModule} from 'primeng/dropdown';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from '../customer/customerapp/shared/header/header.component';
import {DialogModule} from 'primeng/components/dialog/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DropdownModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    FileUploadModule,
    CalendarModule,
  ],
})
export class merchantModule { }
