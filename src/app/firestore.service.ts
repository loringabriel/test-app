import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    public afAuth: AngularFireAuth,
    private db:AngularFirestore,
  ) { }

  getNotes(uid:string){
    return this.db.collection('notes', res => res.where( 'uid', '==', uid)).snapshotChanges();
  }

  async createNote(description:string){
    const user = await this.afAuth.currentUser;
    return this.db.collection('notes').add({
      uid: user.uid,
      description: description,
      completed: false,
    })
  }

  updateStatus(status:boolean, docId:string){
    return this.db.collection('notes').doc(docId).update({completed:status})
  }

  deleteNote(docId:string){
    return this.db.collection('notes').doc(docId).delete()
  }
}
