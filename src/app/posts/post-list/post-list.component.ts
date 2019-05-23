import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from '../post';
import {PostService} from '../post.service';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>;

  config: any;
  count: number;
  constructor( private postService: PostService, public auth: AuthService) {
  }

  ngOnInit() {
    this.posts = this.postService.getPosts();
    console.log(this);
    this.posts.subscribe(result => {console.log(result.length); this.count = result.length; });
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: this.count
    };
  }
  delete(id: string) {
    this.postService.delete(id);
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
