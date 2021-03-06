import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { SharedModule } from '../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {AboutComponent} from '../about/about.component';
import {AppModule} from '../app.module';
import { CommentsComponent } from './comments/comments.component';
import { SearchComponent } from './search/search.component';
// import { FilterPipe } from './filter.pipe';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  { path: 'blog', component: PostListComponent},
  { path: 'blog/:id', component: PostDetailComponent, data: {breadcrumb: 'details'}, },
  { path: 'dashboard', component: PostDashboardComponent, data: {breadcrumb: 'dashboard'}, }
];

@NgModule({
  declarations: [PostDashboardComponent, PostDetailComponent, PostListComponent, CommentsComponent, SearchComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class PostsModule { }
