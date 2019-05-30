import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from '../post';
import {PostService} from '../post.service';
import {AuthService} from '../../core/auth.service';
import { catchError } from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  config: any;
  count: number;
  // public errMsg;
  constructor( private postService: PostService, public auth: AuthService) {
  }

  ngOnInit() {
    this.postService.posts = this.postService.getPosts();
    // console.log(this);
    // Pagination
    this.postService.posts.subscribe(result => {console.log(result.length); this.count = result.length; });
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: this.count
    };
  }
  delete(id: string) {
    this.postService.delete(id);
  }

  // pagination
  pageChanged(event) {
    this.config.currentPage = event;
  }

}
