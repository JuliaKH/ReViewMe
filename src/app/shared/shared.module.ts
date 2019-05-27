import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SliderComponent } from './slider/slider.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {PostListComponent} from '../posts/post-list/post-list.component';
import {PostDetailComponent} from '../posts/post-detail/post-detail.component';
import {PostDashboardComponent} from '../posts/post-dashboard/post-dashboard.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: 'blog', component: PostListComponent},
  { path: 'blog/:id', component: PostDetailComponent, data: {breadcrumb: 'details'}, },
  { path: 'dashboard', component: PostDashboardComponent, data: {breadcrumb: 'dashboard'}, }
];

@NgModule({
  declarations: [NavbarComponent, SliderComponent, BreadcrumbComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence()
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    NavbarComponent,
    SliderComponent,
    BreadcrumbComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
