import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  userList;
  user;
  @Output()periodUpdated = new EventEmitter();
  
  constructor(private userService:UserService) { }
    
  ngOnInit() {
    this.userList = this.userService.getUsers();
  }

  setUser(data){
    this.userService.setUser(data);
    this.user = this.userService.getUser();
  }

  setPeriod(data){
    this.periodUpdated.emit(data);
  }

}
