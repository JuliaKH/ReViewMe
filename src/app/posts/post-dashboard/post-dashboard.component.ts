import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {PostService} from '../post.service';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';


@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {
  title: string;
  image: string = null;
  genre: string;
  content: string;

  buttonText = 'Create Post';

  uploadPercent: Observable<number>;
  // downloadURL: Observable<string>;

  constructor(private auth: AuthService, private postService: PostService, private storage: AngularFireStorage) { }

  ngOnInit() {
  }
  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      genre: this.genre,
      image: this.image,
      published: new Date(),
      title: this.title
    };
    this.postService.create(data);
    this.title = '';
    this.content = '';
    this.genre = '';
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
      const task = this.storage.upload(path, file);
      this.uploadPercent = task.percentageChanges();
      task.then((result) => {
        // do you code after upload here
        const fileRef = this.storage.ref(path);
        fileRef.getDownloadURL()
          .subscribe((url) => {
            this.image = url;
            console.log(url);
          }, (error) => {
            console.error(error);
          });
      });

      // task.snapshotChanges().pipe((() => this.downloadURL = fileRef.getDownloadURL() )
      // ).subscribe(url => {this.image = url; console.log('url:', url); console.log('this.image:', this.image); });
      // console.log(this.uploadPercent);
    }
  }

}
