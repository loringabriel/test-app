import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from '../../api.service';
import { DataService} from '../../data.service';
import { Subscription} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup:FormGroup;
  email:string='email';
  password:string='password';
  isValid:boolean=false;

  message:string;
  subscription:Subscription;

  constructor(
    private api:ApiService,
    private data:DataService,
    public afAuth:AngularFireAuth,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message=> this.message = message)

    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.required])
    });
  }

  login(){
    this.api.loginUser(this.loginFormGroup.value).subscribe(res => console.log(res))
  }

  async loginWithGoogle(){
    try {
      await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
      
      let user = firebase.default.auth().currentUser;
      if (user){
        this.router.navigate(['/dashboard'])
      } else {
        console.log('no user')
      }
      
    }
    catch(err){
      console.log(err)
    }
  }
  logout(){
    this.afAuth.signOut()
  }

  onChange(){
    console.log(this.loginFormGroup.valid)
    this.isValid = this.loginFormGroup.valid
  }

}
