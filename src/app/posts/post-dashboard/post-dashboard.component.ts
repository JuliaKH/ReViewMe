import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {PostService} from '../post.service';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {
  title: string;
  image: string = null;
  content: string;

  buttonText = 'Create Post';

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private auth: AuthService, private postService: PostService, private storage: AngularFireStorage) { }

  ngOnInit() {
  }
  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    };
    this.postService.create(data);
    this.title = '';
    this.content = '';
    this.buttonText = 'Post Created!';
    setTimeout(() => this.buttonText = 'Create Post', 3000);
  }

  uploadImage(event) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;
    // console.log(event.target.files);
    if (file.type.split('/')[0] !== 'image') {
      return alert('Only image files!');
    } else {
      const fileRef = this.storage.ref(path);
      const task = this.storage.upload(path, file);
      // console.log('Image uploaded!');
      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      task.snapshotChanges().pipe((() => this.downloadURL = fileRef.getDownloadURL() )
      ).subscribe(url => {this.image = url; console.log('url:', url); console.log('this.image:', this.image); });
      console.log(this.uploadPercent);
    }
  }
  // checkPercent() {
  //   if (this.uploadPercent === 100) {
  //     return true;
  //   } else return false;
  // }
}
