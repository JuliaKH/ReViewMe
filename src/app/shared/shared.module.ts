import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [NavbarComponent, SliderComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    NavbarComponent,
    SliderComponent
  ]
})
export class SharedModule { }
