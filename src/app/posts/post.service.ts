import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Post} from './post';
import {Comment} from './comment';;
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

// import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postCollection: AngularFirestoreCollection<Post>;
  postDoc: AngularFirestoreDocument<Post>;

  commentCollection: AngularFirestoreCollection<Comment>;
  commentDoc: AngularFirestoreDocument<Comment>;

  constructor(private afs: AngularFirestore) {
    this.postCollection = this.afs.collection('posts', ref =>
      ref.orderBy('published', 'desc'));

    this.commentCollection = this.afs.collection('comments', ref =>
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
    // console.log(this.postDoc.valueChanges());
    return this.postDoc.valueChanges();
  }
  create(data: Post) {
    this.postCollection.add(data);
  }
  getPost(id: string) {
    return this.afs.doc<Post>(`posts/${id}`);
  }
  delete(id: string) {
    return this.getPost(id).delete();
  }
  update(id: string, formData) {
    return this.getPost(id).update(formData);
  }

  getComments() {
    return this.commentCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Comment;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }

  getCommentData(id: string) {
    this.commentDoc = this.afs.doc<Comment>(`comments/${id}`);
    console.log(this.commentDoc.valueChanges());
    return this.commentDoc.valueChanges();
  }
  create_comment(data: Comment) {
    this.commentCollection.add(data);
  }
  getComment(id: string) {
    console.log(this.afs.doc<Comment>(`comments/${id}`));
    return this.afs.doc<Comment>(`comments/${id}`);
  }
  delete_comment(id: string) {
    return this.getComment(id).delete();
  }
  }
