import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Post} from './post';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

// import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postCollection: AngularFirestoreCollection<Post>;
  postDoc: AngularFirestoreDocument<Post>;

  constructor(private afs: AngularFirestore) {
    this.postCollection = this.afs.collection('posts', ref =>
      ref.orderBy('published', 'desc'));
  }

  getPosts() {
    return this.postCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }
  getPostData(id: string) {
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    console.log(this.postDoc.valueChanges());
    return this.postDoc.valueChanges();
  }
}
