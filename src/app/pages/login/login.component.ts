import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from '../../api.service';
import { DataService} from '../../data.service';
import { Subscription} from 'rxjs';

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

  constructor(private api:ApiService, private data:DataService) { }

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

  onChange(){
    console.log(this.loginFormGroup.valid)
    this.isValid = this.loginFormGroup.valid
  }

}
