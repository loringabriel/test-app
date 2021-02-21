import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataService} from '../../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userEmail:string
  isLogged:boolean;
  loading:boolean;
  notes:Note[];

  constructor(
    public afAuth:AngularFireAuth,
    public router:Router,
    private data:DataService,
    private cdr: ChangeDetectorRef
    ) {
      this.loading=true;
      afAuth.onAuthStateChanged(user => {
        if (!user) {
          this.loading=false;
          this.isLogged=false;
          router.navigate(['/login'])
          this.cdr.detectChanges();
        } else {
          this.loading=false;
          this.userEmail=user.email;
          this.isLogged=true;
          this.cdr.detectChanges();
        }
      })
  }
  
  ngOnInit(): void {
    this.data.getNotes().subscribe(data => {
      this.notes = data.map(e => {
        return {
          id: e.payload.doc.id,
          done: e.payload.doc.data()['done'],
          description: e.payload.doc.data()['description'],
        };
      })
    });
  }
  redirect(){
    this.router.navigate(['/login'])
  }
  
  async logout(){
    try {
      await this.afAuth.signOut()
    }
    catch (err) {
      console.log(err);
    }
  }

  createNote(){
    return this.data.createNote('test note')
  }
  changeStatus(newStatus:boolean, docId:string){
    return this.data.changeNoteStatus(newStatus, docId)
  }
}
interface Note {
  description:string,
  done:boolean,
  id:string
}
