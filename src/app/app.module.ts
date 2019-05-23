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


const routes: Routes = [
  {path: '', redirectTo: '/blog', pathMatch: 'full'},
  {path: '', loadChildren: './posts/posts.module#PostsModule', pathMatch: 'full'},
  {path: 'about', component: AboutComponent, data: {breadcrumb: 'Об авторе'}, },
  {path: 'contacts', component: ContactsComponent, data: {breadcrumb: 'Контакты'}, },
];

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    AboutComponent,
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
