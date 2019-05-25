import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PostService} from '../post.service';
import { Router, RoutesRecognized } from '@angular/router';

import {Post} from '../post';
import {Comment} from '../comment';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: Post;
  comment: Comment;

  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private postService: PostService
    // private router: Router
  ) { }

  ngOnInit() {
    this.getPost();
    console.log(this);
    // this.getComment();
  }
  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    // console.log(this.postService.getPostData(id).subscribe(data => this.post));
    return this.postService.getPostData(id).subscribe(data => {this.post = data; });
  }

  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content
    };
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.update(id, formData);
    this.editing = false;
  }

  delete() {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.delete(id);
    this.router.navigate(['/blog']);
  }

  // getComment() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   console.log(id);
  //   // console.log(this.postService.getPostData(id).subscribe(data => this.post));
  //   return this.postService.getCommentData(id).subscribe(data => {this.comment = data; });
  // }
}

