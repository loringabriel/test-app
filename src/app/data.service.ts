import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private message = new BehaviorSubject('ABC');

  currentMessage = this.message.asObservable();

  constructor() { }

  changeMessage(message: string){
    this.message.next(message);
  }
}
