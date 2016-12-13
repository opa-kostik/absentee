import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user;
  opt;
  @Output()periodUpdated = new EventEmitter();
  
  constructor(private userService:UserService) { }
  
  ngOnInit() {
      this.user = this.userService.getCurrentUser();
  }

  setPeriod(data){
    this.periodUpdated.emit(data);
  }

}
