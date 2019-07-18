import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/components/button/button';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/components/dialog/dialog';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {InputTextModule} from 'primeng/inputtext';
const COMMON_MODULES = [

  ButtonModule,
  DropdownModule,
  DialogModule,
  ToastModule,
  ProgressSpinnerModule,
  TableModule,
  InputTextModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    COMMON_MODULES
  ],
  exports: [COMMON_MODULES]
})
export class SharedModule { }
