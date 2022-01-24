import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ChatApp';
  username: string ='';
  users: Array<any> = [];
  message: string = "";
  messages: Array<any> =[];
  isAdded: boolean = false;
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('6805be4fb94b379f8d38', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any)=> {
      this.messages.push(data);
    });
  }
  addUsername(){
    var val = {
      username: this.username
    }
    this.users.push(val);
    this.isAdded = true;
    console.log(val);
    
  }


  submitMsg(): void{
    var val = {
      username: this.username,
      message: this.message
    };
    this.http.post("http://localhost:37292/api/Chat/messages", val).subscribe(next =>
    {
      this.message = '';
    })
  }
}
