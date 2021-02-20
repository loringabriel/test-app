import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  baseUrl:string='http://localhost:5000/'

  loginUser(user: object){

    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(user)
    
    return this.http.post(this.baseUrl + 'login', body, { 'headers': headers})
  }

  getUsers(){
    return this.http.get(this.baseUrl + 'users',  { responseType: 'text' })
  }
}
