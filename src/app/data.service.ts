import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private message = new BehaviorSubject('ABC');
  currentMessage = this.message.asObservable();

  constructor(
    public afAuth:AngularFireAuth,
    private db: AngularFirestore
    ) {}

  changeMessage(message: string){
    this.message.next(message);
  }

  getCompletedNotes(){
    return this.db.collection('notes', ref => ref.where('done', '==', true)).snapshotChanges();
  }
  getNotes(){
    return this.db.collection('notes').snapshotChanges();
  }
  changeNoteStatus(newStatus:boolean, docId:string){
    return this.db.collection('notes').doc(docId).update({done:newStatus});
  }

  async createNote(description:string){
    const user = await this.afAuth.currentUser;
    return this.db.collection('notes').add({
      uid:user.uid,
      description:description,
      done:true,
    })
  }
}
