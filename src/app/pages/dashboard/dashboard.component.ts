import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirestoreService } from '../../firestore.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  userEmail:string;
  userId:string;
  isLogged:boolean;
  loading:boolean;
  notes:Note[];
  noteFormGroup:FormGroup;


  constructor(
    public afAuth:AngularFireAuth,
    public router:Router,
    private cdr: ChangeDetectorRef,
    private firestoreService:FirestoreService,
  ) {
    this.loading=true;
    afAuth.onAuthStateChanged(user => {
      this.loading=false;
      if (user){
        this.isLogged = true;
        this.userEmail = user.email;
        this.userId = user.uid;
        this.firestoreService.getNotes(user.uid).subscribe(data => {
          this.notes = data.map(e => {
            return {
              id: e.payload.doc.id,
              description: e.payload.doc.data()['description'],
              completed: e.payload.doc.data()['completed']
            }
          })
        })
        this.cdr.detectChanges()
      } else {
        this.isLogged = false;
        this.router.navigate(['/login'])
        this.cdr.detectChanges();
      }
    })
  }

  ngOnInit(): void {
    this.noteFormGroup = new FormGroup({
      note: new FormControl('', [Validators.required]),
    });
  }

  logout(){
    this.afAuth.signOut()
  }

  createNote(){
    return this.firestoreService.createNote(this.noteFormGroup.value.note)
  }

  updateStatus(status:boolean, docId:string){
    return this.firestoreService.updateStatus(status, docId)
  }

  deleteNote(docId:string){
    return this.firestoreService.deleteNote(docId);
  }
}


interface Note {
  description:string,
  id:string,
  completed:boolean,
}