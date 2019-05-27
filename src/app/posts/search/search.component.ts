import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {combineLatest, Observable, Subject} from 'rxjs';
import {PostService} from '../post.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // searchterm: string;
  //
  // startAt = new Subject();
  // endAt = new Subject();
  //
  // startObs = this.startAt.asObservable();
  // endObs = this.endAt.asObservable();
  //
  // names;

  posts = this.postService.posts;
  // public data: Observable<any[]>;
  // searchText: any;

  constructor(private afs: AngularFirestore, private postService: PostService) {
    // this.data = afs.collection('/posts').valueChanges();
  }

  ngOnInit() {
    // combineLatest([this.startObs, this.endObs]).subscribe((value) => {
    //   this.firequery(value[0], value[1]).subscribe((names) => {this.names = names;
    //   });
    // });
    // console.log(this.names);
  }
  // search($event) {
  //   const q = $event.target.value;
  //   this.startAt.next(q);
  //   this.endAt.next(q + '\uf8ff ');
  //   console.log(this.names);
  // }
  //
  // firequery(start, end) {
  //   // console.log(this.afs.collection('posts', ref =>
  //   //   ref.limit(4).orderBy('title').startAt(start).endAt(end)).valueChanges());
  //   return this.afs.collection('posts', ref =>
  //     ref.limit(10).orderBy('title').startAt(start).endAt(end)).valueChanges();
  // }

  filtrarData(categoriaToFilter: string) {
    this.postService.posts = this.postService.filterBy(categoriaToFilter);
    console.log(categoriaToFilter) ;
  }
  alphabetSort() {
    this.postService.postCollection = this.afs.collection('posts', ref =>
      ref.orderBy('title'));
    this.postService.posts = this.postService.getPosts();
  }
  dateSort() {
    this.postService.postCollection = this.afs.collection('posts', ref =>
      ref.orderBy('published', 'desc'));
    this.postService.posts = this.postService.getPosts();
  }


}
