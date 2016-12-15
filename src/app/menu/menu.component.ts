import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  users;
  userid;
  opt;
  @Output()periodUpdated = new EventEmitter();
  
  constructor(private userService:UserService) { }
    
  ngOnInit() {
      debugger;
      this.users = this.userService.getUsers();
  }

  getName(){
    debugger;
    return this.userService.getUser(this.userid).name;
  }

  setPeriod(data){
    this.periodUpdated.emit(data);
  }

}
