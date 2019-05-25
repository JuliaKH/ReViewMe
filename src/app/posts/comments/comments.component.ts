import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {PostService} from '../post.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Post} from '../post';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  post: Post;

  comments: Observable<{ post_id: string; author: string; id?: string; published: Date; content: string }[]>;
  content: string;
  author: string;
  currentPostId = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private postService: PostService,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.comments = this.postService.getComments();
    console.log(this.currentPostId);
    this.getPost();
    // console.log(this.post.id);
  }

  createComment() {
    const data = {
      author: this.author,
      post_id: this.route.snapshot.paramMap.get('id'),
      content: this.content,
      published: new Date(),
    };
    this.postService.create_comment(data);
    this.author = '';
    this.content = '';
  }
  delete(comment) {
    const id = comment.id;
    // console.log(id);
    this.postService.delete_comment(id);
  }
  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    // console.log(this.postService.getPostData(id).subscribe(data => this.post));
    return this.postService.getPostData(id).subscribe(data => {this.post = data; });
  }

}
