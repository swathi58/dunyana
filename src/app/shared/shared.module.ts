import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/components/button/button';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
const COMMON_MODULES = [

  ButtonModule,
  DropdownModule,
  DialogModule
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
