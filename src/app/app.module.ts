import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirestoreSettingsToken} from '@angular/fire/firestore';

import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/posts.module';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutComponent } from './about/about.component';
import { About1Component } from './about1/about1.component';


const routes: Routes = [
  {path: '', redirectTo: '/blog', pathMatch: 'full'},
  {path: '', loadChildren: './posts/posts.module#PostsModule', pathMatch: 'full'},
  {path: 'about', component: AboutComponent, data: {breadcrumb: 'Julia Khalina'}, },
  {path: 'about1', component: About1Component, data: {breadcrumb: 'Grygoriy Shvydkyi'}, },
  {path: 'contacts', component: ContactsComponent, data: {breadcrumb: 'Контакты'}, },
];



@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    AboutComponent,
    About1Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    CoreModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    PostsModule,
  ],
  providers: [{provide: FirestoreSettingsToken, useValue: {}}],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
