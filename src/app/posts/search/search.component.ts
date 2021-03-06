import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {PostService} from '../post.service';

import {catchError, map} from 'rxjs/operators';
import {switchMap} from 'rxjs/operators';
import {debounceTime} from 'rxjs/operators';
import {distinctUntilChanged} from 'rxjs/operators';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  posts$;
  startAt: BehaviorSubject<string | null> = new BehaviorSubject('');
  arrCopy;

  // posts = this.postService.posts;

  constructor(private afs: AngularFirestore, private postService: PostService) {
  }

  ngOnInit() {
    // this.posts$ = this.getPosts(this.startAt);
    this.getPosts(this.startAt).subscribe(data => {
      this.posts$ = data;
      this.arrCopy = data;
      console.log(this.posts$);
    });
  }
  getPosts(start: BehaviorSubject<string>): Observable<any> {
    return start.pipe(
      switchMap(startText => {
        const endText = startText + '\uf8ff';
        return this.afs
          .collection('posts', ref =>
            ref
              .orderBy('title')
              .limit(20)
              .startAt(startText)
              .endAt(endText)
          )
      .snapshotChanges().pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(changes => {
            return changes.map(c => {
              console.log(c);
              const data = c.payload.doc.data();
              const id = c.payload.doc.id;
              return { id, ...data };
            });
          }),
            catchError( err => {
              console.error(err.message);
              console.log('Error is handled');
              return throwError('Error thrown from catchError');
            })
          );
      })
    );
  }
  search(searchText) {
    this.arrCopy = this.posts$;
    const arr = this.posts$.filter((item) => {
      console.log(item.title);
      return item.title.toLowerCase().startsWith(searchText.toLowerCase());
    });
    this.arrCopy = arr;
  }

  submit(value) {
    // this.postService.posts = this.posts$;
    // this.posts$ = this.getPosts(this.startAt);
    // this.posts$ = this.afs.collection('posts', ref =>
    //   ref.where('title', '==', value )).valueChanges();
    this.postService.postCollection = this.afs.collection('posts', ref =>
      ref.where('title', '==', value ).orderBy('published', 'desc'));
    this.postService.posts = this.postService.getPosts();
  }
  filtrarData(categoriaToFilter: string) {
    // this.postService.posts = this.postService.filterBy(categoriaToFilter);
    this.postService.filterBy(categoriaToFilter);
    this.postService.posts = this.postService.getPosts();
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
  allPosts() {
    this.postService.postCollection = this.afs.collection('posts', ref =>
      ref.orderBy('published', 'desc'));
    this.postService.posts = this.postService.getPosts();
  }
}
