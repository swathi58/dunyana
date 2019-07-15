import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/components/button/button';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
const COMMON_MODULES = [

  ButtonModule,
  DropdownModule,
  DialogModule,
  ToastModule,
  ProgressSpinnerModule
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
