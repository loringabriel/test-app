import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService} from '../../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  message:string;
  subscription:Subscription;
  constructor(private data:DataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message=> this.message = message)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  changeText(){
    this.data.changeMessage('NEW')
  }

}
