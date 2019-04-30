import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    NavbarComponent
  ]
})
export class SharedModule { }
